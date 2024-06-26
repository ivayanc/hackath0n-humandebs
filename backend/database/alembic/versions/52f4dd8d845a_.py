"""empty message

Revision ID: 52f4dd8d845a
Revises: 
Create Date: 2024-05-11 21:48:06.395987

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '52f4dd8d845a'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('attachments',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('file_name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('regions',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('region_name', sa.String(), nullable=False),
    sa.Column('longitude', sa.Float(), nullable=False),
    sa.Column('latitude', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('full_name', sa.String(), nullable=False),
    sa.Column('phone_number', sa.String(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('requests',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('surname', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('completed_actions', sa.String(), nullable=False),
    sa.Column('phone_number', sa.String(), nullable=False),
    sa.Column('contact_phone_number', sa.String(), nullable=False),
    sa.Column('probably_dead', sa.Boolean(), nullable=False),
    sa.Column('is_soldier', sa.Boolean(), nullable=False),
    sa.Column('last_location_longitude', sa.Float(), nullable=False),
    sa.Column('last_location_latitude', sa.Float(), nullable=False),
    sa.Column('region_id', sa.BigInteger(), nullable=False),
    sa.Column('attachment_id', sa.BigInteger(), nullable=False),
    sa.Column('is_closed', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['attachment_id'], ['attachments.id'], ),
    sa.ForeignKeyConstraint(['region_id'], ['regions.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('routes',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('route_time', sa.Integer(), nullable=False),
    sa.Column('created_by_id', sa.BigInteger(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['created_by_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('request_id', sa.BigInteger(), nullable=False),
    sa.Column('text', sa.String(), nullable=False),
    sa.Column('created_by_id', sa.BigInteger(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['created_by_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['request_id'], ['requests.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('route_checkpoints',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('region_id', sa.BigInteger(), nullable=False),
    sa.Column('route_id', sa.BigInteger(), nullable=False),
    sa.Column('position', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['region_id'], ['regions.id'], ),
    sa.ForeignKeyConstraint(['route_id'], ['routes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('route_checkpoints')
    op.drop_table('comments')
    op.drop_table('routes')
    op.drop_table('requests')
    op.drop_table('users')
    op.drop_table('regions')
    op.drop_table('attachments')
    # ### end Alembic commands ###
