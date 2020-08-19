import RPi.GPIO as GPIO
import requests
from cairosvg import svg2png
#import cv2


from ParkingMoney import AvoidSensorfor, AvoidSensorbac, destroy
from ParkingMoney.motor import forward, backward, stop
from ParkingMoney.camera import capture_detect
import subprocess
import time


AvoidValuefor = False
AvoidValuebac = False
LimitAngleFlag = 0


url_exit = 'http://parking-money.yindaheng98.top:30000/exit/'

url_ispay = 'http://parking-money.yindaheng98.top:30000/ispay/'


def loopUp():
    global LimitAngleFlag
    AvoidValuefor = GPIO.input(AvoidSensorfor)
    print("出口处传数据"+url_exit+id)
    response = requests.get(url_exit+id)
    if response.text=='error':
        print('出错')
        return 0
    else:
        svg2png(bytestring=response.text, write_to='output.png')
        #cv2.imshow('二维码', cv2.imread('output.png'))
        p=subprocess.Popen('gpicview output.png',shell=True)
        print(p)
        time.sleep(10)
        p.kill()
        print("出口处查询付款情况"+url_ispay+id)
        response = requests.get(url_ispay+id)
        print('result:'+response.text)
        if response.text == 'yes':
            print("开始抬杆")
            if LimitAngleFlag == 0:
                backward(0.003, 128)  # 512 steps --- 360 angle
                LimitAngleFlag = 1


def loopDown():
    global LimitAngleFlag
    print("开始落杆")
    if LimitAngleFlag == 1:
        forward(0.003, 128)  # 512 steps --- 360 angle
        LimitAngleFlag = 0


if __name__ == '__main__':  # Program start from here
    try:
        while True:
            flag = 0
            AvoidValuefor = GPIO.input(AvoidSensorfor)
            if AvoidValuefor == False:
                while True:
                    id = capture_detect()
                    AvoidValuefor = GPIO.input(AvoidSensorfor)
                    if AvoidValuefor == True:
                        print("car could't out and is off")
                        break
                    if id!=0:
                        #break   
                        #if AvoidValuefor == False:

                        if loopUp() == 0:
                            continue
                        print("抬杆完成")
                        while True:
                            AvoidValuebac = GPIO.input(AvoidSensorbac)
                            if AvoidValuebac == False:
                                print("")
                                while True:
                                    AvoidValuebac = GPIO.input(AvoidSensorbac)
                                    if AvoidValuebac == True:
                                        print("车已开走")
                                        loopDown()
                                        flag = 1
                                        break
                            if flag==1:
                                break
                        break
    except KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the child function destroy() will be  executed.
        destroy()
