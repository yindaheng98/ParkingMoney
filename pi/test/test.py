#coding=utf-8
import requests
import json
url = "http://yindaheng98.top:3003"#车牌识别接口地址
path = "timg.jpg"#要识别的文件路径
files = {'file': open(path, 'rb')}
r = requests.post(url,data={'arg':2}, files=files)
print(r.text)#返回值即为识别结果
print(json.loads(r.text))#返回值即为识别结果
