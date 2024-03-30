import pandas as pd
import mysql.connector
from mysql.connector import Error

# Replace the following MySQL connection parameters with your own
host_name = 'localhost'
db_name = 'MapDatabase'
user_name = 'root'
user_password = 'root'
table_name = 'game_dataset'
excel_file_path = 'game_dataset.xlsx'

try:
    # Connect to the MySQL database
    connection = mysql.connector.connect(host=host_name,
                                         database=db_name,
                                         user=user_name,
                                         password=user_password)
    if connection.is_connected():
        # Fetch data from MySQL table
        query = f"SELECT * FROM {table_name}"
        df = pd.read_sql(query, connection)

        # Write data to an Excel file
        df.to_excel(excel_file_path, index=False)

        print(f"Table '{table_name}' has been written to '{excel_file_path}'")

except Error as e:
    print(f"Error: {e}")
finally:
    if connection.is_connected():
        connection.close()
