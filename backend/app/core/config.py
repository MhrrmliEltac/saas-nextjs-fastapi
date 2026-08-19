from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    SECRET_KEY: str = "dev-secret-change-me"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 14

    DATABASE_URL: str = "postgres://postgres:12345678@localhost/fullstack"

    FRONTEND_URL: str = "http://localhost:8080" 
    ENVIRONMENT: str = "development"


settings = Settings()
