const distance = (p1, p2) => Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2));

const assign = (centroids, observations) => {
  const clusters = centroids.map(_ => []);

  for (const obs of observations) {
    let minindex = 0;
    let minval = Infinity;
  
    for (let i = 0; i < centroids.length; i++) {
      const curval = distance(obs, centroids[i]);
  
      if (curval < minval) {
        minval = curval;
        minindex = i;
      }
    }
    
    clusters[minindex].push(obs);
  }

  return clusters;
};

const update = (clusters) => {
  const updated = [];

  for (let i = 0; i < clusters.length; i++) {
    const cluster = clusters[i];
    let summX = 0;
    let summY = 0;
    const size = cluster.length;
  
    for (const obs of cluster) {
      summX += obs.x;
      summY += obs.y
    }
  
    updated[i] = { x: summX / size, y: summY / size };
  }

  return updated;
};

function* kMeans (centroids, observations, delta = .01) {
  let updated = centroids;
  let maxDelta = Infinity;

  do {
    const previous = updated;
    const clusters = assign(updated, observations);
    updated = update(clusters);
    maxDelta = Math.max(...updated.map((c, i) => distance(c, previous[i])));
    yield { centroids: updated, clusters };
  } while (maxDelta > delta)
}

module.exports = kMeans;