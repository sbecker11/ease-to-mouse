# PROJECT: Ease to the moving mouse

<img src="https://shawn.beckerstudio.com/wp-content/uploads/2023/07/ease-to-mouse-1.0.png" width="33%" height="33%"/>

## Overview:

The left side of this page is a vertically scrolling canvas with a timeline that ranges from 2023/12 back to 2000/01.

The right side column has a top and center sections, which are reserved for future use. The right side footer shows canvas-relative locations of the "bullsEye", the "focalPoint", and "mouse".

The "bullsEye" is positioned at the dead-center of the canvas and is repositioned as the window is resized.

The "focalPoint" starts tracking the mouse when it enters the canvas. It then moves to the bullsEye when the mouse leaves the canvas.

## Installation

This repo uses ES6 modules. The following vscode extensions
make it possible to do local javascript development.

```
    JavaScript (ES6) code snippets v1.8.0 by charalampos karypidis  
    Code snippets for JavaScript in ES6 syntax  
```
```
    Live Server v5.7.9 by Ritwick Dey  
    Launch a development local Server with live reload feature for static & dynamic pages  
```

## Repo structure

    ├── README.md  
    ├── index.html -- open this with LiveServer  
    ├── main.js  
    ├── modules  
    │   ├── focal_point.js  - update the easeFocalPointTo(x,y) function in this file
    │   ├── timeline.css 
    │   ├── timeline.js  
    │   └── utils.js  
    └── styles.css  

## Objective:

The focalPoint currently immediately tracks the tip of the default cursor. 

I want the focal point to ease towards the cursor as it moves around.

Checkout this demo page:
http://www.java2s.com/example/javascript-book/ease-to-mouse.html

and its full-page animation:
http://www.java2s.com/example/javascript-book/ease-to-mouse-demo-6b2a9.htm

I want to have this type of easing animation applied to the "focalPoint" div.

## Requirements:

1. The focalPoint must "ease" towards the mouse as it moves in the canvas area.

2. The focalPoint must ease to the bullsEye when the mouse leaves the canvas area.

3. __And here's the challenge__: 
this must be done without using the HTML5 2d canvas contex.   
For example, this is NOT allowed:

```
    let canvas = document.getElementById('canvas')  
    let context = canvas.getContext('2d')
    draw(context) {
      ...
    }
```

4. Must retain the current code styling
   
5. But feel free to make any suggestions for coding improvements in any file.





