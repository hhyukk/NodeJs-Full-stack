const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const volumeRange = document.getElementById('volum');
const currenTime = document.getElementById('currenTime');
const totalTime = document.getElementById('totalTime');

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? 'Play' : 'Pause';
};

const handleMute = (e) => {
  video.muted = !video.muted;
  muteBtn.innerText = video.muted ? 'Unmute' : 'Mute';
  volumeRange.value = video.muted ? 0 : volumeValue;
  if (!video.muted) video.volume = volumeValue;
};

const handleInputVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = 'Mute';
  }
  video.volume = value;
  muteBtn.innerText = value == 0 ? 'Unmute' : 'Mute';
};

const handleChangeVolumeChange = (event) => {
  const {
    target: { value },
  } = event;

  if (value != 0) {
    volumeValue = value;
    video.volume = value;
  } else {
    video.muted = true;
  }
};

const handleLoadedMetadata = () => {
  totalTime.innerText = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currenTime.innerText = Math.floor(video.currentTime);
};

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleInputVolumeChange);
volumeRange.addEventListener('change', handleChangeVolumeChange);
video.addEventListener('loadedmetadata', handleLoadedMetadata);
video.addEventListener('timeupdate', handleTimeUpdate);
