console.log('ml5 version:', ml5.version);

let model;
let targetLabel = 'C';

let state = 'collection';

function setup() {
    createCanvas(600,600);
    let options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification',
    debug: true
    };
    model = ml5.neuralNetwork(options);

    background(245);
}

function mousePressed() {
    let inputs = {
        x: mouseX,
        y: mouseY
    };

    if(state == 'collection') 
    {
        let target = 
        {
            label: targetLabel
        }
    }


}