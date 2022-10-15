from flask import Flask
from chess_logic import update_board
import chess

app = Flask(__name__)


# Chess API Route
@app.route("/chess-game")
def chessgame():
    board = chess.Board()
    # update_board(board)

    str_board = str(board).replace(" ", "")
    chess_array = str_board.split("\n")

    return chess_array


if __name__ == "__main__":
    app.run()