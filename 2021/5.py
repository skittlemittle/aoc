def make_grid_one(lines):
    """takes a list of lines and makes the grid of smoke column thing whatevers"""
    size = max(max(x) if isinstance(x, list) else x for x in lines) + 1
    grid = [[0 for i in range(size)] for j in range(size)]

    for line in lines:
        # horizontal
        if line[0] == line[2]:
            y = line[0]
            end_points = [line[1], line[3]]
            end_points.sort()
            grid[y] = [
                it + 1 if i in range(end_points[0], end_points[1] + 1) else it
                for i, it in enumerate(grid[y])
            ]
        # vertical
        else:
            x = line[1]
            end_points = [line[0], line[2]]
            end_points.sort()
            for i, row in enumerate(grid):
                if i in range(end_points[0], end_points[1] + 1):
                    grid[i][x] += 1

    return grid


def make_grid_two(lines, grid):
    for line in lines:
        sX = line[0]
        sY = line[1]
        eX = line[2]
        eY = line[3]

        dx = eX - sX
        dy = eY - sY
        length = int(abs(dx)) if dx else int(abs(dy))
        dirX = -1 if dx < 0 else 1
        dirY = -1 if dy < 0 else 1

        for i in range(length + 1):
            x = sX + dirX * i
            y = sY + dirY * i
            grid[x][y] += 1

    return grid


def count_overlaps(grid):
    c = 0
    for row in grid:
        for col in row:
            if col > 1:
                c += 1
    return c


def main():
    data = list(
        map(
            lambda l: list(
                map(lambda x: int(x), l.rstrip().replace(" -> ", ",").split(","))
            ),
            open("inputs/5.txt", "r").readlines(),
        )
    )
    # get rid of slanty lines
    data_one = list(filter(lambda l: l[0] == l[2] or l[1] == l[3], data))
    data_two = list(filter(lambda l: not (l[0] == l[2] or l[1] == l[3]), data))

    grid = make_grid_one(data_one)
    print(count_overlaps(grid))
    grid = make_grid_two(data_two, grid)
    print(count_overlaps(grid))


if __name__ == "__main__":
    main()
