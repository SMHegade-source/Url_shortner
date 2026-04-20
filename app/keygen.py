import string
import secrets
from sqlalchemy.orm import Session
from . import models

def create_random_key(length: int = 6) -> str:
    chars = string.ascii_letters + string.digits
    return "".join(secrets.choice(chars) for _ in range(length))

def create_unique_random_key(db: Session, length: int = 6) -> str:
    key = create_random_key(length)
    while db.query(models.URL).filter(models.URL.short_code == key).first():
        key = create_random_key(length)
    return key
