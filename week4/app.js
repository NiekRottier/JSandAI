import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

// Options for training the model
const csvFile = "./data/titanic.csv"
const trainingLabel = "Survived"
const ignoredColumns = ["Name", "Cabin", "PassengerId", "Ticket", "Fare"]

// Load csv data
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => trainModel(results.data) // train het model met deze data
    })
}

//
// MACHINE LEARNING - Build the Decision Tree
//
function trainModel(data) {
    // Make train- and testData
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    let decisionTree = new DecisionTree({
        ignoredAttributes: ignoredColumns,
        trainingSet: trainData,
        categoryAttr: trainingLabel
    })

    drawTree(decisionTree)
    test(decisionTree, testData)
}

//
// Draw treestructure
//
function drawTree(decisionTree) {
    // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
    let visual = new VegaTree('#view', 1000, 800, decisionTree.toJSON())
}

//
// Predict data
//
function test(decisionTree, testData) {
    // Remove the 'survived' data
    let unknownData = Object.assign({}, testData);
    delete unknownData.survived;

    let correctPredictions = 0;
    let totalPredictions = testData.length;

    // Loop through the testdata
    for (let i = 0; i < testData.length; i++) {
        let prediction = decisionTree.predict(unknownData[i])

        // Check if the prediction is correct
        if (prediction == testData[i].Survived) {
            correctPredictions++
            console.log(`CORRECT: Prediction is ${prediction}`);
        } else {
            console.log(`WRONG: Prediction is ${prediction}`);
        }
    }

    let accuracy = (correctPredictions / totalPredictions) * 100;
    console.log(`Accuracy is ${Math.round(accuracy * 100)/100}%`);
    document.getElementById("title").innerHTML += ` - Accuracy = ${Math.round(accuracy * 100)/100}%`
}

loadData()