from datetime import timedelta, datetime

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from passlib.context import CryptContext
from jose import JWTError, jwt

from models.users import LoginUserDTO, RefreshDTO
from models.auth import TokensDTO, DataTokenDTO

from services.users import UserService

from configuration import JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY

class AuthException(Exception):
    pass

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/login')

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
            "email": user.email
        }
        access_token = AuthService.create_access_token(data=data_to_encode)
        refresh_token = AuthService.create_refresh_token(data=data_to_encode)
        return TokensDTO(
            access_token=access_token,
            refresh_token=refresh_token
        )

    @staticmethod
    def refresh(dto: RefreshDTO):
        data_token = AuthService.verify_refresh_token(
            dto.token,
            HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Wrong refresh token'
            )
        )
        data_to_encode = {
            "email": data_token.email
        }

        access_token = AuthService.create_access_token(data=data_to_encode)
        refresh_token = AuthService.create_refresh_token(data=data_to_encode)
        return TokensDTO(
            access_token=access_token,
            refresh_token=refresh_token
        )

    @staticmethod
    def verify_refresh_token(token: str, credentials_exception):
        try:
            payload = jwt.decode(token, JWT_REFRESH_SECRET_KEY, algorithms=AuthService.ALGORITHM)

            email: str = payload.get("email")

            if email is None:
                raise credentials_exception
            token_data = DataTokenDTO(email=email)
        except JWTError as e:
            print(e)
            raise credentials_exception

        return token_data

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

    @staticmethod
    def verify_token_access(token: str, credentials_exception):
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=ALGORITHM)

            email: str = payload.get("email")

            if email is None:
                raise credentials_exception
            token_data = DataTokenDTO(email=email)
        except JWTError as e:
            raise credentials_exception

        return token_data

    @staticmethod
    def get_current_user(token: str = Depends(oauth2_scheme)):
        credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                              detail="Could not Validate Credentials",
                                              headers={"WWW-Authenticate": "Bearer"})

        token = AuthService.verify_token_access(token, credentials_exception)

        user = UserService.get(email=token.email)

        return user

