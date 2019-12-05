# calculate the fuel needed for a bunch of mudules using the rocket equation:
# mass / 3 (round down) - 2
import math


def one(input):
    result = 0
    output = []
    for i, val in enumerate(input):
        output.append(math.floor(input[i] / 3))
        output[i] -= 2
        result += output[i]

    print(result)

def two(input):
    # now add the fuel needed for the module to the module mass and calc the new fuel req
    # keep going till you hit 0 fuel req the dividing will ensure that
    totalFuel = 0
    output = []

    for i, val in enumerate(input):
        totalFuel = math.floor(input[i] / 3) - 2 # get init fuel req
        # then get the fuel req for the fuel req for the fuel req ...
        currentFuel = totalFuel
        while currentFuel > 0:
            currentFuel = math.floor(currentFuel / 3) - 2
            if currentFuel > 0:
                totalFuel += currentFuel

        output.append(totalFuel)

    print(output)
    print("lmao")
    print(sum(output))

if __name__ == "__main__":
    input = []
    data = open('inputs/day1.txt', 'r').readlines()
    for i in data:
        val = (i.strip().split('\n'))
        input.append(int(val[0]))

    one(input)
    two(input)