---
layout: post
title: Competed at ICPC North America Championship
---

ICPC stands for International Collegiate Programming Contest. It is the largest competitive programming (CP) competition among the universities of the world.

My team won the North Central regional competition ([Iowa State news](https://www.cs.iastate.edu/news/2019/isu-team-advancing-2020-icpc-north-america-championship)). I was lucky enough to participate in this big championship with two talented programmers Omar and Ian.

The championship was held on 20-22 February, 2020. [Here's the official result](https://nac.icpc.global/history/year2020/).

To prepare for this championship, we had many study sessions with experienced grad students Vahid and Hooman, as well as Prof. Mitra. We decided that each one of us should focus on specific subjects, so I took on string algorithms.

Unlike Leetcode where a different TLE limit (run time limit) is set per programming language, ICPC only sets one absolute TLE limit regardless of the programming language. This is why most competitive programmers use C++. Although I did study C/C++ in my computer engineering classes, I'm not gonna lie, I'm not particularly good with C++. I'm more of a Python guy. Omar is excellent with competitive programming and he writes solutions in C++ so fast. Ian is a Java guy.

I learned quite a lot from these study sessions. I got a better grasp of C++ at least in CP context. Learning how to write my own implementations of complex string algorithms such as the KMP algorithm in C++, I mostly struggled but gradually got a grasp of what was going on. I didn't have enough practice time to get prepared and I wish I had started CP earlier in my life. This was my last chance in my life to participate in ICPC.

Some of the tips that are also important in job interviews are:

- The initial thinking is the most important. Don't just write code. Make sure that you are clearly thinking about the algorithms you are going to write. Pay attention to details such as what are the possible combinations of values, the possible signs of the numbers, what is the max N, and so on.
- Make sure to do your run time complexity analysis. 10^8 operations per second is usually the rule of thumb. For example, if the max of n is 10^8, then you have to write an O(n) linear run time algorithm. O(n log n) algorithm which involves sorting is likely to time out. O(n^2) algorithm will time out 100%. For the O(n^2) algorithm to pass, n has to be 10^4 or less ([code forces post](https://codeforces.com/blog/entry/21344)).

We flew from Iowa to Atlanta, Georgia to attend the championship at Georgia Tech. The hotel we stayed at was gorgeous. I wondered how much money they were spending on bringing all these people and organizing this event. We also had a party in the center of the city and ate really good food.

Now talking about the contest itself, the majority of the problems were really difficult. We managed to solve 3 out of 12 problems.

MIT beasts solving problems at lightning speed made us nervous. There were legendary competitive programmers such as [Benq](https://codeforces.com/profile/Benq). There were so many smart people there.

One interesting moment I had was that Ian managed to come up with a solution in Java. He submitted his code but he kept getting TLE. He was confident that his solution had the right run time complexity to solve the problem. I converted his solutions to C++, and the code passed. C++ is in fact faster than Java.

Overall, I enjoyed this competition a lot. I learned in this competition how fast some people can think and solve problems. They also had a lot earlier head start than I did. They have been doing CP since they were teenagers.

I used to play Shogi (Japanese chess) a lot when I was younger. It's similar in a way that many of the strongest players I saw were elementary school kids. They have been learning this game since their brain was so flexible as a kid. I think CP is a lot easier if you have been doing it since you were young because you get to learn all the patterns needed to solve the problems. Just like chess, you need logical thinking, inspirations, and pattern recognition that comes from many years of practice.
