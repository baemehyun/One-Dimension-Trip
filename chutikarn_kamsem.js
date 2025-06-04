function minEnergy(start, shops, stations, target) {
    var queue = [];
    var visitedStates = [];
    //enqueue start
    queue.push({
        position: start,
        visited: [],
        energy: 0,
    });
    var _loop_1 = function () {
        var current = queue.shift();
        var visitedKey = current.visited
            .slice()
            .sort(function (a, b) { return a - b; })
            .join(",");
        var key = "".concat(current.position, "-").concat(visitedKey);
        if (visitedStates.includes(key)) {
            return "continue";
        }
        visitedStates.push(key);
        var hasVisitedAllshops = shops.every(function (shop) {
            return current.visited.includes(shop);
        });
        if (current.position == target && hasVisitedAllshops) {
            return { value: current.energy };
        }
        var direction = [-1, 1];
        for (var i = 0; i < direction.length; i++) {
            var next = current.position + direction[i];
            if (next < 0 || next > 1000)
                continue;
            var newVisited = current.visited.slice();
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
            for (var i = 0; i < stations.length; i++) {
                var dest = stations[i];
                if (dest === current.position)
                    continue;
                var newVisited = current.visited.slice();
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
    };
    while (queue.length > 0) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return -1;
}
console.log(minEnergy(2, [4, 9], [3, 6, 8], 7));
