const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const musicPlayer = document.getElementById('player');
const currTime = document.getElementById('current-time');
const musicImage = document.getElementById('music-image');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const endTime = document.getElementById('end-time');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

// songs info

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric chill Music',
        artist: 'Jacinto'
    },
    {
        name: 'jacinto-2',
        displayName: 'Electric chill Music-1',
        artist: 'Jacinto'
    },
    {
        name: 'jacinto-3',
        displayName: 'Electric chill Music-2',
        artist: 'Jacinto'
    }
]

//flag to check whether music playing or not.

let isPlaying = false;

// play
 function PlayMusic() {
    musicPlayer.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    isPlaying = true;
}
// pause
function PauseMusic() {
    musicPlayer.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    isPlaying = false;
}


// play button clicked
playBtn.addEventListener('click', () => (isPlaying ? PauseMusic(): PlayMusic()));


//  update song info DOM.
let songNumber = 0;
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    musicPlayer.src = `music/${song.name}.mp3`;
    musicImage.src = `img/${song.name}.jpg`;
    if(isPlaying) {
        musicPlayer.play();
    }
    
    
}

//onload select first song.
loadSong(songs[songNumber]);

// Next Song
nextBtn.addEventListener('click', () => {
    songNumber += 1;
    if(songNumber === songs.length) {
        songNumber = 0;
        loadSong(songs[songNumber]);
    }
    else {
        loadSong(songs[songNumber]);
    }
});

//  Previous Song
prevBtn.addEventListener('click', () => {
    songNumber -= 1;
    if(songNumber === -1) {
        songNumber = songs.length - 1;
        loadSong(songs[songNumber]);
    }
    else {
        loadSong(songs[songNumber]);
    }
} );

// update progress bar
function updateProgress(e) {
    const {currentTime, duration} = e.srcElement;
    if(isPlaying){
        const progressPercent = ( currentTime / duration ) * 100;
        progress.style.width = `${progressPercent}%`; 
        
    }
    // update music length
    let min = Math.floor( duration / 60 );
    let seconds = Math.floor(duration % 60);
    if(seconds < 10) {
        seconds = `0${seconds}`; 
    }
    if(seconds) {
        endTime.innerText = `${min}:${seconds}`;
    }
    // update current music time
    let currMin = Math.floor( currentTime / 60 );
    let currSeconds = Math.floor(currentTime % 60);
    if(currSeconds < 10) {
        currSeconds = `0${currSeconds}`; 
    }
    currTime.innerText = `${currMin}:${currSeconds}`;
     
}

// set progress vio progress bar
function setProgress(e) {
    const totalWidth = this.clientWidth;
    const offsetXNew = e.offsetX;
    let newWidth = (offsetXNew / totalWidth) * 100;
    const {duration} = musicPlayer;
    const newMusicPosition = (newWidth / 100) * duration;
    musicPlayer.currentTime = newMusicPosition;
    progress.style.width = `${newWidth}%`;
}
musicPlayer.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);