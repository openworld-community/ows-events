import os

from flask import Blueprint, abort, request

from root.api.location.location_description_controller import (
    locationDescriptionController,
)
from root.auth import is_authorized

location_router = Blueprint("Location", __name__)


@location_router.route("/get_description_for_location", methods=["POST"])
def get_description_for_location():
    AUTH = os.getenv("AUTH")
    authorization_header = request.headers.get("Authorization")

    if not is_authorized(
        token_to_validate=AUTH, token_from_request=authorization_header
    ):
        abort(403)

    language = request.form.get("language")
    location = request.form.get("location")

    if not language:
        return "No language"

    if language not in ["en", "ru"]:
        return "Wrong language, only en and ru are supported"

    if not location:
        return "No location"

    return locationDescriptionController.get_description(location, language)
