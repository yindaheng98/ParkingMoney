# coding=utf-8
import logging
from database import connect, rand_filename, add
import json
from hyperlpr import HyperLPR_PlateRecogntion
import cv2
import cgi
from http.server import BaseHTTPRequestHandler


conn = None
logging.basicConfig(level=logging.DEBUG)


class PostHandler(BaseHTTPRequestHandler):
    def log_message(self, *args, **kwargs):
        fmt = 'PostHandler.log_message(%s,%s)'
        logging.debug(fmt % (str(args), str(kwargs)))

    def do_POST(self):
        global conn
        if(conn == None):
            conn = connect()
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

        results = []
        for field in form.keys():
            field_item = form[field]
            filename = rand_filename(conn, 32, '%s.'+form[field].filename.split('.')[-1])
            path='images/'+filename
            with open(path, 'wb') as f:
                f.write(form[field].value)
            result = HyperLPR_PlateRecogntion(cv2.imread(path))
            results.append(result)
            if result != []:
                add(conn, filename, json.dumps(result))
        self.wfile.write(json.dumps(results).encode('utf-8'))
        return


def StartServer():
    from http.server import HTTPServer
    sever = HTTPServer(("", 8080), PostHandler)
    sever.serve_forever()


if __name__ == '__main__':
    logging.debug('车牌识别服务启动！')
    StartServer()
    conn.close()
