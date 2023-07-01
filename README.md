# PROJECT: Ease to the moving mouse

## Overview:

The left side of this page is a vertically scrolling canvas with a timeline that ranges from 2023/12 back to 2000/01.

The right side column has a top and center sections, which are reserved for future use. The right side footer shows canvas-relative locations of the "bullsEye" and the "focalPoint".

The "bullsEye" is positioned at the dead-center of the canvas and is repositioned as the window is resized.

The "focalPoint" starts tracking the mouse when it enters the canvas. It then moves to the bullsEye when the mouse leaves the canvas.


## Objective:

The focalPoint currently immediately tracks the tip of the default cursor. 

I want the focal point to ease towards the mouse.

Checkout this demo page:
http://www.java2s.com/example/javascript-book/ease-to-mouse.html

and its full-page animation:
http://www.java2s.com/example/javascript-book/ease-to-mouse-demo-6b2a9.htm

## Requirements:

1. The focalPoint must "ease" towards the mouse as it moves in the canvas area.

2. The focalPoint must ease to the bullsEye when the mouse leaves the canvas area.

3. This must be done without using the HTML5 canvas context. For example:

  let canvas = document.getElementById('canvas') 
  let context = canvas.getContext('2d')

4. Retain the current code styling
   
5. Make suggestions for coding improvements


