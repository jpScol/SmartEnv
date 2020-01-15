#! /bin/python

import socket

hote = "192.168.43.236"
port = 15556

socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
socket.connect((hote, port))
print "Connection on {}".format(port)
message=raw_input('a envoyer ')
socket.send(message)

print "Close"
socket.close()

