import re
from datetime import datetime

from root.api.censorship.types.event_validator_errors import EventValidatorErrorTypes
from root.api.censorship.types.validator_types import (  # , EventOnPoster
    EventValidatorResult,
    PostEventPayload,
)

EXCLUDE_LIST: list[str] = [
    "хуй",
    "негр",
    "ниггер",
    "нигер",
    "пизда",
    "ебать",
    "бля",
    "ебанутый",
    "митинг",
]
EXCLUDE_LIST_REGEXP: list[str] = [
    r".*расты",
    r".*расы",
    r"пид[aоp]?.*",
    r".*пизд.*",
    r".*ху[йёеяю]?.*",
    r".*бл[ялaу]?.*",
    r".*еб[иуаеё]?.*",
    r"сц?ук[аио]{1}",
]

title_minimum_length_symbols = 3
title_maximum_length_symbols = 100

description_minimum_length_symbols = 3
description_maximum_length_symbols = 100

image_url_minimum_length_symbols = 3
image_url_maximum_length_symbols = 100

url_minimum_length_symbols = 3
url_maximum_length_symbols = 100


class EventsValidator:
    def validate_event(self, event: PostEventPayload) -> EventValidatorResult:
        if event is None:
            result = EventValidatorResult(
                isValid=False, errors=[EventValidatorErrorTypes.EVENT_IS_NOT_DEFINED]
            )
            return result

        # get data from event
        event = event.get("event")  # type: ignore
        prevalidation_event_result: EventValidatorResult = self.prevalidation_event(
            event
        )

        if not prevalidation_event_result.isValid:
            return prevalidation_event_result

        title_is_ok = self.validate_string(event.get("title", None))
        description_is_ok = self.validate_string(event.get("description", None))

        if not title_is_ok or not description_is_ok:
            errors: list[tuple[str]] = []
            if not title_is_ok:
                errors.append(EventValidatorErrorTypes.TITLE_IS_NOT_CLEAN)
            if not description_is_ok:
                errors.append(EventValidatorErrorTypes.DESCRIPTION_IS_NOT_CLEAN)
            result = EventValidatorResult(isValid=False, errors=errors)
            return result

        result = EventValidatorResult(isValid=True, errors=[])
        return result

    def prevalidation_event(
        self, event: PostEventPayload().event  # type: ignore
    ) -> EventValidatorResult:
        if event is None:  # Двойная проверка нам точно нужна?
            result = EventValidatorResult(
                isValid=False, errors=[EventValidatorErrorTypes.EVENT_IS_NOT_DEFINED]
            )
            return result

        errors: list[tuple[str]] = (
            self.validate_title(event.get("title"))
            + self.validate_description(event.get("description"))
            + self.validate_date(event.get("date"))
            + self.validate_duration(event.get("durationInSeconds"))
            + self.validate_location(event.get("location"))
            + self.validate_image(event.get("image"))
            + self.validate_url(event.get("url"))
        )

        result = EventValidatorResult(isValid=len(errors) == 0, errors=errors)
        return result

    def validate_string(self, line: str) -> bool:
        # start_time = datetime.now()
        words = line.split(" ")  # filter?
        for word in words:
            if not word.isdigit():  # сразу выбрасываем числа
                if (
                    len(word) > 2
                ):  # из двух букв нельзя составить гадость, а цикл ускорит
                    for direct_exclusion_word in EXCLUDE_LIST:
                        if word.lower() == direct_exclusion_word:
                            return False
                    for regexp_exclusion_word in EXCLUDE_LIST_REGEXP:
                        regexp_result = re.match(regexp_exclusion_word, word)
                        if regexp_result is not None:
                            return False
        return True

    def validate_title(self, title: str) -> list[tuple[str]]:
        errors: list[tuple[str]] = []
        if title is None or title == "":
            errors.append(EventValidatorErrorTypes.TITLE_IS_NOT_DEFINED)
        elif len(title) < title_minimum_length_symbols:
            errors.append(EventValidatorErrorTypes.TITLE_IS_TOO_SHORT)
        elif len(title) > title_maximum_length_symbols:
            errors.append(EventValidatorErrorTypes.TITLE_IS_TOO_LONG)
        return errors

    def validate_description(self, description: str) -> list[tuple[str]]:
        errors: list[tuple[str]] = []
        if description is None or description == "":
            errors.append(EventValidatorErrorTypes.DESCRIPTION_IS_NOT_DEFINED)
        elif len(description) < description_minimum_length_symbols:
            errors.append(EventValidatorErrorTypes.DESCRIPTION_IS_TOO_SHORT)
        elif len(description) > description_maximum_length_symbols:
            errors.append(EventValidatorErrorTypes.DESCRIPTION_IS_TOO_LONG)
        return errors

    def validate_date(self, date: int) -> list[tuple[str]]:
        errors: list[tuple[str]] = []
        if date is None or date == "":
            errors.append(EventValidatorErrorTypes.START_DATE_IS_NOT_DEFINED)
        elif date < int(
            datetime.now().strftime("%Y%m%d")
        ):  # date = int с 1970 года unix timestamp
            errors.append(EventValidatorErrorTypes.START_DATE_IS_IN_THE_PAST)
        return errors

    def validate_duration(self, duration: int) -> list[tuple[str]]:
        errors: list[tuple[str]] = []
        if duration is not None and duration < 0:
            errors.append(EventValidatorErrorTypes.DURATION_IS_NEGATIVE)
        return errors

    def validate_location(self, location: dict[str, str]) -> list[tuple[str]]:
        errors: list[tuple[str]] = []

        if location is None or location == {}:
            errors.append(EventValidatorErrorTypes.LOCATION_IS_NOT_DEFINED)
        else:
            if (
                location.get("country") is None or location.get("country") == ""
            ):  # Нужна проверка по списку
                errors.append(EventValidatorErrorTypes.COUNTRY_IS_NOT_DEFINED)
            if (
                location.get("city") is None or location.get("city") == ""
            ):  # Нужна проверка по списку
                errors.append(EventValidatorErrorTypes.CITY_IS_NOT_DEFINED)

        return errors

    def validate_image(self, image: str) -> list[tuple[str]]:
        errors: list[tuple[str]] = []
        if image is None or image == "":
            return []
        elif len(image) < image_url_minimum_length_symbols:
            errors.append(EventValidatorErrorTypes.IMAGE_LINK_IS_TOO_SHORT)
        elif len(image) > image_url_maximum_length_symbols:
            errors.append(EventValidatorErrorTypes.IMAGE_LINK_IS_TOO_LONG)
        return errors

    def validate_url(self, url: str) -> list[tuple[str]]:
        errors: list[tuple[str]] = []
        if url is None or url == "":
            errors.append(EventValidatorErrorTypes.URL_IS_NOT_DEFINED)
        elif len(url) < url_minimum_length_symbols:
            errors.append(EventValidatorErrorTypes.URL_IS_TOO_SHORT)
        elif len(url) > url_maximum_length_symbols:
            errors.append(EventValidatorErrorTypes.URL_IS_TOO_LONG)
        return errors
