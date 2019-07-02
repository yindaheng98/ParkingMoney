# coding=utf-8
from http.server import BaseHTTPRequestHandler
import cgi
import cv2
from hyperlpr import HyperLPR_PlateRecogntion
import json

from database import conn,rand_filename,add

class PostHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={
                'REQUEST_METHOD': 'POST',
                     'CONTENT_TYPE': self.headers['Content-Type']
                     }
        )
        self.send_response(200)
        self.end_headers()
        
        result=[]
        for field in form.keys():
            field_item = form[field]
            filename = rand_filename(32,'images/%s.'+form[field].filename.split('.')[-1])
            with open(filename, 'wb') as f:
                f.write(form[field].value)
            result.append(HyperLPR_PlateRecogntion(cv2.imread(filename)))
            json_result=json.dumps(result)
        self.wfile.write(json_result.encode('utf-8'))
        if result!=[]:
            add(filename,json_result)
        return


def StartServer():
    from http.server import HTTPServer
    sever = HTTPServer(("", 8080), PostHandler)
    sever.serve_forever()


if __name__ == '__main__':
    StartServer()
    conn.close()
