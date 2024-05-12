from database.base import session

from database.models.regions import Region, RegionPlace


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
        region_place = RegionPlace(
            region=region6,
            place_name='Відділ розвитку смт Нью-Йорк Торецької міської військово-цивільної адміністрації Бахмутського району Донецької області',
            latitude=48.33426587842258,
            longitude=37.83683508095289
        )
        region_place2 = RegionPlace(
            region=region,
            place_name='Міський відділ поліції',
            latitude=48.535454676636874,
            longitude=37.68926385349724
        )
        region_place3 = RegionPlace(
            region=region,
            place_name='Костянтинівська міська рада',
            latitude=48.533756219361095,
            longitude=37.69365925608739
        )
        region_place4 = RegionPlace(
            region=region2,
            place_name='Краматорський відділок Поліції',
            latitude=48.749121280627854,
            longitude=37.59281749491971
        )
        region_place5 = RegionPlace(
            region=region2,
            place_name='Краматорська міська рада',
            latitude=48.738018348623626,
            longitude=37.58371417495071
        )
        region_place6 = RegionPlace(
            region=region3,
            place_name="Слов'янська міська рада",
            latitude=48.85273616009194,
            longitude=37.60654988422588
        )
        region_place7 = RegionPlace(
            region=region5,
            place_name="Військово-цивільна адміністрація міста Торецьк",
            latitude=48.394693882035604,
            longitude=37.850243011186826
        )
        s.add(region)
        s.add(region2)
        s.add(region3)
        s.add(region4)
        s.add(region5)
        s.add(region6)
        s.add(region_place)
        s.add(region_place2)
        s.add(region_place3)
        s.add(region_place4)
        s.add(region_place5)
        s.add(region_place6)
        s.add(region_place7)
        s.commit()
        s.refresh(region)
