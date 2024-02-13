import mysql.connector
from PIL import Image
import io

cnx = mysql.connector.connect(user='root', password='root', host='localhost', database='MapDatabase')

cursor = cnx.cursor()

query = "SELECT image_data FROM game_dataset WHERE Country_Lower = %s"
Country_Lower = 'japan'

cursor.execute(query, (Country_Lower,))

result = cursor.fetchone()

if result:
    image_data = result[0]
else:
    print("Image not found.")
    image_data = None

cursor.close()
cnx.close()

if image_data:
    image = Image.open(io.BytesIO(image_data))
    image.show()
