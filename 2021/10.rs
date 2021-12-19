use std::fs;

fn points(c: char) -> u32 {
    if c == ')' {
        3
    } else if c == ']' {
        57
    } else if c == '}' {
        1197
    } else if c == '>' {
        25137
    } else {
        0
    }
}

// pls dont laugh
fn one(input: String) -> u32 {
    let legal = ["()", "{}", "<>", "[]"];
    let enders = [')', '}', ']', '>'];

    let mut score = 0;
    let mut stack: Vec<char> = vec![]; // brudda_stack
    let lines = input.lines();
    for line in lines {
        for c in line.chars() {
            stack.push(c);
            let len = stack.len();
            if len >= 2 {
                let a = stack[len - 2];
                let b = stack[len - 1];
                if legal.contains(&format!("{}{}", a, b).as_str()) {
                    stack.pop();
                    stack.pop();
                } else if enders.contains(&b) && !enders.contains(&a) {
                    if !legal.contains(&format!("{}{}", a, b).as_str()) {
                        score += points(b);
                    }
                }
            }
        }
    }
    score
}

fn two(input: String) {}

fn main() {
    let input = fs::read_to_string("./inputs/10.txt").expect("cock.");
    println!("{}", one(input));
}
