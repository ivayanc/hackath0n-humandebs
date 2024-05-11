from __future__ import annotations

import sqlalchemy as sa

from sqlalchemy.orm import Mapped, mapped_column

from database.base import Base

class Attachment(Base):
    __tablename__ = 'attachments'
    id: Mapped[int] = mapped_column(sa.BigInteger(), primary_key=True, autoincrement=True)
    file_name: Mapped[str]

    def __repr__(self):
        return f'Attachment {self.id}'
