import chess


def update_board(board):
    move = input("What is your chess move: ")

    move_data = move.split(" ")


    if len(move_data) == 3:
        if move_data[0] == "pawn":
            move_chess = "ex" + move_data[2]
        else:
            move_chess = move_data[0][0].upper() + "x" + move_data[2]
    elif len(move_data) == 2:
        if move_data[0] == "pawn":
            move_chess = move_data[1]
        else:
            move_chess = move_data[0][0].upper() + move_data[1]
    else:
        move_chess = move_data[0]

    board.push_san(move_chess)
