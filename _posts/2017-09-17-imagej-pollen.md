---
layout: post
title: Pollen molecule filtering ImageJ plugin
image: /public/assets/pollen-example.png
categories:
  - app
  - research
---

Automatic pollen molecule image filtering on multiple pollen images.

I was asked by Erica, the assistant scientist at ISU Vollbrecht Lab, to develop an ImageJ plugin to automatically filter the pollen molecule images. She was working on analyzing thousands of pollen molecule pictures and she needed a way to automatically filter them.   

ImageJ is an amazing open-source image analysis tool used by many scientists. My plugin detects the pollen molecules with the red circles in them (as shown in the picture) by using the ImageJ functionality and record various values for each detected molecules.

The results are saved as as a csv file. It looks like the following picture.

![imagej-pollen-result-csv]({{ site.baseurl }}/public/assets/imagej-pollen-result-csv.png)

- <a href="https://github.com/vollbrechtlab/imagej-pollen" target="_blank">Source Code</a>
