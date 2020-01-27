import serial
import time

print
print

# NOTE the user must ensure that the serial port and baudrate are correct
serPort = "/dev/ttyACM0"
baudRate = 9600
ser = serial.Serial(serPort, baudRate)
print "Serial port " + serPort + " opened  Baudrate " + str(baudRate)


msg = ""
count = 0
while count < 4:
    '''while ser.inWaiting() == 0:
        pass'''
        
    msg = ser.readline()
    #msg = recvFromArduino()
    print msg

    #Print le signal de continuer
    if count == 0:
        ser.write("GET_VALUE")
    elif count == 1:
        ser.write("SET_LIGHT_DOWN")
    elif count == 2:
        ser.write("GET_VALUE")
    elif count == 3:
        ser.write("SET_LIGHT_UP")
        count = -1
        #ser.write("SHUTDOWN")

    count += 1
    


ser.close

