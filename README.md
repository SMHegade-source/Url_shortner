# 🔗 URL Shortener Web Application

A modern full-stack URL Shortener built using FastAPI that converts long URLs into short, shareable links with a clean and responsive user interface.

This project demonstrates backend API development, database integration, frontend design, and full-stack application workflow.

---

# 🚀 Features

- Generate short URLs from long links
- Unique random 6-character short codes
- Redirect shortened URLs to original URLs
- SQLite database storage
- Click tracking support
- Responsive frontend UI
- Copy-to-clipboard functionality
- REST API backend
- Smooth animations and modern design

---

# 🛠 Tech Stack

## Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Uvicorn

## Frontend
- HTML
- CSS
- JavaScript
- Jinja2 Templates

---

# 📂 Project Structure


url_short_proj/

│
├── app/
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── schemas.py
│ ├── keygen.py
│
├── templates/
│ └── index.html
│
├── static/
│ ├── style.css
│ └── script.js
│
├── requirements.txt
├── sql_app.db
├── README.md


---

# ▶️ How to Run the Project

## Step 1 — Clone Repository


git clone https://github.com/SMHegade-source/Url_shortner.git

cd Url_shortner


---

## Step 2 — Create Virtual Environment (Recommended)


python -m venv venv
.\venv\Scripts\activate


---

## Step 3 — Install Dependencies


pip install -r requirements.txt


---

## Step 4 — Run Server


uvicorn app.main:app --reload


---

## Step 5 — Open in Browser


http://127.0.0.1:8000


---

# ⚙️ Working Flow

1. User enters a long URL in the input field.
2. Backend generates a unique short code.
3. URL mapping is stored in SQLite database.
4. Short URL is generated and displayed.
5. When accessed, the short URL redirects to the original link.

---

# 📌 API Endpoint

## Shorten URL

POST `/api/shorten`

Request:


{
"target_url": "https://example.com
"
}


Response:


{
"short_code": "abc123",
"target_url": "https://example.com
"
}


---

# 📈 Future Enhancements

- Custom short URLs
- Expiration time for links
- QR code generation
- Click analytics dashboard
- User authentication
- URL history tracking

---

# 🎯 Learning Outcomes

- Built REST APIs using FastAPI
- Integrated SQLite database with SQLAlchemy
- Implemented dynamic frontend using JavaScript
- Designed responsive UI with CSS
- Managed full-stack project workflow
- Implemented URL redirection logic

---

# 👨‍💻 Author

**Shreedhar Hegade**

GitHub:  
https://github.com/SMHegade-source
