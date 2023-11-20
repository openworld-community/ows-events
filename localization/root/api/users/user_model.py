from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String

from root.database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, nullable=False)
    username = Column(String, unique=True)
    password_hash = Column(String, nullable=False)
    create_date = Column(DateTime(), default=datetime.now, nullable=False)
    last_access_date = Column(
        DateTime(), default=datetime.now, onupdate=datetime.now, nullable=False
    )
