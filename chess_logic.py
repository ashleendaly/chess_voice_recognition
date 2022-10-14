import os
import time
import speech_recognition as sr
import playsound
from gtts import gTTS
import chess
import pyaudio
import pyttsx3


board = chess.Board()

def game():
    while board.is_checkmate() == False and board.is_stalemate() == False and board.is_insufficient_material() == False:
        print(board)
        print()
        print(board.legal_moves)
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

        print(move_chess)
        board.push_san(move_chess)
        print()
        print(board)