import qrcode
from path import Path
from PIL import Image, ImageDraw
from pyzbar.pyzbar import decode


def read_qr_code(path_to_download: Path):
    try:
        img = Image.open(path_to_download)
        decoded = decode(img)
        wrote = decoded[0].data.decode("utf-8")
    except Exception as e:
        print("Error", e)
        wrote = None
    return wrote


def get_base_qr_code(text_for_qr: str):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=1,
    )
    qr.add_data(text_for_qr)
    qr.make(fit=True)
    img = qr.get_matrix()

    return qr, img


def get_background_qr_code(length_qr: int, path_to_download: Path):
    try:
        img_before_crop = Image.open(path_to_download)
        x_side, y_side = img_before_crop.size
        min_side = min((x_side, y_side))
        x_gap = (x_side - min_side) / 2
        y_gap = (y_side - min_side) / 2
        crop_area = (x_gap, y_gap, min_side + x_gap, min_side + y_gap)
        background = (
            Image.open(path_to_download)
            .crop(crop_area)
            .resize((length_qr, length_qr))
            .convert("RGBA")
        )
        return background
    except Exception as e:
        print("Error", e)
        return None


def gen_qr_code(text_for_qr: str, path_to_download: Path, path_to_save: Path):
    qr, img = get_base_qr_code(text_for_qr)

    coeff = 20
    coeff_small = round(coeff / 3)
    length_qr = len(img) * coeff

    background = get_background_qr_code(length_qr, path_to_download)

    if not background:
        return False

    back_im = Image.new("RGBA", (length_qr, length_qr), (0, 0, 0, 0))

    black_2 = (0, 0, 0, 200)
    white_1 = (255, 255, 255, 50)
    # white_2 = (255, 255, 255, 200)

    idraw = ImageDraw.Draw(back_im, "RGBA")

    x = 0
    y = 0
    for string in qr.get_matrix():
        this_str = ""
        for i in string:
            pixel = background.getpixel((x, y))

            if i:
                this_str += "1"
                idraw.ellipse(
                    (
                        x + coeff_small,
                        y + coeff_small,
                        x + coeff - coeff_small,
                        y + coeff - coeff_small,
                    ),
                    fill=(pixel[0] - 100, pixel[1] - 100, pixel[2] - 100, 255),
                )

            else:
                this_str += "0"

                pixel = background.getpixel((x, y))
                idraw.ellipse(
                    (
                        x + coeff_small,
                        y + coeff_small,
                        x + coeff - coeff_small,
                        y + coeff - coeff_small,
                    ),
                    fill=(pixel[0] + 100, pixel[1] + 100, pixel[2] + 100, 255),
                )
            x += coeff
        x = 0
        y += coeff

    idraw.rectangle((0, 0, coeff * 9, coeff * 9), fill=white_1)
    idraw.rectangle((length_qr, 0, length_qr - coeff * 9, coeff * 9), fill=white_1)
    idraw.rectangle((0, length_qr, coeff * 9, length_qr - coeff * 9), fill=white_1)
    idraw.rectangle(
        (
            length_qr - coeff * 10,
            length_qr - coeff * 9,
            length_qr - coeff * 6,
            length_qr - coeff * 6,
        ),
        fill=white_1,
    )

    idraw.rectangle((coeff, coeff, coeff * 8, coeff * 2), fill=black_2)
    idraw.rectangle(
        (length_qr - coeff * 8, coeff, length_qr - coeff, coeff * 2), fill=black_2
    )
    idraw.rectangle((coeff, coeff * 7, coeff * 8, coeff * 8), fill=black_2)
    idraw.rectangle(
        (length_qr - coeff * 8, coeff * 7, length_qr - coeff, coeff * 8), fill=black_2
    )
    idraw.rectangle(
        (coeff, length_qr - coeff * 7, coeff * 8, length_qr - coeff * 8), fill=black_2
    )
    idraw.rectangle(
        (coeff, length_qr - coeff * 2, coeff * 8, length_qr - coeff), fill=black_2
    )
    idraw.rectangle(
        (
            length_qr - coeff * 7,
            length_qr - coeff * 7,
            length_qr - coeff * 8,
            length_qr - coeff * 8,
        ),
        fill=black_2,
    )
    idraw.rectangle((coeff * 3, coeff * 3, coeff * 6, coeff * 6), fill=black_2)
    idraw.rectangle(
        (length_qr - coeff * 3, coeff * 3, length_qr - coeff * 6, coeff * 6),
        fill=black_2,
    )
    idraw.rectangle(
        (coeff * 3, length_qr - coeff * 3, coeff * 6, length_qr - coeff * 6),
        fill=black_2,
    )
    idraw.rectangle((coeff, coeff, coeff * 2, coeff * 8), fill=black_2)
    idraw.rectangle((coeff * 7, coeff, coeff * 8, coeff * 8), fill=black_2)

    idraw.rectangle(
        (length_qr - coeff, coeff, length_qr - coeff * 2, coeff * 8), fill=black_2
    )
    idraw.rectangle(
        (length_qr - coeff * 7, coeff, length_qr - coeff * 8, coeff * 8), fill=black_2
    )

    idraw.rectangle(
        (coeff, length_qr - coeff, coeff * 2, length_qr - coeff * 8), fill=black_2
    )
    idraw.rectangle(
        (coeff * 7, length_qr - coeff, coeff * 8, length_qr - coeff * 8), fill=black_2
    )

    idraw.rectangle(
        (
            length_qr - coeff * 10,
            length_qr - coeff * 10,
            length_qr - coeff * 9,
            length_qr - coeff * 5,
        ),
        fill=black_2,
    )
    idraw.rectangle(
        (
            length_qr - coeff * 6,
            length_qr - coeff * 10,
            length_qr - coeff * 5,
            length_qr - coeff * 5,
        ),
        fill=black_2,
    )

    idraw.rectangle(
        (
            length_qr - coeff * 6,
            length_qr - coeff * 10,
            length_qr - coeff * 10,
            length_qr - coeff * 9,
        ),
        fill=black_2,
    )
    idraw.rectangle(
        (
            length_qr - coeff * 6,
            length_qr - coeff * 6,
            length_qr - coeff * 10,
            length_qr - coeff * 5,
        ),
        fill=black_2,
    )

    background.paste(back_im, (0, 0), back_im)

    background.save(path_to_save)
    return True
