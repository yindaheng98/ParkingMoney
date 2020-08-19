#coding=utf-8
import requests
import json
url1 = "http://hyper-hdr.parking-money.yindaheng98.top:30000"#车牌识别接口地址
path = "timg.jpg"#要识别的文件路径
files = {'file': open(path, 'rb')}
r = requests.post(url, files=files)
i=json.loads(r.text)
print(i)#返回值即为识别结果
