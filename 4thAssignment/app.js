import { VegaScatterplot } from "./libraries/vegascatterplot.js";

let nn;
let plot;
let csvFile = "./data/cars.csv";

function startApplication() {
    loadData()
}

//
// Load csv data
//
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => checkData(results.data) // Draw scatterplot with data
    })
}

//
// check and prepare the data
//
async function checkData(data) {
    // Select mpg and horsepower columns
    data = await data.map(car => ({
        mpg: car.mpg,
        horsepower: car.horsepower
    }))

    // Check if data aren't empty and are numbers
    data = await data.filter(car => (car.mpg != null && car.horsepower != null));
    data = await data.filter(car => (!isNaN(car.mpg) && !isNaN(car.horsepower)));

    // Shuffle array
    data.sort(() => (Math.random() - 0.5))

    // Split data in train- and testdata
    let trainData = await data.slice(0, Math.floor(data.length * 0.8))
    let testData = await data.slice(Math.floor(data.length * 0.8) + 1)
    drawScatterPlot(trainData, testData)
}

//
// draw the scatterplot
//
async function drawScatterPlot(trainData, testData) {
    plot = new VegaScatterplot();
    await plot.initialise("horsepower", "mpg", 600, 400, trainData);

    createNeuralNetwork(trainData, testData)
}

//
// create and train the neural network
//
async function createNeuralNetwork(trainData, testData) {
    // create neural network
    const options = {
        task: 'regression',
        debug: true
    }

    // initialize neural network
    nn = ml5.neuralNetwork(options);

    // add data to neural network
    for (let row of trainData) {
        // addData({inputs}, {outputs})
        nn.addData({ horsepower: row.horsepower }, {  mpg: row.mpg })
    }

    // normalize data
    nn.normalizeData();

    // train neural network
    const trainingOptions = {
        epochs: 40,
        batchsize: 10
    }
    console.log("Training...");
    nn.train(trainingOptions, () => {
        console.log("Finished Training!")
        predictionline()
        calculateAccuracy(testData)
        addSave()
        addPrediction()
    })

    // Load pre-trained model
    // loadModel(testData)
}

//
// make predictions and draw a line in the plot
//
async function predictionline() {
    // make a prediction for every point on the X-axis
    let predictions = []
    for (let i = 0; i < 300; i++) {
        let prediction = await nn.predict({ horsepower: i });
        // console.log(prediction[0].value);
        predictions.push({
            horsepower: i,
            mpg: prediction[0].value
        })
    }
    // console.log(predictions);

    // send predictions array to the scatterplot
    plot.addPoints(predictions)
}

//
// calculate accuracy
//
async function calculateAccuracy(testData) {
    console.log("Calculating accuracy...");

    // make predictions using testData
    let predictions = [];
    for (let i = 0; i < testData.length; i++) {
        let prediction = await nn.predict({ horsepower: testData[i].horsepower });
        // console.log(prediction[0].value);
        predictions.push(prediction[0].mpg)
    }
    // console.log(predictions);

    // check if predictions are correct
    let correctPredictions = 0;
    let totalPredictions = await testData.length;
    
    for (let i = 0; i < predictions.length; i++) {
        // console.log(`is ${Math.round(predictions[i])} even to ${Math.round(testData[i].mpg)}?`);
        if (Math.round(predictions[i]) === Math.round(testData[i].mpg)) {
            correctPredictions++
            // console.log("CORRECT");
        }        
    }

    // calculate accuracy and round to 2 decimals
    let accuracy = (correctPredictions / totalPredictions) * 100;
    accuracy = Math.round(accuracy * 100)/100

    console.log(`Calculated accuracy: ${accuracy}% - ${correctPredictions} out of ${totalPredictions} correct.`);

    let accuracyTxt = document.getElementById("accuracyTxt")
    accuracyTxt.innerHTML = `Accuracy = ${accuracy}% - ${correctPredictions} out of ${totalPredictions} correct.`
}

//
// add funtionality to savebutton
//
function addSave() {
    let saveButton = document.getElementById("saveModel");
    saveButton.addEventListener("click", () => {
        nn.save("Model", () => console.log("Saved Model!"))
    });
}

function addPrediction() {
    let predictionInput = document.getElementById("horsepowerInput");
    let predictButton = document.getElementById("predictButton");

    // Replace "Loading..." text
    predictionInput.placeholder = "Enter horsepower here...";
    predictButton.innerHTML = "Predict!"

    predictButton.addEventListener("click", prediction)
}

async function prediction() {
    let predictionInput = document.getElementById("horsepowerInput");
    let predictionOutput = document.getElementById("prediction");

    let prediction = await nn.predict({ horsepower:  Number(predictionInput.value) });

    console.log(prediction[0].mpg);
    predictionOutput.innerHTML = `${predictionInput.innerText}horsepower is probably ${Math.round(prediction[0].mpg * 100)/100} mpg`
}

//
// load pre-trained model
//
function loadModel(testData) {
    console.log("Loading model...");

    nn.load('./model/model.json', () => {
        console.log("Model loaded!")
        predictionline()
        calculateAccuracy(testData)
        addSave()
        addPrediction()
    })
}

// start the application
startApplication()