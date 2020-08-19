import RPi.GPIO as GPIO
import requests

from ParkingMoney import AvoidSensorfor, AvoidSensorbac, destroy
from ParkingMoney.motor import forward, backward, stop
from ParkingMoney.camera import capture_detect

AvoidValuefor = False
AvoidValuebac = False
LimitAngleFlag = 0
full_flag = False


url = 'http://parking-money.yindaheng98.top:30000/enter/'


def loopUp():
    global LimitAngleFlag
    global full_flag
    AvoidValuefor = GPIO.input(AvoidSensorfor)           
    print("入口处传数据"+url+id)
    response = requests.get(url+id)
    print("服务器返回"+response.text)
    if response.text[0:2] == 'ok':
        print("开始抬杆")
        if LimitAngleFlag == 0:
            backward(0.003, 128)  # 512 steps --- 360 angle
            LimitAngleFlag = 1
    else:
        full_flag = True
        print("出错")


def loopDown():
    global LimitAngleFlag
    print("开始落杆")
    if LimitAngleFlag == 1:
        forward(0.003, 128)  # 512 steps --- 360 angle
        LimitAngleFlag = 0


if __name__ == '__main__':
    try:
        while True:
            flag = 0
            AvoidValuefor = GPIO.input(AvoidSensorfor)
            if AvoidValuefor == False:
                while True:
                    id = capture_detect()
                    AvoidValuefor = GPIO.input(AvoidSensorfor)
                    if AvoidValuefor == True:
                        print("car could't enter in and is off")
                        break
                    if id!=0:
                        #break   
                        #if AvoidValuefor == False:            
                        loopUp()
                        if full_flag:
                            break
                        print("抬杆完成")
                        while True:
                            AvoidValuebac = GPIO.input(AvoidSensorbac)
                            if AvoidValuebac == False:
                                print("a")
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
    # When 'Ctrl+C' is pressed, the child function destroy() will be  executed.
    except KeyboardInterrupt:
        destroy()
