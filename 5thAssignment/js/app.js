let synth = window.speechSynthesis;
let nn;
let score = 0;

// Load the model
function loadModel() {
    nn = ml5.imageClassifier('MobileNet', () => console.log("Model Loaded!"))
}

// Upload images
const fileButton = document.querySelector("#file")
const image = document.getElementById('output')

fileButton.addEventListener("change", (event)=>loadFile(event))
image.addEventListener('load', () => userImageUploaded())

function loadFile(event) {
	image.src = URL.createObjectURL(event.target.files[0])
}

function userImageUploaded(){
    console.log("The image is now visible!")
    classifyImage()
}

// Make predictions
async function classifyImage() {
    console.log("Classifying...");
    let image = document.getElementById("output")
    let predictions;
    await nn.classify(image, (err, results) => {
        // console.log(results);
        predictions = results;
        console.log(`I think this is a ${results[0].label} and I'm ${Math.round(results[0].confidence*10000)/100}% sure about it.`);
        console.log(`Or it's a ${results[1].label} and I'm ${Math.round(results[1].confidence*10000)/100}% sure about that.`);
        console.log(`Or it's a ${results[2].label} and I'm ${Math.round(results[2].confidence*10000)/100}% sure about that.`);
    })

    let resultText = document.getElementById("result")
    let scoreDOM = document.getElementById("score")

    // Check if uploaded picture is a hamster and speak & write in the HTML accordingly
    if (predictions[0].label == "hamster") {
        console.log("Uploaded image is a hamster");

        speak(`I'm ${Math.round(predictions[0].confidence*10000)/100}% confident this is indeed a hamster! Well done!`)
        resultText.innerHTML = `I'm ${Math.round(predictions[0].confidence*10000)/100}% confident this is indeed a hamster! Well done!`;

        score++
        scoreDOM.innerHTML = `Score: ${score}`
    } 
    else {
        console.log("Uploaded image is not a hamster");

        speak(`You thought this was a hamster? No no no, of course not. I'm ${Math.round(predictions[0].confidence*10000)/100}% sure it's a ${predictions[0].label}.`)
        resultText.innerHTML = `You thought this was a hamster? No no no, of course not. I'm ${Math.round(predictions[0].confidence*10000)/100}% sure it's a ${predictions[0].label}.`;
    }
}

// Speak a message
function speak(message) {
    let utterThis = new SpeechSynthesisUtterance(message)
    synth.speak(utterThis)
}

loadModel();