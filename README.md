# What the Flap

Ce projet à pour but de mettre en place un jeu sur une page web qui peut se jouer directement ou bien à l'aide d'une IA.  
Le but du jeu est de faire en sorte que le carré rouge ne se cogne pas dans les murs verts.  
Pour y jouer, on pourra cliquer sur le bouton UP pour faire monter carré, ou le laisser tombé par gravité.  
Il est possible de lancer une IA pour y jouer. Cette IA fera une requette au serveur pour allumer une LED pour que le carré monte et fera une requette pour l'éteindre pour que le carré descende.  


Les membres du groupe :
* M. Nicolas CONDOMITTI 11708681
* M. Adrien GUEDET 11516525
* Mme Nour MEDJEDEL 11411470
* M. Jean-Philippe TISSERAND 11926733

## Configuration logicielle
* Javascript pour le serveur, le jeu, l'interface homme-machine et le client IA.
* Node-red pour piloter la LED et recuperrer la valeur détecter par la photodiode.

## Configuration matérielle
* Arduino UNO avec un actionneur (LED) et un sensor (Photodiode)
* Ordinateur pour faire tourner le serveur, l'interface homme-machine et le client IA

## Description de l'IA  
L'IA implémentée est un arbre de décision. Il est composé d'un noeud qui vérifie si la position est supérieure à la position du centre de l'obstacle et dans ce cas l'IA va demander d'allumer la LED.  
De manière analogue l'IA éteindra la LED pour que le caré descende.

## Limites  
* Luminosité de la pièce peut influencer la photodiode  
* IA « simple »  
* Rapidité de la solution

## Améliorations posibles  
* Utilisation de web sockets
* IA développementale
