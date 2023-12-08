Peter_pan_song="";
Harry_potter_theme_song="";

songStatusPeterPan="";
songStatusHarryPotter="";

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

scoreLeftWrist=0;
scoreRightWrist=0;

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", getposes);
}
function modelLoaded() {
    console.log("posenet has been initialised");
}
function getposes(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("left wrist X = "+leftWristX+" and left wrist Y = "+ leftWristY);
        console.log("right wrist X = "+rightWristX+" and right wrist Y = "+ rightWristY);
    }
}

function preload(){
    Peter_pan_song = loadSound("music2.mp3");
    Harry_potter_theme_song = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);
    fill("#fc0505");
    stroke("#fc0505");

    songStatusPeterPan=Peter_pan_song.isPlaying();
    console.log(songStatusPeterPan);

    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        Harry_potter_theme_song.stop();
        if(songStatusPeterPan==false){
            Peter_pan_song.play();
            document.getElementById("song_id").innerHTML="Song Name: Peter Pan Song";
        }
    }
    if(scoreRightWrist>0.2){
        circle(rightWristX, rightWristY, 20);
        Peter_pan_song.stop();
        if(songStatusHarryPotter==false){
            Harry_potter_theme_song.play();
            document.getElementById("song_id").innerHTML="Song Name: Harry Potter Theme Song";
        }
    }
}