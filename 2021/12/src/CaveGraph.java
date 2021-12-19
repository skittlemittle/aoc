import java.util.ArrayList;
import java.util.HashMap;

public class CaveGraph {
    private final HashMap<String, ArrayList<String>> adj;

    CaveGraph(ArrayList<String> edges) {
        adj = new HashMap<>();
        for (String e : edges) {
            String[] gaming = e.split("-");
            adj.computeIfAbsent(gaming[0], k -> new ArrayList<>());
            adj.computeIfAbsent(gaming[1], k -> new ArrayList<>());

            adj.get(gaming[0]).add(gaming[1]);
            adj.get(gaming[1]).add(gaming[0]);
        }
    }

    public Iterable<String> adjacentTo(String v) {
        if (adj.get(v) == null) return new ArrayList<>();
        return adj.get(v);
    }
}
