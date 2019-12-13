# advent of code 2019 day 7: https://adventofcode.com/2019/day/7
# heavily "inspired" by this guys implementation: https://github.com/20Koen02

# just intcode_electric_boogaloo but with some tweaks to make it ugly


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


# stupid name, it takes inputs
def put(tape, opPointer, opArgs, inp = None):
    if inp != None:
        tape[tape[opPointer + 1]] = int(inp)
    else:
        val = int(input(">> "))
        tape[tape[opPointer + 1]] = val

    opPointer += 2
    return tape, opPointer


# also stupid name, it returns program results
def look(tape, opPointer, opArgs):
    result = None
    if opArgs[0] == 1:
        result = tape[opPointer + 1]
    else:
        result = tape[tape[opPointer + 1]]

    print("out: " + str(result))
    opPointer += 2
    return tape, opPointer, result


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


# helper function to deal with the two types of addressing,
# it returns the things to be operated on
def getOperands(tape, opPointer, opArgs):
    operands = []
    for i in range(len(opArgs)):
        if opArgs[i] == 0:
            operands.append(tape[tape[opPointer + i + 1]]) # input at tape[address]
        elif opArgs[i] == 1:
            operands.append(tape[opPointer + i + 1]) # input is tape[address]
    return operands


def run(tape, opPointer, opCodes, phase, ampOut):
    inputSelector = 0
    result = 0
    while True:
        if tape[opPointer] == 99:
            break

        operation = [int(x) for x in str(tape[opPointer])]
        operation = [0] * (2 - len(operation)) + operation
        op = tape[opPointer]

        # get opArgs
        opArgs = [0, 0, 0]
        if len(operation) > 2:
            op = int(str(operation[-2]) + str(operation[-1])) # just the operation
            opArgs = operation.copy()
            del opArgs[-2:]
            opArgs.reverse()
            opArgs = opArgs + [0] * (2 - len(opArgs))

        # stupid way to do things really
        if op == 3:
            # select wether to input phase or the output of the prev amp
            if inputSelector == 0:
                tape, opPointer = opCodes.get(op)(tape, opPointer, opArgs, phase)
                inputSelector += 1
            elif inputSelector == 1:
                tape, opPointer = opCodes.get(op)(tape, opPointer, opArgs, ampOut)
                inputSelector = 0

        # outputs!!!!
        elif op == 4:
            tape, opPointer, result = opCodes.get(op)(tape, opPointer, opArgs)

        # normal stuff
        else:
            tape, opPointer = opCodes.get(op)(tape, opPointer, opArgs)

    return result


# amp task delegator
def runAmps(curTape, pointer, opCodes, phaseList):
    # cancer
    ampA = run(list.copy(curTape), pointer, opCodes, phaseList[0], 0)
    ampB = run(list.copy(curTape), pointer, opCodes, phaseList[1], ampA)
    ampC = run(list.copy(curTape), pointer, opCodes, phaseList[2], ampB)
    ampD = run(list.copy(curTape), pointer, opCodes, phaseList[3], ampC)
    ampE = run(list.copy(curTape), pointer, opCodes, phaseList[4], ampD)

    return ampE


# stolen epicly from: https://stackoverflow.com/a/17504022
def permute(xs, low=0):
    if low + 1 >= len(xs):
        yield xs
    else:
        for p in permute(xs, low + 1):
            yield p        
        for i in range(low + 1, len(xs)):        
            xs[low], xs[i] = xs[i], xs[low]
            for p in permute(xs, low + 1):
                yield p        
            xs[low], xs[i] = xs[i], xs[low]


def main():
    data = open("inputs/day7.txt", "r").readlines()
    tape = list(map(int, data[0].split(",")))
    opPointer = 0
    thrustList = []

    opCodes = {1: add, 2: mult, 3: put, 4: look, 5: jmpt, 6: jmpf, 7: lss, 8: eq}

    # generate all possible phase inputs
    for p in permute([0, 1, 2, 3, 4]):
        ampsOut = runAmps(tape, opPointer, opCodes, p)
        thrustList.append(ampsOut)

    print("max thruster sig:", max(thrustList))


if __name__ == "__main__":
    main()
