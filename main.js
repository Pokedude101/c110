//https://teachablemachine.withgoogle.com/models/og_UokavT/

//set is a pre-defined function of webcam.js which will set the properties of live webcam
//it accepts data in JSON format ({})

prediction_1 = ""
prediction_2 = ""


Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
//attach is a predefined function which will attach the webcam to the div tag with id "camera"
Webcam.attach('camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="result_image" src="'+data_uri+'"/>';
    })
}
//displaying the version of ml5.js to make sure its working fine

console.log("ml5 version: " + ml5.version);

//imageClassifier is a predefined function of ml5.js that is used to trigger the ml5.js image classification function.
//this function accepts two parameters 

//Second, a function - this function will start the ml5 image classification.
//If we don’t pass this function, then ml5 image classification won’t start.

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/og_UokavT/model.json', modelLoaded);

function modelLoaded(){
    console.log("model has loaded");
}

//This function will help us to perform text to speech of the results and speak out the results obtained from the model.

//utterThis - This is a variable in which we will store the converted text to speech

//SpeechSynthesisUtterance - is the function of an API that will convert text to speech.
//speak() function is a predefined function of the API.

function speak(){
    var synth =  window.speechSynthesis;
    speech1 = "My first guess of what your emotion is " + prediction_1;
    speech2 = "My second guess of what your emotion is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speech1 + speech2);
    synth.speak(utterThis);
}

function scanSnapshot(){
    img = document.getElementById('result_image');
    classifier.classify(img, gotResults);
}


function gotResults(error, results){
    if(error){
        console.log("error");
    }
    else{
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = prediction_1;
        document.getElementById("result_emotion_name2").innerHTML = prediction_2;
        speak();
        if(results[0].label == "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128512;"	
        }
        if(results[1].label == "Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128512;"	
        }
        if(results[0].label == "Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128557;"	
        }
        if(results[1].label == "Sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128557;"	
        }
        if(results[0].label == "Cold"){
            document.getElementById("update_emoji").innerHTML = "&#129296;"	
        }
        if(results[1].label == "Cold"){
            document.getElementById("update_emoji2").innerHTML = "&#129296;"	
        }
    }
}

