# start = [0, 3, 6]
start = [10, 16, 6, 0, 1, 17]

# 41 seconds lts goooooooooo
def main():
    turn = 0
    number, lastNum = -1, -1
    said = {}  # number: [lastSaid - 1, lastSaid]

    while turn < 30000000:
        if turn < len(start):
            number = start[turn]
        else:
            if len(said[lastNum]) == 1:
                number = 0
            else:
                number = said[lastNum][1] - said[lastNum][0]

        if number in said:
            said[number].append(turn)
            if len(said[number]) > 2:
                said[number].pop(0)
        else:
            said[number] = [turn]

        turn += 1
        lastNum = number

    return number


if __name__ == "__main__":
    print(main())
