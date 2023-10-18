from dataclasses import dataclass, field


@dataclass
class EventOnPoster(dict):
    id: str = "0"
    creatorId: str = "c0"
    title: str = "Title"
    description: str = "Description"
    date: str = "date_time"  # Может быть дату сделать в формате datetime?
    durationInSeconds: int = (
        1000  # а это вообще зачем? можно использовать формат timedelta
    )
    location: dict[str, str] = field(init=False, repr=True, default_factory=dict)
    country: str = field(init=True, repr=False, default="Limonia")
    city: str = field(init=True, repr=False, default="default_city")

    image: str = (
        "this_is_image_url"  # может быть переименовать поле типа на image_url ?
    )
    price: int = 100  # может тут лучше float с органичением после запятой?
    # может быть добавить переменную currency для мультивалютности?

    timezone: dict[str, str] = field(init=False, repr=True, default_factory=dict)
    timezoneName: str = field(init=True, repr=False, default="time_zone")
    timezoneOffset: str = field(
        init=True, repr=False, default="timezone_offset"
    )  # может быть тоже поменять формат на более удобный?

    url: str = "this_is_url"

    def __post_init__(self):
        # Собираем локацию и временную зону в словари
        self.location = dict(country=self.country, city=self.city)
        self.timezone = dict(
            timezoneName=self.timezoneName, timezoneOffset=self.timezoneOffset
        )


@dataclass
class PostEventPayload(dict):
    event: dict = field(init=False, repr=True, default_factory=dict)

    title: str = field(init=True, repr=False, default="Title")
    description: str = field(init=True, repr=False, default="Description")
    date: str = field(init=True, repr=False, default="date_time")
    durationInSeconds: int = field(init=True, repr=False, default=1000)

    location: dict[str, str] = field(init=False, repr=False, default_factory=dict)
    country: str = field(init=True, repr=False, default="Limonia")
    city: str = field(init=True, repr=False, default="default_city")

    image: str = field(init=True, repr=False, default="this_is_image_url")
    price: int = field(init=True, repr=False, default=100)

    timezone: dict[str, str] = field(init=False, repr=False, default_factory=dict)
    timezoneName: str = field(init=True, repr=False, default="time_zone")
    timezoneOffset: str = field(init=True, repr=False, default="timezone_offset")

    url: str = field(init=True, repr=False, default="this_is_url")

    def __post_init__(self):
        # Собираем локацию и временную зону в словари, а потом и event
        self.location = dict(country=self.country, city=self.city)
        self.timezone = dict(
            timezoneName=self.timezoneName, timezoneOffset=self.timezoneOffset
        )
        self.event = dict(
            title=self.title,
            description=self.description,
            date=self.date,
            durationInSeconds=self.durationInSeconds,
            location=self.location,
            image=self.image,
            price=self.price,
            timezone=self.timezone,
        )


@dataclass
class EventValidatorResult:
    isValid: bool
    errors: list[tuple[str]]
