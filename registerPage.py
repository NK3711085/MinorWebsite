import sys
import sqlite3

firstName = sys.argv[1]
lastName = sys.argv[2]
email = sys.argv[3]
phoneNumber = sys.argv[4]
password = sys.argv[5]
confirmPassword = sys.argv[6]
gender = sys.argv[7]

try:
    conn = sqlite3.connect('user_data.db')
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO users (first_name, last_name, email, phone_number, password, confirm_password, gender)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (firstName, lastName, email, phoneNumber, password, confirmPassword, gender))

    conn.commit()
    print("User data inserted successfully.")

except sqlite3.IntegrityError as e:
    if "UNIQUE constraint failed: users.email" in str(e):
        print("Email already registered")
    else:
        print(f"Database Error: {e}")
    sys.exit(1)

finally:
    conn.close()
