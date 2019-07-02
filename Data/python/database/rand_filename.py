import random
import string


def rand_filename(conn, n, fmt):
    filename = rand_filename_without_check(n, fmt)
    cursor = conn.cursor()
    while(check(cursor, filename)):
        filename = rand_filename_without_check(n, fmt)
    cursor.close()
    return filename


def rand_filename_without_check(n, fmt):
    rand_str = ''.join(random.sample(string.ascii_letters + string.digits, n))
    return fmt % (rand_str)


def check(cursor, filename):
    cursor.execute('SELECT count(*) FROM 识别记录 WHERE 图片=%s', (filename,))
    return cursor.fetchall()[0][0] > 0


if __name__ == '__main__':
    from connection import connect
    conn = connect()
    print(check(conn.cursor(), 'demo.jpg'))
