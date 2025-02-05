---
layout: post
title: 5 year reflection of myself as a software engineer
---

I've been working full time as a software engineer since Feb 2020. The next month will mark my 5 year career as a software engineer. I'm currently a SDE at Amazon, and I previously worked at a startup. If I include my college era where I had an internship at PayPal, I have been involved in software development for 8 years now. I want to write a little reflection on my professional career so far with some tips I have for other people trying to get into the tech industry.

### College Era

First, let me talk about my college years.

I started my coursework at Iowa State back in 2017. I got a couple of research assistant positions as well as teaching assistant positions throughout my college years. I worked on several projects, but the most impactful one I am proud of is [Primer Server project](https://takasoft.io/blog/ncur-primer-server) in which I developed the backend and frontend from scratch. At the end of the project, I presented the research at the National Conference on Undergraduate Research and I open-sourced the code to the public.

I was lucky to get a recruiter from PayPal to reach out to me after the completion of the project. I ended up working as an intern at PayPal in Silicon Valley for 2 summers in 2018 and 2019. At PayPal, I worked in a new small software development team focused on automating firewall administration. At the time I was there, a large part of PayPal's infrastructure ran on top of virtual machines in in-house data centers. A lot of virtual machine networking was maintained manually by network security engineers. There were a lot of opportunities for improvements in the process. I worked on a web application to automate the firewall rule creation, which reduced the time required to create firewall rules from a few days to a few hours.

Now, here are some reflections on my college years.

I recommend doing research positions to any undergrads. Pay might not be great, but you don't do this for pay, you do this to pursue your interests and build experience on your resume.

Focus on the business impact. The web application itself was working well, and it was already getting used in the production, but I was too focused on the technical implementation and was ignorant about how the business world worked at that time. 

Always keep learning and don't stay in your comfort zone. After my first summer of internship, I got a little comfortable and didn't apply for other internship positions at different companies. I should have tried different opportunities so I could learn new things. When you are just starting out in the industry, you should overcome your stress and try out as many different opportunities as possible so you know what's a good environment to keep learning and growing.

Make it a habit to solve DSA (data structures and algorithms) problems on Leetcode frequently. Take as many (DSA) courses as you can and participate in competitive programming if your college offers it ([my little competitive programming experience](https://takasoft.io/blog/icpc-na-championship)). Although a lot of people say that DSA is useless for real world jobs, that's not the case for FAANG jobs and FAANG equivalent level jobs. They expect deep DSA understanding in their interview process. 

### Startup Era

Now I'm going to talk about my professional career.

After I graduated, I decided to take an opportunity at a startup in 2020 which I wanted to try out after trying both academia and a big company. I commuted to their office for the first few weeks, but as everyone knows, the pandemic hit and I ended up working 100% remotely for the rest of my time at this company. It was a company that sold lab testing kits, which started out of Shark Tank. I met a lot of unconventional people and it was really fun to ride the super growth wave during the pandemic time.

At this company, I learned what it's like to work in a real world software development team. Build pipelines, system monitors, feature flagging, load testing, code reviews, all those basic things that software engineers need to know. Through the development of testing frameworks, I got quite good inspirations for breaking software, which is also an important feature as a software engineer.

I learned and grew quickly at this startup. I initially focused on the development of testing automation frameworks and testing environments. I then moved to a backend infra team responsible for making features for the fulfillment and laboratory operations. The core systems were several Ruby monoliths and Postgres databases running in AWS environments. It was fun to keep growing and to work closely with the stakeholders.

In the middle of 2021 a lot of recruiters started reaching out to me, one of them was from Amazon. I did a lot of Leetcode for this interview preparation. I was already getting really rusty on DSA because I didn't touch any of DSA stuff after college. I should have kept learning DSA after college. I was really nervous in the interviews but I was able to solve most of the coding problems, and did well in the behavioral one as well by focusing on the impacts I made. Salary negotiation also went well and I got an offer that was more than 50% higher than what I was making at that time. The key really was focusing on impacts and practicing DSA skills.

### Amazon Era

Now, moving onto my current job at Amazon. Since it's my current job, I cannot go into too much detail, but I want to emphasize one main point. Focusing on the business impacts.

Here at Amazon, I've learned quite a lot about how to build scalable data compute platforms and web applications that serve global customers. I'm in the Last Mile org, which means I get to develop solutions for Amazon's core business - last mile package deliveries. I've also learned quite a bit about how last mile operations work and how Amazon keeps raising the bar on the quality and the speed of the last mile deliveries.

I have learned how to build cloud solutions in AWS environments, such as creating Spark-based big data pipelines using Glue and S3, adding statistical and ML-based validation logic in big data processing, creating complex workflows using step functions, creating event-driven systems using SQS / SNS / Lambda, creating schedule-based triggers using EventBridge, deploying AI/ML-based features using Rekognition, creating scalable data services based on DynamoDB and ECS, and building an extensive monitoring dashboard using CloudWatch and QuickSight. There's a huge focus on experimentation and horizontal scalability here. We start with the customer and work backward. We keep creating new features for the customer, experiment in one geo (usually in North America), and then we want to be able to easily expand to different geos such as the EU and Japan.

At FAANG-level companies, you get to make very big business impacts in terms of the dollar amount, the number of users, technical complexities, data size, etc. In the tech world, what matters at the end is how much impact you make and your ability to explain the impacts. A lot of successful engineers I personally know don't work long hours, but they have laser focus on the impacts they make through their solutions.

At a big company, promotion involves rigorous reviews by various people outside of your team. You need to demonstrate a very compelling reason to promote you. I didn't get into this game of getting promoted until I was already a year at Amazon. I was a bit clueless, and I thought I would just get promoted naturally as I worked on more projects, which is never the case. I recommend anyone to start the promo process from Day 1. This is also a good thing, as it shows your manager that you are ambitious to keep making high impacts. Getting promoted is a win-win game both for yourself and for the company. After starting the promo doc with my manager, I was more aware of what I had and what I didn't have. In every 1-on-1 with my manager, we discussed the accomplishments table of the promo doc and kept filling the gaps until my manager felt ready to bring up the doc to the higher-ups, and eventually I passed the reviews and I got promoted.

These kinds of things are very unclear initially. No one really tells you what to do. You have to be able to think by yourself and take action by yourself. As a software engineer, you are given a lot of freedom, but you are also expected to be an independent thinker and high-impact contributor. Most engineers get to learn this over time, but it would have helped me if someone had taught me these things earlier.

### Conclusion

Here's my conclusion of this reflection: The important things I discussed are focusing on your impacts, getting out of your comfort zone, practicing DSA skills, and thinking backwards from the goal. Start as early as possible and focus on understanding what you have and what you don't have, and then start filling those gaps. 5 years is long, but it also felt really short for me. I hope to keep growing as a software engineer. For people getting into this industry, learn to enjoy what you are doing. Tech has a very creative and impact based culture. Enjoy your projects and your results. Always be curious and learn new things.
