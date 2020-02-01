import kMeans from './k-means';
import util from './util';

const NUM_CENTROIDS = 8;
const NUM_OBS = 1000;
const MAX_X = 800;
const MAX_Y = 600;
const COLORS = [ 'blue', 'red', 'gold', 'indigo', 'magenta', 'yellow', 'silver', 'aqua' ]

const observations = util.generateRandomObservations(NUM_OBS, MAX_X, MAX_Y);
const centroids = util.generateRandomCentroids(NUM_CENTROIDS, MAX_X, MAX_Y);
const gen = kMeans(centroids, observations);

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const render = (ctx, centroids, clusters) => {
  

  for (let i = 0; i < clusters.length; i++) {
    const cluster = clusters[i];

    ctx.fillStyle = COLORS[i];

    for (const obs of cluster) {
      ctx.fillRect(obs.x, obs.y, 5, 5);
    }
  }

  ctx.fillStyle = 'green';
  
  for (const centroid of centroids) {
    ctx.fillRect(centroid.x, centroid.y, 10, 10);
  }
}

const updateFn = () => {
  const { value, done } = gen.next();  

  if (!done) {
    const { centroids: updated, clusters } = value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    render(ctx, updated, clusters);
    setTimeout(updateFn, 200);
  } else {
    console.log('Done');
  }
};

render(ctx, centroids, [ observations ]);

setTimeout(updateFn, 200);
