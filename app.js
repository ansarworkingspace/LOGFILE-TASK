
const fs = require('fs');
const readline = require('readline');

async function findLoyalUsers(logDirectoryPath) {
  const loyalUsers = new Map();

  // Read all log files in the directory asynchronously
  const files = await fs.promises.readdir(logDirectoryPath);

  // Process each log file in parallel
  await Promise.all(files.map(async (file) => {
    const filePath = `${logDirectoryPath}/${file}`;

    // Read and process each log file using a streaming approach
    const readStream = fs.createReadStream(filePath, 'utf8');
    const rl = readline.createInterface({ input: readStream });

    for await (const line of rl) {
      processLogFile(line, loyalUsers);
    }
  }));

  // Identify and print loyal users 
  for (const [userId, user] of loyalUsers.entries()) {
    // Check if the user has visited at least 2 days
    const visitedDays = user.visitDates.size;

    // Check if the user has clicked at least 3 pages on at least 2 different days
    const isLoyal = visitedDays >= 2 &&
      [...user.pageClickCount.values()].filter((clicks) => clicks >= 3).length >= 2;

    if (isLoyal) {
      console.log(`Loyal user: ${userId}`);
    }
  }
}

function processLogFile(line, loyalUsers) {
  const [timestamp, time, userId, pageVisited] = line.split(' ');

  // Correctly parse the date
  const dateParts = timestamp.split('-').map(part => parseInt(part, 10));
  const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

  // Update user information in the Map
  if (!loyalUsers.has(userId)) {
    loyalUsers.set(userId, { visitCount: 0, pageClickCount: new Map(), visitDates: new Set(), uniquePages: new Set() });
  }

  const user = loyalUsers.get(userId);

  // Check if the user visited on the same day
  const currentDate = formatDate(date);
  if (!user.visitDates.has(currentDate)) {
    user.visitDates.add(currentDate);
    user.visitCount++;
    user.pageClickCount.set(currentDate, 0); // Reset the click count for a new day
    user.uniquePages.clear(); // Clear the set for a new day
  }

  // Check if the clicked page is unique for the day
  if (!user.uniquePages.has(pageVisited)) {
    user.uniquePages.add(pageVisited);
    user.pageClickCount.set(currentDate, user.pageClickCount.get(currentDate) + 1);
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Passing the log folder 
findLoyalUsers('log_files');

