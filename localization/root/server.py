from root.api.categories.router import category_router
from root.api.censorship.router import censorship_router
from root.api.location.router import location_router
from root.api.qr.router import qr_router
from root.api.text.router import text_router
from root.api.users.router import users_router
from root.create_app import app


def create_app():
    app.register_blueprint(category_router)
    app.register_blueprint(location_router)
    app.register_blueprint(qr_router)
    app.register_blueprint(text_router)
    app.register_blueprint(censorship_router)
    app.register_blueprint(users_router)

    return app


if __name__ == "__main__":
    create_app().run(host="0.0.0.0")
