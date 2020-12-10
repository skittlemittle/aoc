# here we goooooooooo
# lmao 50 lines
import re


def one(inputs):
    cnt = 0
    for i in inputs:
        if len(re.findall(i["r"], i["p"])) in range(i["n"][0], i["n"][1] + 1):
            cnt += 1

    return cnt


def two(inputs):
    cnt = 0
    for i in inputs:
        r = i["r"]
        passwd = i["p"]
        n1 = i["n"][0]
        n2 = i["n"][1]
        # lmao
        first = passwd[n1 - 1] if len(passwd) >= n1 else None
        second = passwd[n2 - 1] if len(passwd) >= n2 else None

        if (first == r or second == r) and not (first == r and second == r):
            cnt += 1

    return cnt


def main():
    inputs = []

    with open("./inputs/2.txt", "r") as f:
        data = f.readlines()
        for i in data:
            d_n = re.search(r"\d+-\d+", i)
            d_r = re.search(r"[a-z]:", i)
            d_p = re.search(r" [a-z]+[^:]", i)

            numbers = [int(x) for x in i[d_n.start() : d_n.end()].split("-")]
            r_char = i[d_r.start() : d_r.end()].strip(":")
            passwd = i[d_p.start() : d_p.end()].strip()

            inputs.append({"n": numbers, "r": r_char, "p": passwd})

    print(one(inputs))
    print(two(inputs))


if __name__ == "__main__":
    main()
