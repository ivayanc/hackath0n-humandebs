from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.public_api import router as public_api_router
from routers.auth import router as auth_router
from routers.regions import router as region_router
from routers.requests import router as request_router
from routers.routes import router as routes_router

from configuration import ORIGINS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(public_api_router)
app.include_router(auth_router)
app.include_router(region_router)
app.include_router(request_router)
app.include_router(routes_router)
