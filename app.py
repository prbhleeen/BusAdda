from flask import Flask, render_template, request, redirect, url_for, session, flash
import mysql.connector

app = Flask(_name_)
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

        query = "SELECT * FROM users WHERE employee_id = %s"
        cursor.execute(query, (employee_id,))
        result = cursor.fetchone()

        if result:
            # Assuming result[0]=id, result[1]=name
            if result[1].lower() == employee_name.lower():  # Case-insensitive match
                session['employee_id'] = employee_id
                session['employee_name'] = result[1]
                flash('Login successful!')
                return redirect(url_for('dashboard'))
            else:
                flash(f'Name does not match for Employee ID {employee_id}.')
                return redirect(url_for('login'))
        else:
            flash('Employee ID not found. Please register first.')
            return redirect(url_for('register'))

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
            existing_name = existing_user[1]
            if existing_name.lower() == employee_name.lower():
                flash('User already registered. Please log in.')
                return redirect(url_for('login'))
            else:
                flash(f'Employee ID {employee_id} is already registered with the name {existing_name}.')
                return redirect(url_for('register'))

        # New user
        query = "INSERT INTO users (employee_id, employee_name) VALUES (%s, %s)"
        cursor.execute(query, (employee_id, employee_name))
        conn.commit()

        session['employee_id'] = employee_id
        session['employee_name'] = employee_name
        flash('Account created!')
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
if _name_ == '_main_':
    app.run(host='0.0.0.0', port=5000)