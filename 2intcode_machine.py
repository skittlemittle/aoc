# Aight we gon "emulate" a chip that has 3 instructions:
# 1: add
# 2: multiply
# 99: stop
# the add and multiply take 3 inputs adress 1(victim one) adress 2(victim 2) and adress 3(the place to store result)
# these args are just the next three things after the instruction
#  so [1, 1, 2, 0, 99] will add(1) the things at 30 and 20 then store that at 0, then stop
# the output then is: [3, 1, 2, 0, 99] yes this thing overwrites itself

# accepts an array of 4 elements and runs it following the rules listed above
# workArr = [opcode, a1, a2, a3]
# write result to writeArr
def run_line(workArr, writeArr):
    if workArr[0] == 1:
        # add
        a1 = workArr[1]
        a2 = workArr[2]
        a3 = workArr[3]
        writeArr[a3] = writeArr[a1] + writeArr[a2]
    elif workArr[0] == 2:
        # multiply
        a1 = workArr[1]
        a2 = workArr[2]
        a3 = workArr[3]
        writeArr[a3] = writeArr[a1] * writeArr[a2]
    elif workArr[0] == 99:
        # end
        return ["stop"]
    else:
        # print("HOLY SHIT: illegal opcode")
        return ["error"]

    return writeArr

# the inputs "noun" and "verb" are input[1] and input[2] and the "result" is input[0]
# noun and verb can be anything from 0 to 99 inclusive.
# find the noun and verb that produces the result: 19690720
# what then is 100 * noun + verb
if __name__ == "__main__":

    data = open('inputs/day2.txt', 'r').readlines()
    problem = data[0].strip().split(',')
    for i, val in enumerate(problem):
        problem[i] = int(problem[i])

    solved = False

    for noun in range(0, 100):
        if solved:
            break
        for verb in range(0, 100):
            # insert inputs
            input = list.copy(problem)
            input[1] = noun
            input[2] = verb
            # print(noun, verb)
            for i, val in enumerate(input):
                # make the chunks of instructions that'll be fed to run_line() and send them to it
                if i % 4 == 0 and input[i + 1]:
                    curLine = []

                    curLine.append(val)
                    curLine.append(input[i + 1])
                    curLine.append(input[i + 2])
                    curLine.append(input[i + 3])

                    # print("running " + str(curLine))
                    out = run_line(curLine, input)

                    if out[0] == 19690720:
                        print("INPUTS " + str(100 * noun + verb))
                        print("RESULT " + str(input[0]))
                        solved = True
                    elif out[0] == "error":
                        break
                    elif out[0] == "stop":
                        break
                    
