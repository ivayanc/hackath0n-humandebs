from datetime import timedelta, datetime

from passlib.context import CryptContext
from jose import JWTError, jwt

from models.users import LoginUserDTO
from models.auth import TokensDTO

from services.users import UserService

from configuration import JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY

class AuthException(Exception):
    pass

class AuthService:
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30
    REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    @staticmethod
    def login(dto: LoginUserDTO) -> TokensDTO:
        user = UserService.get(email=dto.email)
        if not user:
            raise AuthException("User doesn't exist")
        if not AuthService.verify_password(dto.password, user.password):
            raise AuthException("Wrong password")
        data_to_encode = {
            "user_id": user.id
        }
        access_token = AuthService.create_access_token(data=data_to_encode)
        refresh_token = AuthService.create_refresh_token(data=data_to_encode)
        return TokensDTO(
            access_token=access_token,
            refresh_token=refresh_token
        )

    @staticmethod
    def create_access_token(data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=AuthService.ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"expire": expire.strftime("%Y-%m-%d %H:%M:%S")})

        encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, AuthService.ALGORITHM)

        return encoded_jwt

    @staticmethod
    def create_refresh_token(data: dict) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=AuthService.REFRESH_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"expire": expire.strftime("%Y-%m-%d %H:%M:%S")})

        encoded_jwt = jwt.encode(to_encode, JWT_REFRESH_SECRET_KEY, AuthService.ALGORITHM)

        return encoded_jwt

    @staticmethod
    def hash_pass(password: str):
        return AuthService.pwd_context.hash(password)

    @staticmethod
    def verify_password(non_hashed_pass, hashed_pass):
        return AuthService.pwd_context.verify(non_hashed_pass, hashed_pass)
