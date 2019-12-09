package random

import java.io.File

fun main(args: Array<String>) {
    var directCount: Int = 0
    var indirectCount: Int = 0
    val orbitMap = mutableListOf<String>()
    var things = mutableListOf<String>()

    // count up all the lines in the file, thats the number of direct orbits
    File("inputs/day6.txt").forEachLine {
        orbitMap.add(it)
        var parts = it.split(")")
        things.add(parts[0])
        things.add(parts[1])
        directCount ++
    }

    // get all planets, bruh moment
    var planets = things.distinct()

    // count up all indirect orbits
    for (planet in planets) {
        var curPair = orbitMap.find { it.split(")")[1] == planet }
        println("curPair $curPair")
        var indOrbits: Int? = curPair?.let { countIndOrbits(it, 0, orbitMap) }
        println("orbits $indOrbits")
        if (indOrbits != null) indirectCount += indOrbits
    }

    println("indirect orbits $indirectCount")
    println("direct orbits $directCount")
    println("total orbit count ${indirectCount + directCount}")
}


// count up the how many things a given planet indirectly orbits, how many steps till COM
fun countIndOrbits(orbit: String, count: Int, orbitMap: List<String>): Int {
    var orbitPair = orbit.split(")")
    var steps = count
    println("pair, steps $orbitPair $steps")
    if (orbitPair[0] == "COM") {
        return steps
    } else {
        steps ++
        // epicly repeated code
        var nextOrbit = orbitMap.find { it.split(")")[1] == orbitPair[0] }
        if (nextOrbit != null) {
            return countIndOrbits(nextOrbit, steps, orbitMap)
        }
    }
    return steps
}