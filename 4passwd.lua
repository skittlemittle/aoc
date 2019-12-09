
-- You arrive at the Venus fuel depot only to discover it's protected by a password. The Elves had written the password on a sticky note, but someone threw it out.

-- However, they do remember a few key facts about the password:

--     It is a six-digit number.
--     The value is within the range given in your puzzle input.
--     Two adjacent digits are the same (like 22 in 122345).
--     Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
--     the two adjacent matching digits are not part of a larger group of matching digits.


-- Other than the range rule, the following are true:

--     111111 meets these criteria (double 11, never decreases).
--     223450 does not meet these criteria (decreasing pair of digits 50).
--     123789 does not meet these criteria (no double).

-- How many different passwords within the range given in your puzzle input meet these criteria?


number = {271973, 785961}
-- number = {0, 1000}
passed = {} -- keep all valid passwords
valid = 0 -- when this hits two the entry is valid


for entry = number[1], number[2] do
    entry = tostring(entry)

    -- find the doubles, and only doubles, this is shit and does not work
    for i = 0, 9 do
        dig = tostring(i)
        double = dig .. dig
        exclude = "[^" .. dig .. "]"
        -- a:gsub("[^5]", "a"):match("[%D-]%d%d[%D-]")
        entryMask = entry:gsub(exclude, "a")
    end


    -- find sequences that increase or stay the same, this works
    entrytable = {}
    checktable = {}
    for idx = 1, #entry do
        a = entry:sub(idx, idx)
        entrytable[#entrytable + 1] = a
        checktable[#checktable + 1] = a
    end

    -- split, sort then compare if they stay then same we good
    table.sort(entrytable)
    match = 0
    for i = 1, #checktable do
        if entrytable[i] == checktable[i] then
            match = match + 1
        end
    end

    if match >= 5 then
        valid = valid + 1
    end

    if valid == 2 then
        print("p", entry)
        passed[#passed + 1] = entry
    end
    valid = 0
end

-- finally spit out the result
print(#passed)