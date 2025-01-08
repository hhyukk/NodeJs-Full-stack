import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const startBtn = document.getElementById('startBtn');
const video = document.getElementById('preview');

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'recording.webm', await fetchFile(videoFile));
  await ffmpeg.run('-i', 'recording.webm', '-r', '60', 'output.mp4');

  const mp4File = ffmpeg.FS('readFile', 'output.mp4');

  const mp4Blop = new Blob([mp4File.buffer], { type: 'video/mp4' });

  const mp4Url = URL.createObjectURL(mp4Blop);

  const a = document.createElement('a');
  a.href = mp4Url;
  a.download = 'MyRecording'; //비디로오 안 나오고 텍스트 등으로 나오면 .webm 등 확장자 추가
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.innerText = 'Download Recording';
  startBtn.removeEventListener('click', handleStop);
  startBtn.addEventListener('click', handleDownload);
  recorder.stop();
};
const handleStart = async () => {
  startBtn.innerText = 'Stop Recording';
  startBtn.removeEventListener('click', handleStart);
  startBtn.addEventListener('click', handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    console.log(videoFile);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};
const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};
init();
startBtn.addEventListener('click', handleStart);
