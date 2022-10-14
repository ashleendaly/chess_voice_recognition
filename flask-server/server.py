from flask import Flask
from chess_logic import game

app = Flask(__name__)


# Chess API Route
@app.route("/chess-game")
def chessgame():
    game()
    return "Let's play some chess"


if __name__ == "__main__":
    app.run()