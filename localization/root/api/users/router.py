import os

import jwt
from flask import Blueprint, abort, jsonify, make_response, request
from werkzeug.security import generate_password_hash

from root.api.users.user_model import User
from root.auth import is_authorized
from root.config import settings
from root.session import session

users_router = Blueprint("Users", __name__)


@users_router.route("/signup", methods=["POST"])
def signup_user():
    """Апи для sign up (регистрации пользователя), в json передается username и password_hash"""

    """Доступ к данной ручке доступен только по мастер ключу AUTH"""

    AUTH = os.getenv("AUTH")
    authorization_header = request.headers.get("Authorization")
    if not is_authorized(
        token_to_validate=AUTH, token_from_request=authorization_header
    ):
        abort(403)

    data = request.get_json()

    if not data or not data.get("username") or not data.get("password_hash"):
        return make_response(
            jsonify(
                {
                    "message": "Убедитесь, что вы передали поля username или password_hash"
                }
            )
        )

    hashed_password = generate_password_hash(data["password_hash"])
    user = session.query(User).filter_by(username=data["username"]).first()

    if not user:
        new_user = User(username=data["username"], password_hash=hashed_password)
        session.add(new_user)
        session.commit()

        token = jwt.encode({"user_id": new_user.user_id}, settings.SECRET_KEY, "HS256")

        # Включаем токен в заголовок
        response_data = {"message": "Пользователь успешно создан", "token": token}
        response = jsonify(response_data)
        response.headers["token"] = token
        return response
    else:
        return make_response(
            jsonify({"message": "Такой пользователь уже существует!"}), 409
        )


@users_router.route("/get_new_token", methods=["POST"])
def get_new_token():
    """Апи для получения нового токена"""

    """Доступ к данной ручке доступен только по мастер ключу AUTH"""
    AUTH = os.getenv("AUTH")
    authorization_header = request.headers.get("Authorization")
    if not is_authorized(
        token_to_validate=AUTH, token_from_request=authorization_header
    ):
        abort(403)

    auth_header = request.headers.get("token")
    if not auth_header:
        return make_response("Токен отсутствует", 401)

    token = auth_header

    decoded_token = jwt.decode(token, settings.SECRET_KEY, "HS256")

    user_id = decoded_token["user_id"]

    # Создание нового токена
    new_token = jwt.encode({"user_id": user_id}, settings.SECRET_KEY, "HS256")
    response_data = {"message": "Новый токен получен", "token": new_token}

    return jsonify(response_data), 200


@users_router.route("/users", methods=["GET"])
def get_all_users():
    """Апи по получению всех существующих пользователей"""

    AUTH = os.getenv("AUTH")
    authorization_header = request.headers.get("Authorization")
    if not is_authorized(
        token_to_validate=AUTH, token_from_request=authorization_header
    ):
        abort(403)

    users = session.query(User).all()

    # Преобразование пользователей в список словарей
    users_list = [{"id": user.user_id, "username": user.username} for user in users]

    session.close()

    return users_list


@users_router.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id: int):
    """Апи по удалению пользователя, нужно заметить что используется метод DELETE
    Для корректной работы нужно передать id пользователя в адрес запроса"""

    """Доступ к данной ручке доступен только по мастер ключу AUTH"""
    AUTH = os.getenv("AUTH")
    authorization_header = request.headers.get("Authorization")
    if not is_authorized(
        token_to_validate=AUTH, token_from_request=authorization_header
    ):
        abort(403)

    deleted_user = session.query(User).filter_by(user_id=user_id).first()
    if deleted_user:
        deleted_user_data = {
            "user_id": deleted_user.user_id,
            "username": deleted_user.username,
            "create_date": deleted_user.create_date,
            "last_access_date": deleted_user.last_access_date,
        }
        session.delete(deleted_user)
        session.commit()
        return jsonify({"deleted_user": deleted_user_data})
    else:
        return jsonify({"message": "User not found."}), 404
