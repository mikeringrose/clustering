import kMeans from './k-means';
import util from './util';

const MAX_X = 800;
const MAX_Y = 600;
const COLORS = [ 'blue', 'red', 'gold', 'indigo', 'magenta', 'yellow', 'silver', 'aqua' ]

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const formEl = document.querySelector('form');
const runBtn = document.querySelector('#run-btn');
const numCentroidsEl = document.querySelector('#num-centroids');
const numObservationsEl = document.querySelector('#num-observations');

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

const updateFn = (gen) => {
  return () => {
    const { value, done } = gen.next();  

    if (!done) {
      const { centroids: updated, clusters } = value;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      render(ctx, updated, clusters);
      setTimeout(updateFn(gen), 200);
    } else {
      console.log('Done');
      runBtn.disabled = false;
    }
  };
};

formEl.onsubmit = function(event) {
  event.stopPropagation();

  runBtn.disabled = true;

  const observations = util.generateRandomObservations(Number(numObservationsEl.value), MAX_X, MAX_Y);
  const centroids = util.generateRandomCentroids(Number(numCentroidsEl.value), MAX_X, MAX_Y);
  const gen = kMeans(centroids, observations);

  render(ctx, centroids, [ observations ]);
  setTimeout(updateFn(gen), 200);

  return false;
}
