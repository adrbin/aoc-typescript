import { runPuzzles } from '../../utils.js';

function part1(input: string[]) {
  const graph = buildGraph(input);
  const count = countPaths(graph);
  return count;
}

function part2(input: string[]) {
  const graph = buildGraph(input);
  const count = countPaths(graph, true);
  return count;
}

function buildGraph(input: string[]) {
  const graph = new Map<string, string[]>();
  for (const line of input) {
    const [name1, name2] = line.split('-');

    const node1 = graph.get(name1) ?? [];
    if (!node1.includes(name2)) {
      node1.push(name2);
      graph.set(name1, node1);
    }

    const node2 = graph.get(name2) ?? [];
    if (!node2.includes(name1)) {
      node2.push(name1);
      graph.set(name2, node2);
    }
  }

  return graph;
}

function countPaths(
  graph: Map<string, string[]>,
  considerDoubleSmallCave = false,
) {
  let count = 0;
  function traverseGraph(visited: string[], hasDoubleSmallCave = false) {
    const current = visited.at(-1)!;
    if (current === 'end') {
      count++;
      return;
    }

    graph
      .get(current)
      ?.filter(
        nextNode =>
          nextNode === nextNode.toUpperCase() ||
          !visited.includes(nextNode) ||
          (considerDoubleSmallCave &&
            nextNode !== 'start' &&
            !hasDoubleSmallCave),
      )
      .forEach(nextNode =>
        traverseGraph(
          [...visited, nextNode],
          hasDoubleSmallCave ||
            (nextNode === nextNode.toLowerCase() && visited.includes(nextNode)),
        ),
      );
  }

  traverseGraph(['start']);

  return count;
}

runPuzzles(part1, part2, 2021, 12);
