# advent of code 2019 day 8: https://adventofcode.com/2019/day/8
# part 1

import numpy as np
from collections import Counter

# take the raw data and return the image layers
def parse_image(rawImg, dimens=(25, 6)):
    layers = []
    layerReset = 1
    curLayer = np.zeros(dimens[0] * dimens[1], dtype=int)

    for val in rawImg:
        if layerReset <= dimens[0] * dimens[1]:
            curLayer[layerReset - 1] = val
            layerReset += 1

        # resetter
        if layerReset > dimens[0] * dimens[1]:
            layers.append(curLayer)
            layerReset = 1
            curLayer = np.zeros(dimens[0] * dimens[1], dtype=int)

    return layers


# the actual problem
def check_image(imgLayers, dimens=(25, 6)):
    parityLayer = np.zeros(dimens[0] * dimens[1], dtype=int)  # the layer with the least zeros

    for layer in imgLayers:
        zeroCount = Counter(layer)[0]
        if zeroCount < Counter(parityLayer)[0]:
            parityLayer = layer

    return Counter(parityLayer)[1] * Counter(parityLayer)[2]


def main():
    data = open("inputs/day8.txt", "r").readlines()[0]
    imgLayers = parse_image(data)
    print("results: ", check_image(imgLayers))


if __name__ == "__main__":
    main()
