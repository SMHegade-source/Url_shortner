from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import RedirectResponse, HTMLResponse
from sqlalchemy.orm import Session
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import os

from . import models, schemas, database, keygen

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="URL Shortener API")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Setup templates
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/api/shorten", response_model=schemas.URLResponse)
def create_url(url: schemas.URLCreate, db: Session = Depends(database.get_db)):
    if not str(url.target_url).startswith(("http://", "https://")):
        raise HTTPException(status_code=400, detail="Invalid URL provided")

    short_code = keygen.create_unique_random_key(db)
    db_url = models.URL(
        target_url=str(url.target_url), short_code=short_code
    )
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url

@app.get("/{short_code}")
def forward_to_target_url(short_code: str, db: Session = Depends(database.get_db)):
    db_url = db.query(models.URL).filter(models.URL.short_code == short_code).first()
    if db_url:
        db_url.clicks += 1
        db.commit()
        return RedirectResponse(db_url.target_url)
    raise HTTPException(status_code=404, detail="URL not found")
