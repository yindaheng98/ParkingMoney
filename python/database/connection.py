import mysql.connector


def connect():
    return mysql.connector.connect(
        host='mysql',
        port=3306,
        user='CarsData',
        password='CarsData',
        database='CarsData',
        use_unicode=True)


if __name__ == "__main__":
    conn = connect()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Cars')
    print(cursor.fetchall())
    conn.close()
