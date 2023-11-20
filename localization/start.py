from root.server import create_app

app = create_app()

app.run(host="0.0.0.0", use_reloader=True)
