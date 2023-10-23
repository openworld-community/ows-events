import os
from urllib import parse as url_parse
from urllib import request as url_request

from flask import Blueprint, request, send_file
from path import Path

from root.api.qr.main_qr import gen_qr_code

NO_CACHE = False

STORE_PATH = Path("/app/store")
print(STORE_PATH)


def download(url, path):
    opener = url_request.URLopener()
    opener.addheader(("User-Agent", "whatever"))
    opener.retrieve(url, path)


def remove_file(path):
    if os.path.isfile(path):
        os.remove(path)


os.makedirs(STORE_PATH, exist_ok=True)
os.makedirs(STORE_PATH / "source", exist_ok=True)
os.makedirs(STORE_PATH / "result", exist_ok=True)

qr_router = Blueprint("QR", __name__)


@qr_router.route("/get_qr")
def get_qr():
    args = request.args

    url = args.get("url")
    original = args.get("original")

    if not url:
        return "No url"

    if not original:
        return "No original"

    qr_name = url_parse.quote_plus(original) + url_parse.quote_plus(url) + ".png"
    qr_path = Path().joinpath("store", "result", qr_name)

    if NO_CACHE or not os.path.isfile(qr_path):
        path_to_source_image = STORE_PATH / "source" / url_parse.quote_plus(original)
        path_to_save = STORE_PATH / "result" / qr_name

        download(original, path_to_source_image)

        gen_qr_code(url, path_to_source_image, path_to_save)

        remove_file(path_to_source_image)

    return send_file("../store/result/" + qr_name)
