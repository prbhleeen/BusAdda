# Bus Adda 🚏

## A user-friendly web app for registering bus arrivals and departures with real-time tracking.

### 🌟 Features

- 🖼️ **Elegant UI:** Clean and modern interface built using HTML & CSS for an intuitive user experience.  
- 🚀 **Fully Responsive:** Optimized for desktops, tablets, and mobile devices.  
- 🛠️ **Customizable & Lightweight:** Minimalist codebase that's easy to tweak and expand.  
- 🔀 **Mode Selection:** Separate and user-friendly modes for recording arrivals or departures.  
- ⏱️ **One-Click Timestamping:** Automatically records the exact time with a single click.  
- 🧼 **Streamlined Layout:** Functional and efficient design focused on clarity and usability.  
- 🗃️ **Database Integration:** All data is securely stored in a backend database for long-term tracking and management.

---

### 💻 Technologies Used:

- **Frontend:** HTML, CSS, JavaScript
- **Backend:**  Python, Flask
- **Database:**  MySQL

---

### 🛠️ Prerequisites

Make sure the following are installed on your system:

- ⁠[XAMPP](https://www.apachefriends.org/index.html) (includes Apache and MySQL)
- ⁠A code editor (like VS Code)

---

### ⚙️ Setup Instructions

#### 1. 🧰 Install XAMPP

- ⁠Download and install XAMPP from the official [XAMPP website](https://www.apachefriends.org/index.html).
- Launch the XAMPP Control Panel and *start Apache and MySQL*.

#### 2. 📁 Project Folder

- Clone this repository:
  ```git clone https://github.com/your-username/your-repo-name.git```
   ⁠
- ⁠Move the project folder to the ⁠ htdocs ⁠ directory inside your XAMPP installation.  

#### 3. 🗄️ Create MySQL Database and Table

- ⁠Open [phpMyAdmin](http://localhost/phpmyadmin)
- Create a new database (e.g., ⁠ project_db ⁠)
- Run the following SQL to create the required table:

```
  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL
  );
```

- You can also import the provided ⁠ .sql ⁠ file

#### 4. 🚀 Run the Project

- ⁠Start Apache and MySQL in the XAMPP Control Panel
- ⁠Open your browser and go to:  
  [http://localhost/your-repo-name](http://localhost/your-repo-name)

---
  
### 📌 How to Use:
1. Enter your official ID on the login page.
2. Select whether you're logging an **arrival** or **departure**.
3. Click the checkbox to mark the exact time of arrival or departure.

---

### 👩‍💻 Credits
Special thanks to the contributors:

- **Prabhleen Kaur**  
  [github.com/prbhleeen](https://github.com/prbhleeen)
  
- **Shagun Attri**  
  [github.com/shagunattri06](https://github.com/shagunattri06)
  
- **Shipra**  
  [github.com/Shipra-20](https://github.com/Shipra-20)
  
- **Sunaina Sharma**  
  [github.com/Sunaina-04](https://github.com/Sunaina-04)
  
- **Shreya Sharma**  
  [github.com/shreya616sharma](https://github.com/shreya616sharma)

  ---

### 🌐 Live Demo

Try it out here 👉 https://sunaina-04.github.io/BusAdda/

