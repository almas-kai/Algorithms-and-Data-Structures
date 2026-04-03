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

function drawKoch(depth, pointA, pointB) {
  if (depth === 0) {
    context.beginPath();
    context.moveTo(pointA.x, pointA.y);
    context.lineTo(pointB.x, pointB.y);
    context.stroke();

    return;
  }

  const angle = Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x);
  const length = Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));

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
    pointC
  );

  drawKoch(
    depth - 1,
    pointC,
    pointD
  );

  drawKoch(
    depth - 1,
    pointD,
    pointE
  );

  drawKoch(
    depth - 1,
    pointE,
    pointF
  );
}

drawKoch(
  6,
  {
    x: WIDTH_CENTER - MAX_LENGTH / 2,
    y: HEIGHT_CENTER
  },
  {
    x: WIDTH_CENTER + MAX_LENGTH / 2,
    y: HEIGHT_CENTER
  }
);