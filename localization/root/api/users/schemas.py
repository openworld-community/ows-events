from datetime import date

from pydantic import BaseModel


class SUsers(BaseModel):
    username: str
    password_hash: str
    create_date: date
    last_access_date: date
