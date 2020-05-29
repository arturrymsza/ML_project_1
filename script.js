console.log('ml5 version:', ml5.version);

let model;
let targetLabel = 'C';

let state = 'collection';

function setup() {
    createCanvas(800,600);
    let options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification',
    debug: true
    };
    model = ml5.neuralNetwork(options);
    model.loadData('clicks.json', dataLoaded);

    background(245);
}

function dataLoaded() {
    console.log(model.data);
    let data = model.data.data.raw;
    for (let i = 0; i < data.Length; i++) {
        let inputs = data[i].xs;
        let target = data[i].ys;
        stroke(0);
        noFill();
        ellipse(inputs.x, inputs.y, 24);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(target.label, inputs.x, inputs.y);
    }
    state = 'training';
    console.log('starting training');
    model.normalizeData();
    let options = {
    epochs: 200
    };
    model.train(options, whileTraining, finishedTraining);
}

function keyPressed() {
    if (key == 't')
    {
        state = 'training';
        console.log('starting training');
        model.normalizeData();
        let options = {
            epochs: 200
        };
        model.train(options, whileTraining, finishedTraining);
    } 
    else if (key == 's') {
        model.saveData('clicks');
    } 
    else {
        targetLabel = key.toUpperCase();
    }


}

function whileTraining(epoch, loss) {
    console.log(epoch);
}

function finishedTraining() {
    console.log('finished training');
    state = 'prediction';
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