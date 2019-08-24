---
layout: post
title: Genomic Selection Simulator
image: /public/assets/genomic-selection-simulator-screenshot.png
categories:
  - app
  - research
---

Genomic selection simulation that helps plant breeders predict plants with the best genomes

This is an undergraduate research project with <a href="https://www.imse.iastate.edu/directory/lizhi-wang/" target="_blank">Dr. Lizhi Wang</a>, Industrial and Manufacturing Systems Engineering professor at ISU. <br>
Genomic selection is a new plant breeding method which uses the plants' DNA data to create the better plants. This is more efficient than a traditional methods which just look at the appearances or the functions of the plants because those plants sometimes have bad DNA that produces bad plants in the next generation. It turns out that selecting the best plants based on genome data is more efficient.<br>
Using a very efficient algorithm that the professor wrote, the simulator calculates the next good progeny based on the current genome and it repeats this until the progeny with the best genome is found. <br>
This tool will help the plant breeders make their breeding plan easily and much more efficiently.

I learned a smart way of processing genome data using matrix transformations throughout this research. First, by using numpy, I converted the optimized Matlab code written by the professor to Python. Then I developed a GUI tool using Python/QT.

- <a href="http://lib.dr.iastate.edu/undergradresearch_symposium/2017/presentations/82/" target="_blank">Presentation at Symposium on Undergraduate Research & Creative Expression and IMSE Poster Session</a>
- <a href="https://github.com/takasoft/GenomicSelectionSimulator" target="_blank">Source Code</a>

