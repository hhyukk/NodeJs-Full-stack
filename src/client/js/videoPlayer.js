const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const time = document.getElementById('time');
const volum = document.getElementById('volum');

const handlePlayClick = (e) => {
  if (video.paused) {
    playBtn.innerText = 'Pause';
    video.play();
  } else {
    video.pause();
  }
};

const handlePause = () => (playBtn.innerText = 'Play');
const handlePlay = () => (playBtn.innerText = 'Pause');

const handleMute = (e) => {};

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
video.addEventListener('pause', handlePause);
video.addEventListener('play', handlePlay);
