import mysql.connector

# Function to connect to the MySQL database and execute a query
def connect_and_query():
    try:
        # Establish a connection to the MySQL database
        cnx = mysql.connector.connect(
            host="10.178.12.246",
            user="guest_user",
            password="1234",
            database="MapDatabase",
            auth_plugin ='mysql_native_password'
        )

        print("Successfully connected to the database.")

        # Create a cursor object using the connection
        cursor = cnx.cursor()

        # Execute a SQL query
        cursor.execute("SELECT * FROM game_dataset")

        print("Connected")
        # Fetch and print each row of the query result
        # for row in cursor:
        #     print(row)

    except mysql.connector.Error as err:
        print(f"Error: {err}")

    finally:
        # Close the cursor and connection
        if 'cursor' in locals():
            cursor.close()
        if 'cnx' in locals():
            cnx.close()
        print("Database connection closed.")

# Main program execution
if __name__ == "__main__":
    connect_and_query()
