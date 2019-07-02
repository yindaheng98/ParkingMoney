from .connection import connection as conn

def add(image,plate):
    cursor = conn.cursor()
    cursor.execute('INSERT INTO 识别记录(时间,图片,识别结果)VALUES(now(),%s,%s)',(image,plate))
    conn.commit()
    cursor.close()

if __name__ == '__main__':
    from rand_filename import rand_filename
    add(rand_filename(16,'images/%s.jpg'),'1234567')
