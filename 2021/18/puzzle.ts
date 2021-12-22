import { runPuzzles } from '../../utils.js';

interface Tree {
  value?: number;
  parent?: Tree;
  leftChild?: Tree;
  rightChild?: Tree;
}

function part1(input: string[]) {
  let resultTree = input
    .map(line => {
      const json = JSON.parse(line);
      return parseToTree(json);
    })
    .reduce((acc, cur) => {
      const newTree: Tree = {
        leftChild: acc,
        rightChild: cur,
      };
      acc.parent = newTree;
      cur.parent = newTree;
      return reduceTree(newTree);
    });

  const magnitude = countMagnitude(resultTree);

  return magnitude;
}

function parseToTree(json: any, parent?: Tree): Tree {
  if (typeof json === 'number') {
    return {
      value: json,
      parent: parent,
    };
  }

  const tree: Tree = {
    parent: parent,
  };

  tree.leftChild = parseToTree(json[0], tree);
  tree.rightChild = parseToTree(json[1], tree);

  return tree;
}

function reduceTree(tree: Tree) {
  while (true) {
    if (applyExplode(tree)) {
      continue;
    }

    if (applySplit(tree)) {
      continue;
    }

    break;
  }

  return tree;
}

function applyExplode(tree: Tree) {
  let searchedNode: Tree | undefined = undefined;
  function searchForExplode(node: Tree, depth = 0) {
    if (!node || searchedNode) {
      return;
    }

    if (
      depth >= 4 &&
      node.leftChild?.value !== undefined &&
      node.rightChild?.value !== undefined
    ) {
      searchedNode = node;
      return;
    }

    if (node.leftChild) {
      searchForExplode(node.leftChild, depth + 1);
    }

    if (node.rightChild) {
      searchForExplode(node.rightChild, depth + 1);
    }
  }

  searchForExplode(tree);

  if (!searchedNode) {
    return false;
  }

  searchedNode = searchedNode as Tree;

  applyLeftExplode(searchedNode);
  applyRightExplode(searchedNode);
  searchedNode.leftChild = undefined;
  searchedNode.rightChild = undefined;
  searchedNode.value = 0;

  return true;
}

function applyLeftExplode(tree: Tree) {
  let node = tree.parent!;
  let prevNode = tree;
  while (node.parent && (node.leftChild === prevNode || !node.leftChild)) {
    prevNode = node;
    node = node.parent;
  }

  if (!node.leftChild || node.leftChild === prevNode) {
    return;
  }

  node = node.leftChild;

  while (node.rightChild) {
    node = node.rightChild;
  }

  node.value = node.value! + tree.leftChild!.value!;
}

function applyRightExplode(tree: Tree) {
  let node = tree.parent!;
  let prevNode = tree;
  while (node.parent && (node.rightChild === prevNode || !node.rightChild)) {
    prevNode = node;
    node = node.parent;
  }

  if (!node.rightChild || node.rightChild === prevNode) {
    return;
  }

  node = node.rightChild;

  while (node.leftChild) {
    node = node.leftChild;
  }

  node.value = node.value! + tree.rightChild!.value!;
}

function applySplit(tree: Tree) {
  let searchedNode: Tree | undefined = undefined;
  function searchForSplit(node: Tree) {
    if (!node || searchedNode) {
      return;
    }

    if (node.value !== undefined && node.value >= 10) {
      searchedNode = node;
      return;
    }

    if (node.leftChild) {
      searchForSplit(node.leftChild);
    }

    if (node.rightChild) {
      searchForSplit(node.rightChild);
    }
  }

  searchForSplit(tree);

  if (!searchedNode) {
    return false;
  }

  searchedNode = searchedNode as Tree;

  searchedNode.leftChild = {
    value: Math.floor(searchedNode.value! / 2),
    parent: searchedNode,
  };

  searchedNode.rightChild = {
    value: Math.ceil(searchedNode.value! / 2),
    parent: searchedNode,
  };

  searchedNode.value = undefined;

  return true;
}

function countMagnitude(tree: Tree): number {
  if (tree.value !== undefined) {
    return tree.value;
  }

  return (
    3 * countMagnitude(tree.leftChild!) + 2 * countMagnitude(tree.rightChild!)
  );
}

function part2(input: string[]) {
  const jsons = input.map(line => JSON.parse(line));

  let maxMagnitude = 0;
  for (const json1 of jsons) {
    for (const json2 of jsons) {
      if (json1 === json2) {
        continue;
      }

      const tree1 = parseToTree(json1);
      const tree2 = parseToTree(json2);
      const newTree: Tree = {
        leftChild: tree1,
        rightChild: tree2,
      };
      tree1.parent = newTree;
      tree2.parent = newTree;
      const reducedTree = reduceTree(newTree);
      const magnitude = countMagnitude(reducedTree);

      if (magnitude > maxMagnitude) {
        maxMagnitude = magnitude;
      }
    }
  }

  return maxMagnitude;
}

runPuzzles(part1, part2, 2021, 18);
