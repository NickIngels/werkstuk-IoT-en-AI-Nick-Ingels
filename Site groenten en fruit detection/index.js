//Store hooks and video sizes:
const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
var vidWidth = 0;
var vidHeight = 0;
var xStart = 0;
var yStart = 0;
// Check if webcam access is supported.
function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}
// If webcam supported, add event listener to activation button:
if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
} else {
    console.warn('getUserMedia() is not supported by your browser');
}
// Enable the live webcam view and start classification.
function enableCam(event) {
    // Only continue if the model has finished loading.
    if (!model) {
        return;
    }
    // Hide the button once clicked.
    enableWebcamButton.classList.add('removed');
    // getUsermedia parameters to force video but not audio.
    const constraints = {
        video: true
    };
    // Stream video from browser(for safari also)
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: "environment"
        },
    }).then(stream => {
        let $video = document.querySelector('video');
        $video.srcObject = stream;
        $video.onloadedmetadata = () => {
            vidWidth = $video.videoHeight;
            vidHeight = $video.videoWidth;
            //The start position of the video (from top left corner of the viewport)
            xStart = Math.floor((vw - vidWidth) / 2);
            yStart = (Math.floor((vh - vidHeight) / 2) >= 0) ? (Math.floor((vh - vidHeight) / 2)) : 0;
            $video.play();
            //Attach detection model to loaded data event:
            $video.addEventListener('loadeddata', predictWebcamTF);
        }
    });
}