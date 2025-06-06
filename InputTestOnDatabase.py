import sqlite3

conn = sqlite3.connect('user_data.db')
cursor = conn.cursor()

user_data = (
    'John',  
    'Doe',   
    'john.doe@example.com',  
    '1234567890', 
    'securepassword',  
    'securepassword',  
    'Male'  
)


cursor.execute('''
    INSERT INTO users (first_name, last_name, email, phone_number, password, confirm_password, gender)
    VALUES (?, ?, ?, ?, ?, ?, ?)
''', user_data)


conn.commit()
conn.close()