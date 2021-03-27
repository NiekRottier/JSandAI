let synth = window.speechSynthesis
let nn;

function loadModel() {
    nn = ml5.imageClassifier('MobileNet', modelLoaded)
}

function modelLoaded() {
    console.log('Model Loaded!');
    predictButton()
}

function predictButton() {
    let predictButton = document.getElementById("predictButton")
    predictButton.addEventListener("click", classifyImage)
}

async function classifyImage() {
    let image = document.getElementById("image")
    let predictions;
    await nn.classify(image, (err, results) => {
        // console.log(results);
        predictions = results;
        console.log(`I think this is a ${results[0].label} and I'm ${Math.round(results[0].confidence*10000)/100}% sure about it.`);
        console.log(`Or it's a ${results[1].label} and I'm ${Math.round(results[1].confidence*10000)/100}% sure about that.`);
        console.log(`Or it's a ${results[2].label} and I'm ${Math.round(results[2].confidence*10000)/100}% sure about that.`);
    })
    speak(`I think this is a ${predictions[0].label} and I'm ${Math.round(predictions[0].confidence*10000)/100}% sure about it.`);
}

function speak(message) {
    let utterThis = new SpeechSynthesisUtterance(message)
    synth.speak(utterThis)
}

loadModel();