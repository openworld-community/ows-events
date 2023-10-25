from datetime import datetime

from sqlalchemy import Column, DateTime, Text

from root.database import Base


class Translate(Base):
    __tablename__ = "translation_result"

    source_text = Column(Text, nullable=False)
    target_language = Column(Text, nullable=False)
    translated_text = Column(Text)
    create_date = Column(DateTime(), default=datetime.now, nullable=False)
    last_access_date = Column(
        DateTime(), default=datetime.now, onupdate=datetime.now, nullable=False
    )
