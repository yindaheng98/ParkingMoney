import RPi.GPIO as GPIO
import requests

from ParkingMoney import AvoidSensorfor, AvoidSensorbac, destroy
from ParkingMoney.motor import forward, backward, stop
from ParkingMoney.camera import capture_detect

AvoidValuefor = False
AvoidValuebac = False
LimitAngleFlag = 0


url = 'http://yindaheng98.top:3001/enter/'


def loopUp():
    global LimitAngleFlag
    AvoidValuefor = GPIO.input(AvoidSensorfor)
    if AvoidValuefor == False:
        id = capture_detect()
        print("入口处传数据"+url+id)
        response = requests.get(url+id)
        print("服务器返回"+response.text)
        if response.text[0:2] == 'ok':
            print("开始抬杆")
            if LimitAngleFlag == 0:
                forward(0.003, 128)  # 512 steps --- 360 angle
                LimitAngleFlag = 1
        else:
            print("出错")


def loopDown():
    global LimitAngleFlag
    print("开始落杆")
    if LimitAngleFlag == 1:
        backward(0.003, 128)  # 512 steps --- 360 angle
        LimitAngleFlag = 0


if __name__ == '__main__':
    try:
        while True:
            loopUp()
            AvoidValuebac = GPIO.input(AvoidSensorbac)
            if AvoidValuebac == False:
                print("抬杆完成")
                while True:
                    AvoidValuebac = GPIO.input(AvoidSensorbac)
                    if AvoidValuebac == True:
                        print("车已开走")
                        loopDown()
                        break

    # When 'Ctrl+C' is pressed, the child function destroy() will be  executed.
    except KeyboardInterrupt:
        destroy()
