const canvas = document.getElementById('main-canvas');
const context = canvas.getContext('2d');

const WIDTH = document.documentElement.clientWidth;
const HEIGHT = document.documentElement.clientHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const WIDTH_CENTER = WIDTH / 2;
const HEIGHT_CENTER = HEIGHT / 2;

const MAX_LENGTH = 600;

const SLOPE = Math.PI / 3;

function drawKoch(depth, pointA, pointB, angle, length) {
  if (depth === 0) {
    context.lineTo(pointB.x, pointB.y);
    return;
  }

  length = length / 3;
  const dx = length * Math.cos(angle);
  const dy = length * Math.sin(angle);

  const pointC = {
    x: pointA.x + dx,
    y: pointA.y + dy
  };

  const pointD = {
    x: pointC.x + length * Math.cos(angle - SLOPE),
    y: pointC.y + length * Math.sin(angle - SLOPE)
  };

  const pointE = {
    x: pointD.x + length * Math.cos(angle + SLOPE),
    y: pointD.y + length * Math.sin(angle + SLOPE)
  };

  const pointF = {
    x: pointE.x + dx,
    y: pointE.y + dy
  };

  drawKoch(
    depth - 1,
    pointA,
    pointC,
    angle,
    length
  );

  drawKoch(
    depth - 1,
    pointC,
    pointD,
    angle - SLOPE,
    length
  );

  drawKoch(
    depth - 1,
    pointD,
    pointE,
    angle + SLOPE,
    length
  );

  drawKoch(
    depth - 1,
    pointE,
    pointF,
    angle,
    length
  );
}

context.beginPath();

drawKoch(
  8,
  {
    x: WIDTH_CENTER - MAX_LENGTH / 2,
    y: HEIGHT_CENTER
  },
  {
    x: WIDTH_CENTER + MAX_LENGTH / 2,
    y: HEIGHT_CENTER
  },
  -SLOPE,
  MAX_LENGTH
);

context.stroke();

context.beginPath();

drawKoch(
  8,
  {
    x: WIDTH_CENTER,
    y: HEIGHT_CENTER - MAX_LENGTH * Math.sin(SLOPE)
  },
  {
    x: WIDTH_CENTER + MAX_LENGTH / 2,
    y: HEIGHT_CENTER
  },
  SLOPE,
  MAX_LENGTH
);

context.stroke();

context.beginPath();

drawKoch(
  8,
  {
    x: WIDTH_CENTER + MAX_LENGTH / 2,
    y: HEIGHT_CENTER
  },
  {
    x: WIDTH_CENTER + MAX_LENGTH / 2,
    y: HEIGHT_CENTER
  },
  SLOPE * 3,
  MAX_LENGTH
);

context.stroke();