from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.public_api import router as public_api_router
from routers.auth import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(public_api_router)
app.include_router(auth_router)
