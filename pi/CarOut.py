import RPi.GPIO as GPIO
import requests
from cairosvg import svg2png
#import cv2


from ParkingMoney import AvoidSensorfor, AvoidSensorbac, destroy
from ParkingMoney.motor import forward, backward, stop
from ParkingMoney.camera import capture_detect

AvoidValuefor = False
AvoidValuebac = False
LimitAngleFlag = 0


url_exit = 'http://yindaheng98.top:3001/exit/'

url_ispay = 'http://yindaheng98.top:3001/ispay/'


def loopUp():
    global LimitAngleFlag
    AvoidValuefor = GPIO.input(AvoidSensorfor)
    if AvoidValuefor == False:
        id = capture_detect()
        print("出口处传数据"+url_exit+id)
        response = requests.get(url_exit+id)
        if response.text=='error':
            print('出错')
            return
        svg2png(bytestring=response.text, write_to='output.png')
        #cv2.imshow('二维码', cv2.imread('output.png'))
        print("出口处查询付款情况"+url_ispay+id)
        response = requests.get(url_ispay+id)
        print('result:'+response.text)
        if response.text == 'yes':
            print("开始抬杆")
            if LimitAngleFlag == 0:
                forward(0.003, 128)  # 512 steps --- 360 angle
                LimitAngleFlag = 1


def loopDown():
    global LimitAngleFlag
    print("开始落杆")
    if LimitAngleFlag == 1:
        backward(0.003, 128)  # 512 steps --- 360 angle
        LimitAngleFlag = 0


if __name__ == '__main__':  # Program start from here
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
