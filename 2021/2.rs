use std::fs;

fn one(input: String) {
    let mut horizontal = 0;
    let mut depth = 0;
    let commands = input.lines();
    for l in commands {
        let command: Vec<&str> = l.split_whitespace().collect();
        println!("{:?}", command);
        match command[0] {
            "forward" => {
                horizontal += command[1].parse::<u32>().unwrap();
            }
            "down" => {
                depth += command[1].parse::<u32>().unwrap();
            }
            "up" => {
                depth -= command[1].parse::<u32>().unwrap();
            }
            &_ => {}
        }
    }
    println!("h:{} d:{}", horizontal, depth);
}

fn two(input: String) {
    let mut horizontal = 0;
    let mut depth = 0;
    let mut aim = 0;
    let commands = input.lines();
    for l in commands {
        let command: Vec<&str> = l.split_whitespace().collect();
        match command[0] {
            "forward" => {
                let amt = command[1].parse::<u32>().unwrap();
                horizontal += amt;
                depth += aim * amt;
            }
            "down" => {
                aim += command[1].parse::<u32>().unwrap();
            }
            "up" => {
                aim -= command[1].parse::<u32>().unwrap();
            }
            &_ => {}
        }
    }
    println!("h:{} d:{}", horizontal, depth);
}

fn main() {
    let input = fs::read_to_string("./inputs/2.txt").expect("cock.");
    //one(input);
    two(input);
}
