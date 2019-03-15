---
layout: post
title: Senior Design Project Started
categories:
  - news
---

We started a senior design project titled "Artificial Intelligent Requirement Analysis Tools", an yearlong project with Collins Aerospace. 

Requirement tracing, or creating logical links between individual requirements, is essential in projects carried out by Collins. When working with safety critical systems, it must be ensured that all necessary features are recognized, and no unnecessary features are included. 

Projects at Collins may include thousands of requirements, each of which link to multiple other requirements. As of today, employees at Collins create and review these requirements mostly by hand. Manually reviewing the accuracy of a requirement trace and deciding which links are good and which need to be removed is extremely expensive in terms of the time that must be dedicated to ensure that the requirement trace is sufficient for the project. 

The purpose of this senior design project is to develop a tool for Collins in order to automate requirement trace analysis. The proposed solution to this problem is to utilize machine learning libraries within Python (specifically, Gensim) which include algorithms such as Word2Vec, Word Movers Distance, and Doc2Vec. These algorithms analyze the similarities between text. Our tool will take multiple Excel documents as input, which specify all individual requirements and the other requirements that each are linked to. Using the algorithms mentioned above, we will implement a solution to analyze all of these requirement links and flag them as either good, bad, or missing links based on the similarity that is computed. The tool will also recognize requirements that are not currently linked to anything, and recommend possible links. Finally, a user can see a detailed report from a web application.

I am a Chief Engineer on paper, but we are following a very loose Agile style, so we don't really have specific roles in reality. But I think this is a pretty good team with motivated members.

This project will be a good experience for me to learn how to utilize machine learning to solve a practical problem. While I was experimenting with doc2vec, which is a state-of-art technology in natural language processing, I was surprised how easy it is to train a model and show a similarity between two different sentences. But the problem comes when we don't have enough data to train our model. Since Collins develops a lot of military related products, it is difficult for them to provide many sample requirements sheets. We somehow need to find a way to complement our model by using some external data like aerospace articles on Wikipedia. The requirements include many difficult technical terms and a lot of abbreviations, which means first we need to find the full names for those abbreviations and the external data also need to contain these terms. We will need to write some crawler to gather those necessary data. 

Our senior design website: [http://sddec19-08.sd.ece.iastate.edu/](http://sddec19-08.sd.ece.iastate.edu/)
