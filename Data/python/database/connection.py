import mysql.connector
connection = mysql.connector.connect(
    host='mysql',
    port=3306,
    user='CarsData',
    password='CarsData',
    database='CarsData',
    use_unicode=True)

if __name__ == "__main__":
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM Cars')
    print(cursor.fetchall())
