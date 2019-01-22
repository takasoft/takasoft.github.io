---
layout: post
title: Self Organization Simulation
image: /public/assets/self-organization-test.png
hideTnPost: y
categories:
  - app
---

This is a self organization algorithm test using Kohonen's self-organizing map theory.

<!--more--> 

<div id="test-area"></div>

## How it works
1. Make a random cell matrix.
2. Make a random color.
3. Find the cell with the nearest color to the random color in the matrix.
4. Mix the random color with the color of the cell and its neighboring cells a little bit.
5. What a magic! Cells start organizing colors by themselves with this simple algorithm.


<a href="https://github.com/takasoft/self-organizing-simulation" target="_blank">Source Code</a> 

<script src="{{ site.baseurl }}/public/js/phaser.min.js"></script>
<script src="{{ site.baseurl }}/public/js/selfOrganizing.js"></script>
