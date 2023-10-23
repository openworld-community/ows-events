from datetime import date

from pydantic import BaseModel


class STranslate(BaseModel):
    source_text: str
    target_language: str
    translated_text: str
    create_date: date
    last_access_date: date
