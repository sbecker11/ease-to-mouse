var _canvasContainer;
var _focalPoint;
var _focalPointListener;


// -----------------------------------------------------
// save the caller's canvasContainer and focalPoint elements.
// save the caller's callback function, focalPointListener, 
// which will be called while the focalPoint is moving.
//
export function createFocalPoint(canvasContainer, focalPoint, focalPointListener) {
    _canvasContainer = canvasContainer;
    _focalPoint = focalPoint;
    _focalPointListener = focalPointListener;
}

// get the canvasContainer-relative 
// location of the _focalPoint center
export function getFocalPoint() {
    var fpX = _focalPoint.offsetLeft + _focalPoint.offsetWidth / 2;
    var fpY = _focalPoint.offsetTop + _focalPoint.offsetHeight / 2;
    return { fpX, fpY };
}

// move the _focalPoint to the given
// canvasContainer-relative location
export function moveFocalPointTo(x, y) {
    var { fpX, fpY } = getFocalPoint();
    var newLeft = x - _focalPoint.offsetWidth / 2;
    var newTop = y - _focalPoint.offsetHeight / 2;
    _focalPoint.style.left = `${newLeft}px`;
    _focalPoint.style.top = `${newTop}px`;

    // notify the caller's listener
    _focalPointListener(x,y);
}

// ease the _focalPoint to the given
// canvasContainer-relative location
export function easeFocalPointTo(x, y, callback) {

    // for now this is just a direct move, but this function
    // needs to be altered to animate the focalPoint 
    moveFocalPointTo(x, y);

    // notify the caller's listener at each
    // frame in the animation
    _focalPointListener(x,y);
}
