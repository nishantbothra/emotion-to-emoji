Webcam.set({
    width: 200,
    height: 200,
    image_format: "png",
    png_quality: 100
});

camera = document.getElementById("cam");
Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot_result").innerHTML = '<img id="cap_img" src="' + data_uri + '">';
    });
}
console.log("ml5 Version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/V68p2qbsm/model.json", model_loaded);
function model_loaded() {
    console.log("Model Loaded");
}

prediction_one = "";
prediction_two = "";

function speak() {
    var synth = window.speechSynthesis;
    speak_data_one = "The first prediction is" + prediction_one;
    speak_data_two = "The second prediction is" + prediction_two;
    utterThis = new SpeechSynthesisUtterance(speak_data_one + speak_data_two);
    synth.speak(utterThis);
}
function predict() {
    img = document.getElementById("cap_img");
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("prediction_one_result").innerHTML = results[0].label;
        document.getElementById("prediction_two_result").innerHTML = results[1].label;
        prediction_one = results[0].label;
        prediction_two = results[1].label;
        speak();
        if(results[0].label == "Happy") {
            document.getElementById("prediction_one_emoji").innerHTML = "&#128516;";
        }
        if(results[0].label == "Sad") {
            document.getElementById("prediction_one_emoji").innerHTML = "&#128549;";
        }
        if(results[0].label == "Angry") {
            document.getElementById("prediction_one_emoji").innerHTML = "&#128549;";
        }
        if(results[0].label == "Victory") {
            document.getElementById("prediction_one_emoji").innerHTML = "&#9996;";
        }
        if(results[1].label == "Happy") {
            document.getElementById("prediction_two_emoji").innerHTML = "&#128516;";
        }
        if(results[1].label == "Sad") {
            document.getElementById("prediction_two_emoji").innerHTML = "&#128549;";
        }
        if(results[1].label == "Angry") {
            document.getElementById("prediction_two_emoji").innerHTML = "&#128549;";
        }
        if(results[1].label == "Victory") {
            document.getElementById("prediction_two_emoji").innerHTML = "&#9996;";
        }
    }
}





































































