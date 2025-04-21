import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="mysql@2025",
    database="scm"
)
mycursor = mydb.cursor()

sec = input("Enter name of the table to add data: ")
route_no = input("Enter route number to be added: ")
time = input("Enter time of arrival/departure (in HH:MM format): ")

try:
    query = f"INSERT INTO {sec} (route_no, arr_time) VALUES (%s, %s)"
    mycursor.execute(query, (route_no, time))
    mydb.commit()
    print(mycursor.rowcount, "record inserted successfully.")
except mysql.connector.Error as err:
    print("Error:", err)
    mydb.rollback()
    
mydb.close()