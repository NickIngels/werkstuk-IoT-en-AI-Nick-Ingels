"use strict";

let mobilenet;
let video;
let label;
let kopen = "Kopen!";
let misschienKopen = "Kopen als het noodzakelijk is";
let nietKopen = "Niet kopen!";

function modelReady() {
    mobilenet.predict(gotResults);
    console.log('Model is ready!');
}

function gotResults(error, results) {
    console.log('Prediction ready');
    mobilenet.predict(gotResults);
    // console.log(results);
    if (error) {
        console.log(error);
    } else {
        const Prediction = results[0];
        if (Prediction.probability > 0.7) {
            //document.getElementById("titel").innerHTML = results[0].className;
            console.log(results[0].className);
            if (results[0].className == "banana") {
                document.getElementById("titel").innerHTML = "Banaan:";
                document.getElementById("info").innerHTML = "Het is niet het seizoen voor bananen en deze werden overgevlogen uit Afrika";
                document.getElementById("advies").innerHTML = "Ons advies:";
                document.getElementById("adviesbeschr").innerHTML = nietKopen;
                document.body.style.backgroundColor = "#8b0000";
            } else if (results[0].className == "fig") {
                document.getElementById("titel").innerHTML = "Vijg:";
                document.getElementById("info").innerHTML = "Het is het seizoen voor vijgen en het was een zachte winter, dus de vijgen zijn van Belgische oorsprong.";
                document.getElementById("advies").innerHTML = "Ons advies:";
                document.getElementById("adviesbeschr").innerHTML = kopen;
                document.body.style.backgroundColor = "green";
            } else if (results[0].className == "pomegranate") {
                document.getElementById("titel").innerHTML = "Granaatappel:";
                document.getElementById("info").innerHTML = "Het is het seizoen voor granaatappels, maar deze granaatappels zijn overgevlogen uit Spanje.";
                document.getElementById("advies").innerHTML = "Ons advies:";
                document.getElementById("adviesbeschr").innerHTML = misschienKopen;
                document.body.style.backgroundColor = "orange";
            } else if (results[0].className == "pineapple, ananas") {
                document.getElementById("titel").innerHTML = "Ananas:";
                document.getElementById("info").innerHTML = "Het is het seizoen voor ananas, maar deze ananassen zijn overgevlogen uit Spanje.";
                document.getElementById("advies").innerHTML = "Ons advies:";
                document.getElementById("adviesbeschr").innerHTML = misschienKopen;
                document.body.style.backgroundColor = "orange";
            } else if (results[0].className == "Granny Smith") {
                document.getElementById("titel").innerHTML = "Granny Smith:";
                document.getElementById("info").innerHTML = "Het is het seizoen voor appels en het was een zachte winter, dus de appels zijn van Belgische oorsprong.";
                document.getElementById("advies").innerHTML = "Ons advies:";
                document.getElementById("adviesbeschr").innerHTML = kopen;
                document.body.style.backgroundColor = "green";
            }
            // else {
            //     document.body.style.backgroundColor = "grey";
            //     document.getElementById("info").innerHTML = "";
            //     document.getElementById("advies").innerHTML = "Product niet gekend";
            //     document.getElementById("adviesbeschr").innerHTML = "";
            // }
        }
    }
}

function imageReady() {
    image(puffin, 0, 0, width, height);
}

function setup() {
    let canvas = createCanvas(640, 480);
    canvas.parent("container");
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.imageClassifier("MobileNet", video, modelReady);
}

function draw() {
    background(0);
    image(video, 0, 0);
}