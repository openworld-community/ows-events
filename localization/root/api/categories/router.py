import os

from flask import Blueprint, abort, request

from root.auth import is_authorized

from .category_controller import categories, categoryController
from .category_query import (
    cache_category_text,
    last_access_register_category_cache,
    search_category,
)

category_router = Blueprint("Category", __name__)


@category_router.route("/get_category", methods=["POST"])
def get_category():
    AUTH = os.getenv("AUTH")
    authorization_header = request.headers.get("Authorization")

    if not is_authorized(
        token_to_validate=AUTH, token_from_request=authorization_header
    ):
        abort(403)

    text = request.form.get("text")
    if not text:
        return "No text"

    search_result = search_category(
        text_to_category=text,
    )
    first_item = search_result[0] if len(search_result) else None

    if first_item:
        result = first_item
        last_access_register_category_cache(
            text_to_category=text,
        )
    else:
        result = categoryController.get_category(text)
        cache_category_text(
            text_to_category=text,
            result=result,
        )

    return result


@category_router.route("/get_all_categories", methods=["GET"])
def get_all_categories():
    AUTH = os.getenv("AUTH")
    authorization_header = request.headers.get("Authorization")

    if not is_authorized(
        token_to_validate=AUTH, token_from_request=authorization_header
    ):
        abort(403)

    return categories
