from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

from root.config import settings

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

Base = declarative_base()
