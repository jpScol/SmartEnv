#!/bin/python2.7

import socket
import os

socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
socket.bind(('', 15556))

##Algorithme du serveur central	
while True:
    socket.listen(5)
    client, addresse = socket.accept()
    reponse = client.recv(255)
    if reponse != "":
        reponse = reponse.replace('\n','')
        print(reponse)

client.close()
stock.close()
