import os

from flask import Blueprint, abort, request
from mtranslate import translate

from root.api.text.language_recognizer import languageRecognizer
from root.api.text.seo_optimisation_controller import seoOptimisationController
from root.api.text.translate_query import cache_text, last_access_register, search_text
from root.auth import is_authorized

text_router = Blueprint("Text", __name__)


@text_router.route("/")
@text_router.route("/translated_text")
def translated_text() -> str:
    AUTH = os.getenv("AUTH")
    authorization_header = request.headers.get("Authorization")

    if not is_authorized(
        token_to_validate=AUTH, token_from_request=authorization_header
    ):
        abort(403)
    args = request.args

    text_to_translate = args.get("text")
    target_language = args.get("tl")

    if not text_to_translate:
        return "No text"

    if not target_language:
        return "No target language"

    search_result = search_text(
        text_to_translate=text_to_translate,
        table="translation_result",
        language=target_language,
    )

    if search_result:
        result = search_result[0]["translated_text"]
        last_access_register(
            text_to_translate=text_to_translate,
            table="translation_result",
            language=target_language,
        )
    else:
        result = translate(text_to_translate, target_language)
        cache_text(
            text_to_translate=text_to_translate,
            table="translation_result",
            language=target_language,
            result=result,
        )
    return result


@text_router.route("/get_seo_optimised_text", methods=["POST"])
def get_seo_optimised_text() -> str:
    AUTH = os.getenv("AUTH")
    authorization_header = request.headers.get("Authorization")

    if not is_authorized(
        token_to_validate=AUTH, token_from_request=authorization_header
    ):
        abort(403)

    language = request.form.get("language")
    text = request.form.get("text")

    if not language:
        return "No language"

    if language not in ["en", "ru"]:
        return "Wrong language, only en and ru are supported"

    if not text:
        return "No text"

    return seoOptimisationController.get_text(text, language)


@text_router.route("/get_language", methods=["POST"])
def get_language():
    AUTH = os.getenv("AUTH")
    authorization_header = request.headers.get("Authorization")

    if not is_authorized(
        token_to_validate=AUTH, token_from_request=authorization_header
    ):
        abort(403)

    text = request.form.get("text")

    if not text:
        return "No text"

    return languageRecognizer.recognize_language(text)
