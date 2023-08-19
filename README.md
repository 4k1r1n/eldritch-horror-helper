# Eldritch Horror Helper

A small helper app for building the mythos deck in the board game Eldritch Horror.

[View Demo](https://4k1r1n.github.io/eldritch-horror-helper/)

<p align="center">
  <img src="https://github.com/4k1r1n/eldritch-horror-helper/assets/91277105/d13f8b77-db55-4174-bfc3-e276bf29effe" alt="Settings" width="700">
  <img src="https://github.com/4k1r1n/eldritch-horror-helper/assets/91277105/379bb52c-6786-4055-99bc-f8a3e2ac60b7" alt="Game" width="700">
</p>

## Stack
- HTML5/CSS/JS
- Webpack

## Features
- deck building algorithm

## Algorithm conditions
There are three types of cards to build the Mythos deck: blue, brown, and green (the type determined by the color of the stripe in the card's cap). There are also different card complexities:
- complex cards have tentacles around the title;
- medium cards do not have any signs;
- easy cards have a snowflake image around the name.  
  
First, the player will need to choose the Ancient, who will indicate the deck scheme and how many cards of what color need at each stage of the game.
Next, the difficulty of the game will need to be determined:
- Very easy: all cards with snowflakes are taken from the set. If there are not enough cards, then the usual cards are obtained;
- Easy: cards with tentacles are removed from the set;
- Medium: the set remains untouched;
- High: cards with snowflakes are removed from the set;
- Very high: all the cards with tentacles are taken from the set. If there are not enough cards, the regular cards obtained.

<p align="center">
  <img src="https://github.com/4k1r1n/eldritch-horror-helper/assets/91277105/2f186a63-c0fe-45b8-a724-6e3c6fb8aae8" alt="Buildind the mythos deck" width="500">
</p>

## Acknowledgements
Eldritch Horror Helper was made for [RS school](https://rs.school/).
