# from jellyfish import soundex

# print(soundex("two"))
from SoundsLike.SoundsLike import Search

# sample data

inputs = [
    ['bishop', 'captures', 'a5'],
    ['king', 'captures', 'b2'],
    ['night', 'captures', 'g4'],
    ['queen', 'captures', 'a4'],
    ['queen', 'takes', 'a6']]


perf_matches, close_matches = [], []

for item in inputs:
    perf_matches = Search.perfectHomophones(item[0])
    close_matches = Search.closeHomophones(item[0])
    print(f'{item[0]}')
    print(f'P: {perf_matches}')
    print(f'C: {close_matches}\n')
