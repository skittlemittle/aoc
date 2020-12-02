# advent of code 2019 day 8: https://adventofcode.com/2019/day/8

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


# the actual problem, part one
def check_image(imgLayers, dimens=(25, 6)):
    # the layer with the least zeros
    parityLayer = np.zeros(dimens[0] * dimens[1], dtype=int)
    for layer in imgLayers:
        zeroCount = Counter(layer)[0]
        if zeroCount < Counter(parityLayer)[0]:
            parityLayer = layer

    return Counter(parityLayer)[1] * Counter(parityLayer)[2]


# part two
# for each pixel of the final image, look through all layers
# top to bottom and set the first valid pixel value to the pixel val
# in the final image
def draw_image(imgLayers, dimens=(25, 6)):
    finalImage = np.zeros(dimens[0] * dimens[1], dtype=int)
    image = ""
    # squash layers
    for pixel in range(dimens[0] * dimens[1]):
        for layer in imgLayers:
            if layer[pixel] == 1:
                finalImage[pixel] = 1
                break
            elif layer[pixel] == 0:
                finalImage[pixel] = 0
                break

    # draw the image
    for pixel in finalImage:
        if pixel == 1:
            image += "I"
        else:
            image += " "

    pos = 0
    while pos < len(image):
        print(image[pos : pos + dimens[0]])
        pos += dimens[0]


def main():
    data = open("inputs/day8.txt", "r").readlines()[0]
    imgLayers = parse_image(data)
    print("results: ", check_image(imgLayers))
    draw_image(imgLayers)


if __name__ == "__main__":
    main()
