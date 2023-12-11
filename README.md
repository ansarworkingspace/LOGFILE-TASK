This is the output of the problem:

Loyal user: user1@example.com
Loyal user: user11@example.com
Loyal user: user5@example.com


---------------------------Explanation----------------------------------------------------

In this code, the objective is to identify loyal users with the help of log files. Each log file 
represents a day, and within each file, details about user 
interactions are recorded, such as the timestamp, user email, and the page clicked. For instance:

2023-12-02 11:00:00 user1@example.com page-home
2023-12-02 11:01:00 user3@example.com page-about
2023-12-02 11:02:00 user1@example.com page-services
2023-12-02 11:06:00 user1@example.com page-home

Different users' data is added in this manner.


To determine loyal users, consider the following examples:

EXAMPLE ONE:

Day One File:

2023-12-02 11:00:00 user1@example.com page-home
2023-12-02 11:01:00 user3@example.com page-about
2023-12-02 11:02:00 user1@example.com page-services
2023-12-02 11:06:00 user1@example.com page-home

Day Two File:

2023-12-03 11:00:00 user3@example.com page-home
2023-12-03 11:01:00 user3@example.com page-about
2023-12-03 11:02:00 user1@example.com page-services
2023-12-03 11:06:00 user1@example.com page-home
2023-12-03 11:06:00 user1@example.com page-cart


In this example, is user1 loyal? No, because although user1 clicked on 
three pages on at least two different days, the pages are not unique. 
On day two, user1 clicked on three unique pages, but on day one, the user clicked on
the home page twice, making the total count three pages for the day, but not three unique pages.


EXAMPLE TWO:

Day One File:

2023-12-02 11:00:00 user1@example.com page-home
2023-12-02 11:01:00 user3@example.com page-about
2023-12-02 11:02:00 user1@example.com page-services
2023-12-02 11:06:00 user1@example.com page-cart

Day Two File:

2023-12-03 11:00:00 user3@example.com page-home
2023-12-03 11:01:00 user3@example.com page-about
2023-12-03 11:02:00 user1@example.com page-services
2023-12-03 11:06:00 user1@example.com page-home
2023-12-03 11:06:00 user1@example.com page-cart



In this example, is user1 loyal? Yes, because user1 has clicked on at 
least three unique pages on at least two different days.


-------------------------------Complexity-------------------------------------------------------------------

Time complexity: O(N * M), where N is the total number of log entries across
all log files, and M is the average number of log entries in each log file.


Space complexity: O(U), where U is the total number of unique users
found in the log files.
