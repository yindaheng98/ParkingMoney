import RPi.GPIO as GPIO
from .config import IN1,IN2,IN3,IN4,AvoidSensorfor,AvoidSensorbac

def setup():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(IN1, GPIO.OUT)
    GPIO.setup(IN2, GPIO.OUT)
    GPIO.setup(IN3, GPIO.OUT)
    GPIO.setup(IN4, GPIO.OUT)
    GPIO.setup(AvoidSensorfor, GPIO.IN)
    GPIO.setup(AvoidSensorbac, GPIO.IN)
    print('GPIO初始化完成')


def destroy():
    GPIO.cleanup()  # Release resource


setup()
