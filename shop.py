from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# --- Database setup ---
def init_db():
    conn = sqlite3.connect("shop.db")
    c = conn.cursor()
    # Users
    c.execute("""CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )""")
    # Sales
    c.execute("""CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        item TEXT,
        qty INTEGER,
        price REAL,
        cost REAL,
        customer_name TEXT,
        customer_phone TEXT
    )""")
    # Expenses
    c.execute("""CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        category TEXT,
        amount REAL
    )""")
    # Inventory
    c.execute("""CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item TEXT,
        stock INTEGER,
        cost REAL
    )""")
    conn.commit()
    conn.close()

init_db()

# --- Routes ---
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    conn = sqlite3.connect("shop.db")
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username=? AND password=?", (data["username"], data["password"]))
    user = c.fetchone()
    conn.close()
    if user:
        return jsonify({"status":"success","message":"Logged in successfully!"})
    else:
        return jsonify({"status":"fail","message":"Invalid credentials"})

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    try:
        conn = sqlite3.connect("shop.db")
        c = conn.cursor()
        c.execute("INSERT INTO users (username,password) VALUES (?,?)", (data["username"], data["password"]))
        conn.commit()
        conn.close()
        return jsonify({"status":"success","message":"User registered!"})
    except:
        return jsonify({"status":"fail","message":"Username already exists"})

@app.route("/add_sale", methods=["POST"])
def add_sale():
    data = request.json
    conn = sqlite3.connect("shop.db")
    c = conn.cursor()
    c.execute("INSERT INTO sales (date,item,qty,price,cost,customer_name,customer_phone) VALUES (?,?,?,?,?,?,?)",
              (data["date"], data["item"], data["qty"], data["price"], data["cost"], data["customer_name"], data["customer_phone"]))
    conn.commit()
    conn.close()
    return jsonify({"status":"success","message":"Sale added!"})

@app.route("/sales", methods=["GET"])
def get_sales():
    conn = sqlite3.connect("shop.db")
    c = conn.cursor()
    c.execute("SELECT * FROM sales")
    rows = c.fetchall()
    conn.close()
    return jsonify(rows)

@app.route("/add_expense", methods=["POST"])
def add_expense():
    data = request.json
    conn = sqlite3.connect("shop.db")
    c = conn.cursor()
    c.execute("INSERT INTO expenses (date,category,amount) VALUES (?,?,?)",
              (data["date"], data["category"], data["amount"]))
    conn.commit()
    conn.close()
    return jsonify({"status":"success","message":"Expense added!"})

@app.route("/add_item", methods=["POST"])
def add_item():
    data = request.json
    conn = sqlite3.connect("shop.db")
    c = conn.cursor()
    c.execute("INSERT INTO inventory (item,stock,cost) VALUES (?,?,?)",
              (data["item"], data["stock"], data["cost"]))
    conn.commit()
    conn.close()
    return jsonify({"status":"success","message":"Item added!"})

if __name__ == "__main__":
    app.run(debug=True)
