// advent of code 2019 day 6

import java.io.File

// oh noooooo globals!!!
val orbitMap = mutableListOf<String>()
var planets = listOf<String>()
var pathToCom = mutableListOf<String>()

fun main(args: Array<String>) {
    var things = mutableListOf<String>()

    // prep up the inputs
    File("inputs/day6.txt").forEachLine {
        orbitMap.add(it)
        var parts = it.split(")")
        things.add(parts[0])
        things.add(parts[1])
    }

    // get all planets, bruh moment
    planets = things.distinct()

    one()
    two()
}


fun one() {
    // count up direct orbits
    var directCount: Int = orbitMap.count()
    var indirectCount: Int = 0

    // count up all indirect orbits
    for (planet in planets) {
        var curPair = orbitMap.find { it.split(")")[1] == planet }
        // println("curPair $curPair")
        var indOrbits: Int? = curPair?.let { countIndOrbits(it, 0, orbitMap, false) }
        // println("orbits $indOrbits")
        if (indOrbits != null) indirectCount += indOrbits
    }

    println("indirect orbits $indirectCount")
    println("direct orbits $directCount")
    println("total orbit count ${indirectCount + directCount}")
}


// count the number of orbit transfers from you to santa
fun two() {
    var you = orbitMap.find { it.split(")")[1] == "YOU" }
    var santa = orbitMap.find { it.split(")")[1] == "SAN" }
    var youLen = 0
    var santaLen = 0

    // record both your routes to COM
    you?.let { countIndOrbits(it, 0, orbitMap, true) }
    var yourPath = pathToCom.toList()
    pathToCom.clear()

    santa?.let { countIndOrbits(it, 0, orbitMap, true) }
    var santasPath = pathToCom.toList()
    pathToCom.clear()


    // find the first common node between you and santa
    var commonNode: String? = ""
    for (pair in yourPath) {
        var node = pair.split(")")[0]
        commonNode = santasPath.find { it.split(")")[0] == node }
        // println("looking $node $commonNode")
        if (commonNode != null) break
    }

    if (commonNode != null) {
        commonNode = commonNode.split(")")[0] // the first part is the common
        // count the path distance from you and santa to the common node, respeccccctively
        for (jump in santasPath) {
            if (jump.split(")")[0] == commonNode) {
                santaLen = santasPath.slice(0..santasPath.indexOf(jump)).count() - 1
                break
            }
        }

        for (jump in yourPath) {
            if (jump.split(")")[0] == commonNode) { 
                youLen = yourPath.slice(0..yourPath.indexOf(jump)).count() - 1
                break
            }
        }
    }

    println("PART 2")
    println("youLen, santaLen $youLen $santaLen")
    println("orbital transfers between you and santa ${youLen + santaLen}")
}


// count up how many steps it takes to go from a given planet to COM
fun countIndOrbits(orbit: String, count: Int, orbitMap: List<String>, recordPath: Boolean): Int {
    var orbitPair = orbit.split(")")
    var steps = count
    // for part 2
    if (recordPath) pathToCom.add(orbit)
    // println("pair, steps, $orbitPair $steps")

    if (orbitPair[0] == "COM") {
        return steps
    } else {
        steps ++
        // epicly repeated code
        var nextOrbit = orbitMap.find { it.split(")")[1] == orbitPair[0] }
        if (nextOrbit != null) {
            return countIndOrbits(nextOrbit, steps, orbitMap, recordPath)
        }
    }
    return steps
}
