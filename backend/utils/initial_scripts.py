from database.base import session

from database.models.regions import Region


def create_basic_regions() -> None:
    with session() as s:
        region = Region(
            region_name='Костянтинівка',
            latitude=48.52027011981407,
            longitude=37.71064611066391
        )
        region2 = Region(
            region_name='Краматорськ',
            latitude=48.73755455924443,
            longitude=37.583940377427
        )
        s.add(region)
        s.add(region2)
        s.commit()
        s.refresh(region)
