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

        cursor.execute("SELECT * FROM users WHERE employee_id = %s", (employee_id,))
        result = cursor.fetchone()

        if result:
            if result[1].lower() == employee_name.lower():  # assuming result[1] is name
                session['employee_id'] = employee_id
                session['employee_name'] = result[1]
                flash('Login successful!', 'success')
                return redirect(url_for('dashboard'))
            else:
                flash('Name does not match for the given Employee ID.', 'error')
                return render_template('login.html')  # Stay on same page
        else:
            flash('Employee ID not found. Please register first.', 'error')
            return render_template('login.html')

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
                flash('User already registered. Please log in.', 'info')
                return render_template('register.html')
            else:
                flash(f'Employee ID {employee_id} is already taken by another user ({existing_name}).', 'error')
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