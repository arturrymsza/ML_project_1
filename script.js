console.log('ml5 version:', ml5.version);

let model;
let targetLabel = 'C';
var canvas = document.createElement("CANVAS");

let state = 'collection';

function setup() {
    createCanvas(600,600);
    let options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification',
    debug: true
    };
    background(245);
}



model = ml5.neuralNetwork(options);

function mousePressed() {
    let inputs = {
        x: mouseX,
        y: mouseY
    };


}