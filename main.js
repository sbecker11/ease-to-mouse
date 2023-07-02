// @ts-nocheck
'use strict';

import * as timeline from './modules/timeline.js';
import * as focalPoint from './modules/focal_point.js';

// --------------------------------------
// Element reference globals

const debugFocalPointElement = document.getElementById('debugFocalPointElement');
const canvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('canvas');
const bottomGradient = document.getElementById('bottom-gradient');
const bullsEye = document.getElementById('bulls-eye');

var isMouseOverCanvasContainer = false;

// ----------------------------------------------
// ease the focalPoint to the point of entry

function handleMouseEnterCanvasContainer(event) {
  isMouseOverCanvasContainer = true;
  // focalPoint.easeFocalPointTo(event.clientX, event.clientY);
}

// ----------------------------------------------
// ease the focalPoint to the bullsEye when mouse leaves canvasContainer

function handleMouseLeaveCanvasContainer(event) {
  isMouseOverCanvasContainer = false;
  easeFocalPointToBullsEye();
}

// ----------------------------------------------
// move bullsEye to the canvasContainer-relative dead center

function centerBullsEye() {
  var left = Math.floor(canvasContainer.offsetWidth / 2 - bullsEye.offsetWidth / 2);
  var top = Math.floor(canvasContainer.offsetHeight / 2 - bullsEye.offsetHeight / 2);
  bullsEye.style.top = `${top}px`;
  bullsEye.style.left = `${left}px`;
}

// ----------------------------------------------
// returns the canvasContainer-relative location of the bullsEye

function getBullsEye() {
  var bullsEyeX = Math.floor(canvasContainer.offsetWidth / 2);
  var bullsEyeY = Math.floor(canvasContainer.offsetHeight / 2);
  return { bullsEyeX, bullsEyeY };
}

// ----------------------------------------------
// gradually move the focalPoint to the bullsEye

function easeFocalPointToBullsEye() {
  const { bullsEyeX, bullsEyeY } = getBullsEye();
  focalPointAim = { x: bullsEyeX, y: bullsEyeY };
  // focalPoint.easeFocalPointTo(bullsEyeX, bullsEyeY);
}

// for debugging
var mouseX;
var mouseY;

// ----------------------------------------------
// ease the focalPoint to the mouse location

function handlecanvasContainerMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  focalPointAim = { x: mouseX, y: mouseY };
  // focalPoint.easeFocalPointTo(mouseX, mouseY);
  debugFocalPoint();
}

// for tracking
var focalPointX;
var focalPointY;
var focalPointNowHighPrecision; // {x,y} in sub-pixel precision
var focalPointAim; // {x,y} of where we're aiming towards

// ----------------------------------------------
// this function will be called at each frame
// while the focalPoint is moving
function focalPointListener(x, y) {
  focalPointX = x;
  focalPointY = y;
  debugFocalPoint();
}

// ----------------------------------------------
// debug the positions of the bullsEye, focalPoint and mouse

function debugFocalPoint() {
  var html = '';
  var { bullsEyeX, bullsEyeY } = getBullsEye();
  html += `bullsEye:[${bullsEyeX},${bullsEyeY}]<br/>`;
  html += `focalPoint:[${focalPointX},${focalPointY}]<br/>`;
  if (mouseX && mouseY) html += `mouse:[${mouseX},${mouseY}]<br/>`;
  debugFocalPointElement.innerHTML = html;
}

// ----------------------------------------------
// on window load

function handleWindowLoad() {
  const timeline_container = document.getElementById('timeline-containr');
  const focal_point = document.getElementById('focal-point');
  const DEFAULT_TIMELINE_YEAR = 2022;
  const EASING = 0.05;
  const EPSILON = EASING / 2.0;

  timeline.createTimeline(timeline_container, canvasContainer, DEFAULT_TIMELINE_YEAR);
  positionGradients();
  centerBullsEye();
  focalPoint.createFocalPoint(canvasContainer, focal_point, focalPointListener);
  const { fpX, fpY } = focalPoint.getFocalPoint();
  focalPointNowHighPrecision = { x: fpX, y: fpY };
  easeFocalPointToBullsEye();

  // set up easing animation
  (function drawFrame() {
    window.requestAnimationFrame(drawFrame);

    const { fpX, fpY } = focalPoint.getFocalPoint();

    // exit early if we're at the destination already
    if (fpX === focalPointAim.x && fpY === focalPointAim.y) {
      return;
    }

    let vx = (focalPointAim.x - fpX) * EASING;
    let vy = (focalPointAim.y - fpY) * EASING;

    // for very small values of vx and vy, move there directly
    if (Math.abs(vx) < EPSILON && Math.abs(vy) < EPSILON) {
      vx = focalPointAim.x - fpX;
      vy = focalPointAim.y - fpY;
    }

    focalPointNowHighPrecision.x += vx;
    focalPointNowHighPrecision.y += vy;

    focalPoint.moveFocalPointTo(
      Math.round(focalPointNowHighPrecision.x),
      Math.round(focalPointNowHighPrecision.y)
    );
  })();
}

// ----------------------------------------------
// on window resize

// resize the canvas-container and the canvas
// since they don't do it themselves?
function handleWindowResize() {
  var windowWidth = window.innerWidth;
  var canvasContainerWidth = windowWidth / 2;
  canvasContainer.style.width = canvasContainerWidth + 'px';
  canvas.style.width = canvasContainerWidth + 'px';
  positionGradients();
  centerBullsEye();
}

//---------------------------------------------------------
// gradient div management

// reposition the blue-to-black and black-to-blue
// gradient div at canvas top and bottom
function positionGradients() {
  const canvasHeight = canvas.scrollHeight;
  const bottomGradientHeight = bottomGradient.offsetHeight;
  bottomGradient.style.top = `${canvasHeight - bottomGradientHeight}px`;
}

//---------------------------------------------------------
// canvasContainer eventListener management functons

var canvasContainerEventListeners = [];

function addcanvasContainerEventListener(eventType, listener, options) {
  canvasContainerEventListeners.push({ eventType, listener, options });
  canvasContainer.addEventListener(eventType, listener, options);
}

function removecanvasContainerEventListeners() {
  for (let i = 0; i < canvasContainerEventListeners.length; i++) {
    let listener = canvasContainerEventListeners[i];
    if (listener.options != null)
      canvasContainer.removeEventListener(
        listener.eventType,
        listener.listener,
        listener.options
      );
    else canvasContainer.removeEventListener(listener.eventType, listener.listener);
  }
}

function restorecanvasContainerEventListeners() {
  for (let i = 0; i < canvasContainerEventListeners.length; i++) {
    let listener = canvasContainerEventListeners[i];
    if (listener.options != null)
      canvasContainer.addEventListener(
        listener.eventType,
        listener.listener,
        listener.options
      );
    else canvasContainer.addEventListener(listener.eventType, listener.listener);
  }
}

// Attach the event listeners

window.addEventListener('load', handleWindowLoad);

window.addEventListener('resize', handleWindowResize);

addcanvasContainerEventListener('mousemove', handlecanvasContainerMouseMove);

addcanvasContainerEventListener('load', handlecanvasContainerMouseMove);

addcanvasContainerEventListener('mouseenter', handleMouseEnterCanvasContainer);

addcanvasContainerEventListener('mouseleave', handleMouseLeaveCanvasContainer);
