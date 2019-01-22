---
layout: post
title: Primer Server Beta Testing
image: /public/assets/primer-server-input-screenshot.png
categories:
  - app
  - research
  - news
---

A PCR genome primer designer with a user-friendly graphical interface.

This is one of the biggest projects I am currently working on with Gokul, a bioinformatics PhD candidate at ISU Vollbrecht Lab. This is still a beta version and we are currently trying to finalize the development so that Gokul can show this tool to the MaizeGDB researchers.

This app consists of two parts. The python/flask REST server and the Angular 2 Client.

I made the both systems and they communicate each other with a HTTP/REST API.

This UI with Angular 2, the latest JavaScript framework, has various functionalities like real-time input validations, new UI elements like chips, FASTA input file acceptance, settings file acceptance, and the sophisticated design. 
Although primer design is a solved problem, this app will demonstrate that it is possible to create a much more user friendly and easy-to-use science tools on the web and even on mobile.

The results are displayed on a chart. You can clearly see where the primers are on the given genome sequence.

![primer-server-result]({{ site.baseurl }}/public/assets/primer-server-result-screenshot.png)

We are also currently working to make the specificity checking, which filters the result using BLAST technology on the server side. This will make the result much more accurate. There is no primer tool that also has this feature. 

Throughout this project I learned valuable skills such as making layered code structures by using block diagrams, full stack development using Python/Flask and Angular2, and continuous collaboration. I will be presenting <a href="https://ncurdb.cur.org/ncur2018/search/Display_NCUR.aspx?id=107828" target="_blank">this work</a> at <a href="https://www.cur.org/conferences_and_events/student_events/ncur/" target="_blank">the National Conferences on Undergraduate Research</a> at University of Central Oklahoma this April.

<a href="https://vollbrechtlab.gdcb.iastate.edu/tools/primer-server/" target="_blank">Official Site</a>
