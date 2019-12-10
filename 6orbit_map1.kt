import java.io.File

// oh noooooo globals!!!
val orbitMap = mutableListOf<String>()
var planets = listOf<String>()

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
        println("curPair $curPair")
        var indOrbits: Int? = curPair?.let { countIndOrbits(it, 0, orbitMap) }
        println("orbits $indOrbits")
        if (indOrbits != null) indirectCount += indOrbits
    }

    println("indirect orbits $indirectCount")
    println("direct orbits $directCount")
    println("total orbit count ${indirectCount + directCount}")
}


// count the number of orbit transfers from you to santa
fun two() {
    
}


// count up how many steps it takes to go from a given planet to COM
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
