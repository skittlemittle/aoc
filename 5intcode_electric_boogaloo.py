# advent of code 2019 day 5: https://adventofcode.com/2019/day/5
# heavily "inspired" by this guys implementation: https://github.com/20Koen02


def add(tape, opPointer, opArgs):
    operands = getOperands(tape, opPointer, opArgs)
    out = operands[0] + operands[1]
    tape[tape[opPointer + 3]] = out

    opPointer += 4
    return tape, opPointer


def mult(tape, opPointer, opArgs):
    operands = getOperands(tape, opPointer, opArgs)
    out = operands[0] * operands[1]
    tape[tape[opPointer + 3]] = out

    opPointer += 4
    return tape, opPointer


def put(tape, opPointer, opArgs):
    val = int(input(">> "))
    tape[tape[opPointer + 1]] = val

    opPointer += 2
    return tape, opPointer


def look(tape, opPointer, opArgs):
    if opArgs[0] == 1:
        print(tape[opPointer + 1])
    else:
        print(tape[tape[opPointer + 1]])

    opPointer += 2
    return tape, opPointer


def jmpt(tape, opPointer, opArgs):
    operands = getOperands(tape, opPointer, opArgs)
    
    if operands[0] != 0:
        opPointer = operands[1]
    else:
        opPointer += 3

    return tape, opPointer


def jmpf(tape, opPointer, opArgs):
    operands = getOperands(tape, opPointer, opArgs)
    
    if operands[0] == 0:
        opPointer = operands[1]
    else:
        opPointer += 3

    return tape, opPointer


def lss(tape, opPointer, opArgs):
    operands = getOperands(tape, opPointer, opArgs)
    
    if operands[0] < operands[1]:
        tape[tape[opPointer + 3]] = 1
    else:
        tape[tape[opPointer + 3]] = 0

    opPointer += 4
    return tape, opPointer


def eq(tape, opPointer, opArgs):
    operands = getOperands(tape, opPointer, opArgs)

    if operands[0] == operands[1]:
        tape[tape[opPointer + 3]] = 1
    else:
        tape[tape[opPointer + 3]] = 0

    opPointer += 4
    return tape, opPointer


# helper function to deal with the two types of addressing, it returns the things to be operated on
def getOperands(tape, opPointer, opArgs):
    operands = []
    for i in range(len(opArgs)):
        if opArgs[i] == 0:
            operands.append(tape[tape[opPointer + i + 1]])  # input at tape[address]
        elif opArgs[i] == 1:
            operands.append(tape[opPointer + i + 1])  # input is tape[address]
    return operands


def main():
    data = open("inputs/day5.txt", "r").readlines()
    tape = list(map(int, data[0].split(",")))
    opPointer = 0

    opCodes = {1: add, 2: mult, 3: put, 4: look, 5: jmpt, 6: jmpf, 7: lss, 8: eq}

    # run the program
    while True:
        if tape[opPointer] == 99:
            break

        # get opArgs
        operation = [int(x) for x in str(tape[opPointer])]
        operation = [0] * (2 - len(operation)) + operation
        op = tape[opPointer]

        opArgs = [0, 0, 0]
        if len(operation) > 2:
            op = int(str(operation[-2]) + str(operation[-1]))  # just the operation
            opArgs = operation.copy()
            del opArgs[-2:]
            opArgs.reverse()
            opArgs = opArgs + [0] * (2 - len(opArgs))

        tape, opPointer = opCodes.get(op)(tape, opPointer, opArgs)


if __name__ == "__main__":
    main()
