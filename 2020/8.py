ACCUMULATOR = 0


def acc(tape, op_pointer, args):
    global ACCUMULATOR
    ACCUMULATOR += int(args)
    op_pointer += 1
    return tape, op_pointer


def jmp(tape, op_pointer, args):
    op_pointer += int(args)
    return tape, op_pointer


def nop(tape, op_pointer, args):
    op_pointer += 1
    return tape, op_pointer


def main():
    data = list(map(lambda x: x.strip("\n"), open("./inputs/8.txt", "r").readlines()))
    op_codes = {"acc": acc, "jmp": jmp, "nop": nop}

    for i, ln in enumerate(data):
        if "acc" in ln:
            continue

        tape = data.copy()
        if "jmp" in ln:
            tape[i] = ln.replace("jmp", "nop")
        elif "nop" in ln:
            tape[i] = ln.replace("nop", "jmp")

        op_history = []
        op_pointer = 0
        global ACCUMULATOR
        ACCUMULATOR = 0

        while True:
            line = tape[op_pointer].split(" ")
            op = line[0]
            args = line[1]

            op_history.append(op_pointer)
            tape, op_pointer = op_codes.get(op)(tape, op_pointer, args)
            if op_pointer >= len(tape):
                print("reddit but epic ", ACCUMULATOR)
                break

            if op_pointer in op_history:
                # print("cringe")
                # print(ACCUMULATOR)
                break


if __name__ == "__main__":
    main()
