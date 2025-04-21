<<<<<<< HEAD
from flask import Flask, render_template, request, redirect, url_for, session, flash
import mysql.connector

app = Flask(__name__)
app.secret_key = 'supersecretkey'

# Database connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="busadda"
)
cursor = conn.cursor()

# Login Page
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        employee_id = request.form.get('employee_id')
        employee_name = request.form.get('employee_name')

        # Query database for the employee_id
        cursor.execute("SELECT * FROM users WHERE employee_id = %s", (employee_id,))
        result = cursor.fetchone()

        # Debugging: Print result from database
        print(f"Database result: {result}")
        if result:
            # Strip extra spaces and make comparison case-insensitive
            db_name = result[2].strip().lower()  # result[2] is employee_name
            input_name = employee_name.strip().lower()

            # Debugging: Print the names being compared
            print(f"Input Name: '{input_name}' | Database Name: '{db_name}'")

            if db_name == input_name:
                session['employee_id'] = employee_id
                session['employee_name'] = result[2]  # Use result[2] for the employee_name
                flash('Login successful!', 'success')
                return redirect(url_for('dashboard'))
            else:
                flash('Name does not match for the given Employee ID.', 'error')
        else:
            flash('Employee ID not found. Please register first.', 'error')

        return render_template('login.html')  # Stay on same page if login fails

    return render_template('login.html')


# Register Page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        employee_id = request.form.get('employee_id')
        employee_name = request.form.get('employee_name')

        cursor.execute("SELECT * FROM users WHERE employee_id = %s", (employee_id,))
        existing_user = cursor.fetchone()

        if existing_user:
            # Strip extra spaces and make comparison case-insensitive
            existing_name = existing_user[2].strip().lower()  # result[2] is employee_name
            input_name = employee_name.strip().lower()

            if existing_name == input_name:
                flash('User already registered. Please log in.', 'info')
                return render_template('register.html')
            else:
                flash(f'Employee ID {employee_id} is already taken by another user .', 'error')
                return render_template('register.html')

        query = "INSERT INTO users (employee_id, employee_name) VALUES (%s, %s)"
        cursor.execute(query, (employee_id, employee_name))
        conn.commit()

        session['employee_id'] = employee_id
        session['employee_name'] = employee_name
        flash('Account created successfully!', 'success')
        return redirect(url_for('dashboard'))

    return render_template('register.html')


# Dashboard Page
@app.route('/dashboard')
def dashboard():
    if 'employee_id' in session:
        return render_template('dashboard.html', name=session['employee_name'])
    else:
        flash('Please login first.')
        return redirect(url_for('login'))


# Arrival Page
@app.route('/arrival')
def arrival():
    name = session.get('employee_name', 'User')
    return render_template('arrival.html', name=name)


# Departure Page
@app.route('/departure')
def departure():
    name = session.get('employee_name', 'User')
    return render_template('departure.html', name=name)


# Run Server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
=======
from flask import Flask, render_template, request, redirect, url_for
import mysql.connector
from flask import Flask, render_template, request, redirect, url_for, session, flash
app = Flask(__name__)
app.secret_key = 'supersecretkey'  # needed for sessions


# Database connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="busadda"
)
cursor = conn.cursor()

# Login page
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        employee_id = request.form.get('employee_id')
        employee_name = request.form.get('employee_name')

        query = "SELECT * FROM users WHERE employee_id=%s"
        cursor.execute(query, (employee_id,))
        result = cursor.fetchone()

        if result:
            session['employee_id'] = employee_id
            session['employee_name'] = result[2]  # assuming 0=id, 1=name
            flash('Login successful!')
            return redirect(url_for('dashboard'))
        else:
            flash('User not found. Please register first.')
            return redirect(url_for('register'))

    return render_template('login.html')


# Register page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        employee_id = request.form.get('employee_id')
        employee_name = request.form.get('employee_name')

        # check if user exists
        cursor.execute("SELECT * FROM users WHERE employee_id = %s", (employee_id,))
        if cursor.fetchone():
            flash('User already registered. Please log in.')
            return redirect(url_for('login'))

        # new user
        query = "INSERT INTO users (employee_id, employee_name) VALUES (%s, %s)"
        cursor.execute(query, (employee_id, employee_name))
        conn.commit()

        session['employee_id'] = employee_id
        session['employee_name'] = employee_name
        flash('Account created!')
        return redirect(url_for('dashboard'))

    return render_template('register.html')

# dashboard 
@app.route('/dashboard')
def dashboard():
    if 'employee_id' in session:
        return render_template('dashboard.html', name=session['employee_name'])
    else:
        flash('Please login first.')
        return redirect(url_for('login'))

# Arrival page
@app.route('/arrival')
def arrival():
    name = session.get('employee_name', 'User')
    return render_template('arrival.html', name=name)

# Departure page
@app.route('/departure')
def departure():
    name = session.get('employee_name', 'User')
    return render_template('departure.html', name=name)


# Run the server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
>>>>>>> backend
