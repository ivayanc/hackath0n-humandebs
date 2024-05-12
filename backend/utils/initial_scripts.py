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
        region3 = Region(
            region_name="Слов'янськ",
            latitude=48.853952541872445,
            longitude=37.60345220052644
        )
        region4 = Region(
            region_name="Часів Яр",
            latitude=48.58862829983634,
            longitude=37.83539730105749
        )
        region5 = Region(
            region_name="Торецьк",
            latitude=48.397372179321536,
            longitude=37.85516056686654
        )
        region6 = Region(
            region_name="Нью-Йорк",
            latitude=48.33358116771939,
            longitude=37.8400966471821
        )
        s.add(region)
        s.add(region2)
        s.add(region3)
        s.add(region4)
        s.add(region5)
        s.add(region6)
        s.commit()
        s.refresh(region)
