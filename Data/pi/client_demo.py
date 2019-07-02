#coding=utf-8
import requests
import json
url = "http://localhost:8080"
path = "demo.jpg"
files = {'file': open(path, 'rb')}
r = requests.post(url, files=files)
print(r.url)
print(r.text)
print(json.loads(r.text))
