from sqlalchemy.orm import sessionmaker

from root.database import engine

Session = sessionmaker(engine, expire_on_commit=False, future=True)
session = Session()
