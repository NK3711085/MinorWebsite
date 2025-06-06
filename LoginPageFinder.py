import sys
import sqlite3

email = sys.argv[1]
password = sys.argv[2]

conn = sqlite3.connect('user_data.db')
cursor = conn.cursor()

try:
    cursor.execute('SELECT password FROM users WHERE email = ?', (email,))
    row = cursor.fetchone()

    if row:
        stored_password = row[0]
        if password == stored_password:
            print('success')  
            sys.exit(0)
        else:
            sys.exit(1)
    else:
        sys.exit(1)
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
finally:
    conn.close()
