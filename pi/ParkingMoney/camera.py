import picamera
camera = picamera.PiCamera()
#from hyperlpr import HyperLPR_PlateRecogntion
#import cv2


def capture(path):
    camera.capture(path)
    print('摄像头捕获图像'+path)


def detect(path):
    print('开始识别图像'+path)
    #image = cv2.imread(path)
    id = '123456'
    #id = HyperLPR_PlateRecogntion(image)
    print("识别结果"+id)
    return id


def capture_detect():
    path = "image.jpg"
    capture(path)
    return detect(path)
