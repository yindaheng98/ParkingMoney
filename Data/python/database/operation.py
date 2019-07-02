def add(conn, image, plate):
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO 识别记录(时间,图片,识别结果)VALUES(now(),%s,%s)', (image, plate))
    conn.commit()
    cursor.close()


if __name__ == '__main__':
    from connection import connect
    from rand_filename import rand_filename
    conn = connect()
    add(conn, rand_filename(conn, 16, 'images/%s.jpg'), '1234567')
