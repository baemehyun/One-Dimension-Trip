type Step = {
  position: number;
  visited: number[];
  energy: number;
};

function minEnergy(
  start: number,
  shops: number[],
  stations: number[],
  target: number
): number {
  const queue: Step[] = [];
  const visitedStates: string[] = [];

  //enqueue start
  queue.push({
    position: start,
    visited: [],
    energy: 0,
  });

  while (queue.length > 0) {
    const current = queue.shift()!;

    const visitedKey = current.visited
      .slice()
      .sort((a, b) => a - b)
      .join(",");
    const key = `${current.position}-${visitedKey}`;

    if (visitedStates.includes(key)) {
      continue;
    }
    visitedStates.push(key);

    const hasVisitedAllshops = shops.every((shop) =>
      current.visited.includes(shop)
    );
    if (current.position == target && hasVisitedAllshops) {
      return current.energy;
    }

    const direction = [-1, 1];

    for (let i = 0; i < direction.length; i++) {
      const next = current.position + direction[i];
      if (next < 0 || next > 1000) continue;

      const newVisited = current.visited.slice();
      if (shops.includes(next) && !newVisited.includes(next)) {
        newVisited.push(next);
      }

      queue.push({
        position: next,
        visited: newVisited,
        energy: current.energy + 1,
      });
    }

    if (stations.includes(current.position)) {
      for (let i = 0; i < stations.length; i++) {
        const dest = stations[i];
        if (dest === current.position) continue;

        const newVisited = current.visited.slice();
        if (shops.includes(dest) && !newVisited.includes(dest)) {
          newVisited.push(dest);
        }

        queue.push({
          position: dest,
          visited: newVisited,
          energy: current.energy, 
        });
      }
    }
  }
  return -1;
}

console.log(minEnergy(2, [4, 9], [3, 6, 8], 7));
