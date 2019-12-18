# advent of code 2019 day 9: https://adventofcode.com/2019/day/9
# heavily "inspired" by this guys implementation: https://github.com/20Koen02


def add(tape, opPointer, opArgs, relBase):
    operands = getOperands(tape, opPointer, opArgs, relBase)
    out = operands[0] + operands[1]

    if opArgs[2] == 2:
        tape[tape[opPointer + 3] + relBase] = out
    else:
        tape[tape[opPointer + 3]] = out

    opPointer += 4
    return tape, opPointer


def multiply(tape, opPointer, opArgs, relBase):
    operands = getOperands(tape, opPointer, opArgs, relBase)
    out = operands[0] * operands[1]

    if opArgs[2] == 2:
        tape[tape[opPointer + 3] + relBase] = out
    else:
        tape[tape[opPointer + 3]] = out

    opPointer += 4
    return tape, opPointer


def put(tape, opPointer, opArgs, relBase):
    val = int(input(">> "))

    if opArgs[0] == 2:
        tape[tape[opPointer + 1] + relBase] = val
    else:
        tape[tape[opPointer + 1]] = val

    opPointer += 2
    return tape, opPointer


def look(tape, opPointer, opArgs, relBase):
    if opArgs[0] == 1:
        print(tape[opPointer + 1])
    elif opArgs[0] == 2:
        print(tape[tape[opPointer + 1] + relBase])
    else:
        print(tape[tape[opPointer + 1]])

    opPointer += 2
    return tape, opPointer


def jmpt(tape, opPointer, opArgs, relBase):
    operands = getOperands(tape, opPointer, opArgs, relBase)

    if operands[0] != 0:
        opPointer = operands[1]
    else:
        opPointer += 3

    return tape, opPointer


def jmpf(tape, opPointer, opArgs, relBase):
    operands = getOperands(tape, opPointer, opArgs, relBase)

    if operands[0] == 0:
        opPointer = operands[1]
    else:
        opPointer += 3

    return tape, opPointer


def less(tape, opPointer, opArgs, relBase):
    operands = getOperands(tape, opPointer, opArgs, relBase)
    saveAddress = None

    if opArgs[2] == 2:
        saveAddress = tape[opPointer + 3] + relBase
    else:
        saveAddress = tape[opPointer + 3]

    if operands[0] < operands[1]:
        tape[saveAddress] = 1
    else:
        tape[saveAddress] = 0

    opPointer += 4
    return tape, opPointer


def equal(tape, opPointer, opArgs, relBase):
    operands = getOperands(tape, opPointer, opArgs, relBase)

    if opArgs[2] == 2:
        saveAddress = tape[opPointer + 3] + relBase
    else:
        saveAddress = tape[opPointer + 3]

    if operands[0] == operands[1]:
        tape[saveAddress] = 1
    else:
        tape[saveAddress] = 0

    opPointer += 4
    return tape, opPointer


def change_base(tape, opPointer, opArgs, relBase):
    operands = getOperands(tape, opPointer, opArgs, relBase)
    relBase += operands[0]
    opPointer += 2
    return tape, opPointer, relBase


# helper function to deal with the two types of addressing
# it returns the things to be operated on
def getOperands(tape, opPointer, opArgs, relBase):
    operands = []
    for i in range(len(opArgs)):
        # input at tape[address]
        if opArgs[i] == 0:
            operands.append(tape[tape[opPointer + i + 1]])
        # input is tape[address]
        elif opArgs[i] == 1:
            operands.append(tape[opPointer + i + 1])
        # input at tape[opPointer + relBase]
        elif opArgs[i] == 2:
            operands.append(tape[tape[opPointer + i + 1] + relBase])
    return operands


def main():
    data = open("inputs/day9.txt", "r").readlines()
    tape = list(map(int, data[0].split(",")))
    tape += [0] * 100000
    opPointer = 0
    state = {"tape": tape, "relBase": 0}

    opCodes = {
        1: add,
        2: multiply,
        3: put,
        4: look,
        5: jmpt,
        6: jmpf,
        7: less,
        8: equal,
        9: change_base,
    }

    # run the program
    while True:
        if state["tape"][opPointer] == 99:
            break

        # get opArgs
        operation = [int(x) for x in str(state["tape"][opPointer])]
        operation = [0] * (2 - len(operation)) + operation
        op = state["tape"][opPointer]

        opArgs = [0] * 3
        if len(operation) > 2:
            op = int(str(operation[-2]) + str(operation[-1]))
            opArgs = operation.copy()
            del opArgs[-2:]
            opArgs.reverse()
            opArgs = opArgs + [0] * (3 - len(opArgs))

        # lmao yeet
        if op == 9:
            state["tape"], opPointer, state["relBase"] = opCodes.get(op)(
                state["tape"], opPointer, opArgs, state["relBase"]
            )
        else:
            state["tape"], opPointer = opCodes.get(op)(
                state["tape"], opPointer, opArgs, state["relBase"]
            )


if __name__ == "__main__":
    main()
