import mysql.connector

def connect_and_query():
    try:
        cnx = mysql.connector.connect(
            host="10.178.12.246",
            user="guest_user",
            password="1234",
            database="MapDatabase",
            auth_plugin ='mysql_native_password'
        )

        print("Successfully connected to the database.")

        cursor = cnx.cursor()

        cursor.execute("SELECT * FROM game_dataset")

        print("Connected")
        # for row in cursor:
        #     print(row)

    except mysql.connector.Error as err:
        print(f"Error: {err}")

    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'cnx' in locals():
            cnx.close()
        print("Database connection closed.")

if __name__ == "__main__":
    connect_and_query()
