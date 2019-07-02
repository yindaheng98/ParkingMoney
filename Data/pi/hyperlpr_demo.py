from hyperlpr import *
#导入OpenCV库
import cv2
#读入图片
image = cv2.imread("demo.jpg")
#识别结果
print(HyperLPR_PlateRecogntion(image))
