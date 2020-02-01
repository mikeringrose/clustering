const random = (min, max) => Math.floor(Math.random() * max) + min;

const generateRandomObservations = (num , maxX, maxY) => {
  const observations = [];

  for (let i = 0; i < num; i++) {
    const x = random(0, maxX);
    const y = random(0, maxY);
    observations.push({ x, y });
  }

  return observations;
};

const generateRandomCentroids = (num, maxX, maxY) => {
  const centroids = [];

  for (let i = 0; i < num; i++) {
    const x = random(0, maxX);
    const y = random(0, maxY);
    centroids.push({ x, y });
  }

  return centroids;
};

export default {
  generateRandomCentroids,
  generateRandomObservations
};
