
#########################################################
import RPi.GPIO as GPIO
import time
import requests
import json
import time
import cairosvg
from cairosvg import svg2png

IN1 = 29  
IN2 = 31
IN3 = 33
IN4 = 35
AvoidSensorfor=40
AvoidValuefor=False
AvoidSensorbac=38
AvoidValuebac=False
LimitAngleFlag=0


url = 'http://yindaheng98.top:3001/'

def setStep(w1, w2, w3, w4):
    GPIO.output(IN1, w1)
    GPIO.output(IN2, w2)
    GPIO.output(IN3, w3)
    GPIO.output(IN4, w4)


def stop():
    setStep(0, 0, 0, 0)


def forward(delay, steps):
    for i in range(0, steps):
        setStep(1, 0, 0, 0)
        time.sleep(delay)
        setStep(0, 1, 0, 0)
        time.sleep(delay)
        setStep(0, 0, 1, 0)
        time.sleep(delay)
        setStep(0, 0, 0, 1)
        time.sleep(delay)


def backward(delay, steps):
    for i in range(0, steps):
        setStep(0, 0, 0, 1)
        time.sleep(delay)
        setStep(0, 0, 1, 0)
        time.sleep(delay)
        setStep(0, 1, 0, 0)
        time.sleep(delay)
        setStep(1, 0, 0, 0)
        time.sleep(delay)


def setup():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BOARD)  # Numbers GPIOs by physical location
    GPIO.setup(IN1, GPIO.OUT)  # Set pin's mode is output
    GPIO.setup(IN2, GPIO.OUT)
    GPIO.setup(IN3, GPIO.OUT)
    GPIO.setup(IN4, GPIO.OUT)
    GPIO.setup(AvoidSensorfor,GPIO.IN)
    GPIO.setup(AvoidSensorbac,GPIO.IN)

import picamera
camera=picamera.PiCamera()
def capture():
    camera.capture("image.jpg")

def detect():
    #TODO:read image.jpg here and detect it
    return "123456"

def loopUp():
    global LimitAngleFlag
    AvoidValuefor=GPIO.input(AvoidSensorfor)
    if AvoidValuefor==False:
        capture()
        id = detect()
        print(id)
        ResponseExit = requests.get(url+'exit/'+id)
        svg2png(bytestring=ResponseExit.text,write_to='output.png')
        print ("occur")
        ResponsePay=requests.get(url+'ispay/'+id)
        print ("pay")
        if ResponsePay=='OK':
            print ("up!")
            print("please enter in")
            if LimitAngleFlag==0:
                forward(0.003, 128)  # 512 steps --- 360 angle
                LimitAngleFlag=1
        else:
            print ("sorry,unavailable")  
def loopDown():
    global LimitAngleFlag
    if LimitAngleFlag==1:
        backward(0.003, 128)  # 512 steps --- 360 angle
        LimitAngleFlag=0
        
            
def destroy():
    GPIO.cleanup()  # Release resource
    
    


if __name__ == '__main__':  # Program start from here
    setup()
    try:
        while True:
            loopUp()
            AvoidValuebac=GPIO.input(AvoidSensorbac)
            if AvoidValuebac==False:
                print ("111111111111!")
                while True:
                    print ("222222222!")
                    AvoidValuebac=GPIO.input(AvoidSensorbac)
                    if AvoidValuebac==True:
                        print ("3333333333!")
                        loopDown()
                        break
                       
    except KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the child function destroy() will be  executed.
        destroy()

