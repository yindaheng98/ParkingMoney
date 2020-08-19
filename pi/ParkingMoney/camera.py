import picamera
import requests
import json
camera = picamera.PiCamera()
#from hyperlpr import HyperLPR_PlateRecogntion
#import cv2


def capture(path):
    camera.capture(path)
    print('摄像头捕获图像'+path)


def detect(path):
    print('开始识别图像'+path)
    #image = cv2.imread(path)
    #id = '123456'
    #id = HyperLPR_PlateRecogntion(image)
    url1 = "http://hyper-hdr.parking-money.yindaheng98.top:30000"  # 车牌识别接口地址
    
    files = {'file': open(path, 'rb')}
   
    r = requests.post(url1, {'arg': 3}, files=files) 
    print("a")
    print(r.text)
    id = json.loads(r.text)
    print(id)  # 返回值即为识别结果
    if id == [[]]:
        return 0
    id = id[0][0][0]
    return id


def capture_detect():
    path = "image.jpg"
    capture(path)
    return detect(path)
