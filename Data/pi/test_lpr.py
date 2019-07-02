import cv2
from hyperlpr import HyperLPR_PlateRecogntion
path='demo.jpg'
result = HyperLPR_PlateRecogntion(cv2.imread(path))
print(result)
