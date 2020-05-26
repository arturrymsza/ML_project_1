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
        model.addData(inputs, target);
        stroke(0);
        noFill();
        ellipse(mouseX, mouseY, 24);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(targetLabel, mouseX, mouseY);
    } else if (state == 'prediction') {
        model.classify(inputs, gotResults);
    }
}

function gotResults(error, results) {
    if(error)
    {
        console.error(error);
        return;
    }    
    console.log(results);
    stroke(0);
    fill(0, 0, 205, 100);
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    let label = results[0].label;
    text(label, mouseX, mouseY);
}