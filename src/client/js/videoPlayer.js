const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const volumeRange = document.getElementById('volum');
const currenTime = document.getElementById('currenTime');
const totalTime = document.getElementById('totalTime');
const timeline = document.getElementById('timeline');
const fullScreenBtn = document.getElementById('fullScreen');
const videoContainer = document.getElementById('videoContainer');
const videoControls = document.getElementById('videoControls');

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;
let videoPlayStatus = false;
let setVideoPlayStatus = false;

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

const formatTime = (seconds) => {
  const startIdx = seconds >= 3600 ? 11 : 14;
  return new Date(seconds * 1000).toISOString().substring(startIdx, 19);
};
const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  if (!setVideoPlayStatus) {
    videoPlayStatus = video.paused ? false : true; //true-일시정시 상태, false-실행중 상태태
    setVideoPlayStatus = true;
  }
  video.pause();
  video.currentTime = value;
};

const handleTimelineSet = () => {
  videoPlayStatus ? video.play() : video.pause();
  setVideoPlayStatus = false;
};

const handlePlaySkip = (time) => {
  timeline.value += time;
  video.currentTime += time;
};

const handleVideoEnded = () => {
  video.currentTime = 0;
  playBtn.innerText = 'Play';
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = 'Enter Full Screen';
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = 'Exit Full Screen';
  }
};

const hideControls = () => videoControls.classList.remove('showing');

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add('showing');
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

window.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    handlePlayClick();
  }
  if (event.key === 'ArrowRight') {
    handlePlaySkip(5);
  }
  if (event.key === 'ArrowLeft') {
    handlePlaySkip(-5);
  }
});
playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleInputVolumeChange);
volumeRange.addEventListener('change', handleChangeVolumeChange);
video.addEventListener('loadedmetadata', handleLoadedMetadata);
video.addEventListener('timeupdate', handleTimeUpdate);
video.addEventListener('ended', handleVideoEnded);
video.addEventListener('mousemove', handleMouseMove);
video.addEventListener('mouseleave', handleMouseLeave);
timeline.addEventListener('input', handleTimelineChange);
timeline.addEventListener('change', handleTimelineSet);
fullScreenBtn.addEventListener('click', handleFullScreen);
