from random import randint

pieces = ['king', 'queen', 'bishop', 'rooke', 'night', 'pawn']
commands = ['', 'take ', 'takes ', 'capture ', 'captures ']
letters = 'abcdefgh'
digits = '12345678'

number_of_outputs = 5


def get_random(category): return category[randint(0, len(category)-1)]


output = ''
for i in range(number_of_outputs):
    output += get_random(pieces) + ' '
    output += get_random(commands)
    output += get_random(letters)
    output += get_random(digits)
    print(f'{i}: {output.split(" ")}\n')
    output = ''
