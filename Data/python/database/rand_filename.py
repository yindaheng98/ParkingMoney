import random
import string
from .connection import connection as conn
cursor = conn.cursor()

def rand_filename(n,fmt):
    filename=rand_filename_without_check(n,fmt)
    while(check(filename)):
        filename=rand_filename_without_check(n,fmt)
    return filename

def rand_filename_without_check(n,fmt):
    rand_str=''.join(random.sample(string.ascii_letters + string.digits, n))
    return fmt%(rand_str)

def check(filename):
    cursor.execute('SELECT count(*) FROM 识别记录 WHERE 图片=%s',(filename,))
    return cursor.fetchall()[0][0]>0

if __name__=='__main__':
    print(check('demo.jpg'))
