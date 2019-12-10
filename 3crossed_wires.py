#  this shit works for the first part only
# COORDINATE SYSTEM IS: (x, y), right is +x left is -x

# manhattan distance: x1 - x2 + y1 - y2
# map the wires out, find all intersects, then find distances of all intersects from the center 0,0
# then just spit out the coords to the intersect with the smallest distance to 0,0


# get coordinates of line head after a instruction given init pos
def move(instruction, initPos):
    direction = instruction[0]
    length = int(instruction[1:])

    if direction == "U":
        return (initPos[0], initPos[1] + length)
    elif direction == "D":
        return (initPos[0], initPos[1] - length)
    elif direction == "L":
        return (initPos[0] - length, initPos[1])
    elif direction == "R":
        return (initPos[0] + length, initPos[1])


# map wires by following instructions and appending coords that you land on each step
def map_wire(wire):
    coords = []
    pos = (0, 0)
    # move then remeber the currnt position
    for i in wire:
        pos = move(i, pos)
        coords.append(pos)

    # print(coords)
    return coords


# make a list of tuples each tuple has the coords for two points in a line
def generate_lines(posList):
    line = []
    for i, val in enumerate(posList):
        if i < len(posList) - 1:
            line.append([val, posList[i + 1]])

    return line


# stolen off https://stackoverflow.com/a/19550879, ive not idea how tf it works
# uses maths from https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line
def find_intersection(p0, p1, p2, p3):

    s10_x = p1[0] - p0[0]
    s10_y = p1[1] - p0[1]
    s32_x = p3[0] - p2[0]
    s32_y = p3[1] - p2[1]

    denom = s10_x * s32_y - s32_x * s10_y

    if denom == 0:
        return None  # collinear

    denom_is_positive = denom > 0

    s02_x = p0[0] - p2[0]
    s02_y = p0[1] - p2[1]

    s_numer = s10_x * s02_y - s10_y * s02_x

    if (s_numer < 0) == denom_is_positive:
        return None  # no collision

    t_numer = s32_x * s02_y - s32_y * s02_x

    if (t_numer < 0) == denom_is_positive:
        return None  # no collision

    if (s_numer > denom) == denom_is_positive or (t_numer > denom) == denom_is_positive:
        return None  # no collision

    # collision detected
    t = t_numer / denom
    return [p0[0] + (t * s10_x), p0[1] + (t * s10_y)]


def main():
    home = [0, 0]

    data = open('inputs/day3.txt', 'r').readlines()
    wireOne = data[0].strip().split(',')
    wireTwo = data[1].strip().split(',')
    wireOneCoords = map_wire(wireOne)
    wireTwoCoords = map_wire(wireTwo)

    wireOneLines = generate_lines(wireOneCoords)
    wireTwoLines = generate_lines(wireTwoCoords)

    # get a lits of all the places the wires cross
    crosses = []
    for i in wireOneLines:
        for j in wireTwoLines:
            intersect = find_intersection(i[0], i[1], j[0], j[1])
            if intersect:
                crosses.append(intersect)

    # find the one closest to (0, 0)
    distances = []
    for i in crosses:
        distance = abs(i[0] - home[0]) + abs(i[1] - home[1])
        distances.append(abs(distance))

    print(min(distances))



if __name__ == "__main__":
    main()
