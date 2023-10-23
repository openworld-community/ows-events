from datetime import datetime

from sqlalchemy import Column, DateTime, Text

from root.database import Base


class Category(Base):
    __tablename__ = "category_cache"

    source_text = Column(Text, nullable=False)
    category_text = Column(Text, nullable=False)
    create_date = Column(DateTime(), default=datetime.now, nullable=False)
    last_access_date = Column(
        DateTime(), default=datetime.now, onupdate=datetime.now, nullable=False
    )
