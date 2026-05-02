'use strict';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const WIDTH = document.documentElement.clientWidth;
const HEIGHT = document.documentElement.clientHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const WIDTH_CENTER = WIDTH / 2;
const HEIGHT_CENTER = HEIGHT / 2;

const MAX_LENGTH = 800;

const SLOPE = Math.PI / 3;

function drawKoch(depth, pointA, pointB, angle, length) {
  if (depth === 0) {
    context.lineTo(pointB.x, pointB.y);
    return;
  }

  const pointC = {
    x: pointA.x + length / 3 * Math.cos(angle),
    y: pointA.y + length / 3 * Math.sin(angle)
  };

  const pointD = {
    x: pointC.x + length / 3 * Math.cos(angle - SLOPE),
    y: pointC.y + length / 3 * Math.sin(angle - SLOPE)
  };

  const pointE = {
    x: pointD.x + length / 3 * Math.cos(angle + SLOPE),
    y: pointD.y + length / 3 * Math.sin(angle + SLOPE)
  };

  const pointF = {
    x: pointE.x + length / 3 * Math.cos(angle),
    y: pointE.y + length / 3 * Math.sin(angle)
  };

  drawKoch(
    depth - 1,
    pointA,
    pointC,
    angle,
    length / 3
  );

  drawKoch(
    depth - 1,
    pointC,
    pointD,
    angle - SLOPE,
    length / 3
  );

  drawKoch(
    depth - 1,
    pointD,
    pointE,
    angle + SLOPE,
    length / 3
  );

  drawKoch(
    depth - 1,
    pointE,
    pointF,
    angle,
    length / 3
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
  0,
  800
);

context.stroke();