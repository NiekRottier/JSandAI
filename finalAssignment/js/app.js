console.log("Starting app...");

// Get the models
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
    faceapi.nets.faceExpressionNet.loadFromUri("./models")
]).then(startWebcam)


// Start the webcam
const video = document.getElementById("video")

function startWebcam() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

// Make and draw detection
video.addEventListener("play", () => {
    console.log("Webcam started")
    
    // Create canvas and append it to body
    const canvas = faceapi.createCanvasFromMedia(video)
    document.getElementById("webcam").append(canvas)

    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)

    let notHappyCounter = 0
    
    // Do this code every 200ms
    setInterval(async () => {
        // Do detections
        const detection = await faceapi.detectSingleFace(video).withFaceExpressions()

        // Clear canvas
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

        // If a face is detected
        if(detection){
            // Check if face is sad, angry or disgusted
            if(detection.expressions.angry > 0.5 || detection.expressions.sad > 0.5 || detection.expressions.disgusted > 0.5){
                console.log("You don't look happy..");
                notHappyCounter++

                // If face has been sad, angry or disgusted 20 times / 4 seconds
                if(notHappyCounter == 15){
                    console.log("You've been not happy 20 times, time to change that!");

                    // Play a ding
                    var context = new AudioContext()
                    var o = context.createOscillator()
                    var  g = context.createGain()
                    o.connect(g)
                    // Frequenty of 830.6hz (C4)
                    o.frequency.value = 830.6
                    g.connect(context.destination)
                    o.start(0)
                    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 2)

                    // Put a random dog in the HTML
                    randomDog()

                    // Reset counter
                    notHappyCounter = 0
                }
            }

            // Draw detections and face expression
            const resizedDetection = faceapi.resizeResults(detection, displaySize)
            faceapi.draw.drawDetections(canvas, resizedDetection)
            faceapi.draw.drawFaceExpressions(canvas, resizedDetection)
        } 
        else {
            console.log("No face detected..");
        }
    }, 200)
})

// Fetch a random dog and put it in the HTML
function randomDog(){
    let dogPic = document.getElementById("dogPic")

    fetch("https://dog.ceo/api/breeds/image/random")
        .then((response) => {return response.json()})
        .then((json) => {
            console.log(`Status Dag API fetch: ${json.status}`);
            let imageUrl = json.message
            dogPic.src = imageUrl
        })
        .catch((error) => console.log(`ERROR: ${error}`))
}

// Put the first dog in the HTML
randomDog()