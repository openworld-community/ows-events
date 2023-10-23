from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    USER: str
    PASSWORD: str
    HOST: str
    PORT: str
    DB: str
    AUTH: str
    OPENAI_API_KEY: str

    SECRET_KEY: str

    @property
    def DATABASE_URL(self):
        return f"postgresql://{self.USER}:{self.PASSWORD}@{self.HOST}:{self.PORT}/{self.DB}?sslmode=disable"

    class Config:
        env_file = ".env"


settings = Settings()
