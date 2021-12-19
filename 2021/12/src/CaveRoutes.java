import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

public class CaveRoutes {
    CaveRoutes(CaveGraph graph, String source) {
        System.out.println(countPaths(graph, source, new Stack<>(), false));
        System.out.println(countPaths(graph, source, new Stack<>(), true));
    }

    private long countPaths(CaveGraph graph, String node, Stack<String> sequence, boolean canVisitSmallCaveAgain) {
        if (node.equals("end")) return 1;

        if (isSmall(node) && visited(node, sequence)) canVisitSmallCaveAgain = false;
        final boolean cvsca = canVisitSmallCaveAgain;

        ArrayList<String> neighbors = new ArrayList<>();
        for (String neighbor : graph.adjacentTo(node)) {
            if (!isSmall(neighbor) || !visited(neighbor, sequence) || (cvsca && !neighbor.equals("start")))
                neighbors.add(neighbor);
        }

        return neighbors.stream().map(n -> {
            Stack<String> epic_sequence = (Stack<String>) sequence.clone();
            epic_sequence.push(node);
            return countPaths(graph, n, epic_sequence, cvsca);
        }).reduce(0L, Long::sum);
    }

    private boolean isSmall(String s) {
        return s.matches("\\p{javaLowerCase}*");
    }

    private boolean visited(String node, Stack<String> sequence) {
        return sequence.contains(node);
    }

    public static void main(String[] args) throws FileNotFoundException {
        File f = new File("../inputs/12.txt");
        Scanner sc = new Scanner(f);
        ArrayList<String> input = new ArrayList<>();

        while (sc.hasNextLine()) {
            input.add(sc.nextLine());
        }
        sc.close();

        CaveGraph g = new CaveGraph(input);
        CaveRoutes r = new CaveRoutes(g, "start");
    }
}
