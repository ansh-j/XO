// INITIALIZING THE VARIABLES

let audioElement = new Audio("songs/505.mp3");
// console.log(audioElement);
let masterPlay = document.getElementById("masterPlay");
let myProgressbar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("track"));
// console.log(songItems);
let songIndex = 0;


let songs = [

    "505", "Arabella", "Castle on the hill", "Do i wanna know", "I wanna be yours", "I was never there", "Supercuts", "Thinking out loud", "We don't talk anymore", "You are not alone"

]
// let songIndex = songs.indexOf({ songName: "505", filePath: "songs/505.mp3" });
// console.log(songIndex);

songItems.forEach((element, i) => {

    element.getElementsByClassName("trackName")[0].innerHTML = songs[i];




})

// PLAY/PAUSE

masterPlay.addEventListener("click", function () {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
        document.getElementById(songs[songIndex]).classList.remove("fa-play");
        document.getElementById(songs[songIndex]).classList.add("fa-pause");

    }
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
        document.getElementById(songs[songIndex]).classList.remove("fa-pause");
        document.getElementById(songs[songIndex]).classList.add("fa-play");

    }
})

//  EVENTS 


// UPDATING THE TIMER
audioElement.addEventListener("timeupdate", function () {

    console.log("timeupdate");
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgressbar.value = progress;
    if (myProgressbar.value == 100) {
        if (songIndex >= 9) {
            songIndex = 0;
        }
        else {
            songIndex++;
        }
        makeAllpause();
        // myProgressbar.value = 0;

        document.getElementById(songs[songIndex]).classList.remove("fa-play");
        document.getElementById(songs[songIndex]).classList.add("fa-pause");
        audioElement.currentTime = 0;
        audioElement.src = "songs/" + (songs[songIndex]) + ".mp3";
        audioElement.play();
        document.getElementById("currentlyPlaying").innerHTML = songs[songIndex];
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
    }
})

myProgressbar.addEventListener('change', function () {
    audioElement.currentTime = myProgressbar.value * audioElement.duration / 100;
})

// WHEN A SONG ENDS


if (myProgressbar.value == 100) {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex++;
    }
    makeAllpause();
    myProgressbar.value = 0;

    document.getElementById(songs[songIndex]).classList.remove("fa-play");
    document.getElementById(songs[songIndex]).classList.add("fa-pause");
    audioElement.currentTime = 0;
    audioElement.src = "songs/" + (songs[songIndex]) + ".mp3";
    audioElement.play();
    document.getElementById("currentlyPlaying").innerHTML = songs[songIndex];
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
}

function makeAllpause() {
    Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
    })
}

let prev;
Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
    element.addEventListener("click", () => {

        index = String(element.id);
        if (index == prev) {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                masterPlay.classList.remove("fa-play");
                masterPlay.classList.add("fa-pause");
                element.classList.remove("fa-play");
                element.classList.add("fa-pause");
                gif.style.opacity = 1;
                songIndex = songs.indexOf(index);
                // console.log(songIndex);
            }
            else {
                audioElement.pause();
                masterPlay.classList.remove("fa-pause");
                masterPlay.classList.add("fa-play");
                element.classList.remove("fa-pause");
                element.classList.add("fa-play");
                gif.style.opacity = 0;

            }
        }
        else {


            makeAllpause();
            myProgressbar.value = 0;
            element.classList.remove("fa-play");
            element.classList.add("fa-pause");
            audioElement.currentTime = 0;
            audioElement.src = "songs/" + (index) + ".mp3";
            audioElement.play();
            document.getElementById("currentlyPlaying").innerHTML = index;
            masterPlay.classList.remove("fa-play");
            masterPlay.classList.add("fa-pause");
            gif.style.opacity = 1;
            songIndex = songs.indexOf(index);
            // console.log(songIndex);

            prev = index;
        }
    })
})

document.addEventListener("keydown", (event) => {
    // console.log(event);
    if (event.key == " ") {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove("fa-play");
            masterPlay.classList.add("fa-pause");
            gif.style.opacity = 1;
            let name = document.getElementById("currentlyPlaying").textContent;
            document.getElementById(name).classList.remove("fa-play");
            document.getElementById(name).classList.add("fa-pause");
        }
        else {
            audioElement.pause();
            makeAllpause();
            masterPlay.classList.remove("fa-pause");
            masterPlay.classList.add("fa-play");
            gif.style.opacity = 0;

        }

    }
})

document.getElementById("next").addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex++;
    }

    makeAllpause();
    myProgressbar.value = 0;

    document.getElementById(songs[songIndex]).classList.remove("fa-play");
    document.getElementById(songs[songIndex]).classList.add("fa-pause");
    audioElement.currentTime = 0;
    audioElement.src = "songs/" + (songs[songIndex]) + ".mp3";
    audioElement.play();
    document.getElementById("currentlyPlaying").innerHTML = songs[songIndex];
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;


})

document.getElementById("prev").addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9;
    }
    else {
        songIndex--;
    }

    makeAllpause();

    document.getElementById(songs[songIndex]).classList.remove("fa-play");
    document.getElementById(songs[songIndex]).classList.add("fa-pause");
    audioElement.currentTime = 0;
    audioElement.src = "songs/" + (songs[songIndex]) + ".mp3";
    audioElement.play();
    document.getElementById("currentlyPlaying").innerHTML = songs[songIndex];
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;

})