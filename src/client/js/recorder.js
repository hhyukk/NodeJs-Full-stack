import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const startBtn = document.getElementById('startBtn');
const video = document.getElementById('preview');

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  // const baseURL = 'http://localhost:4000/ffmpeg/core/dist/umd';
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd'; // ffmpeg의 unpkg core URL
  const ffmpeg = new FFmpeg();
  ffmpeg.on('log', ({ message }) => {
    console.log(message);
  });
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
  await ffmpeg.writeFile('recording.webm', await fetchFile(videoFile));
  await ffmpeg.exec(['-i', 'recording.webm', '-r', '60', 'output.mp4']);

  await ffmpeg.exec(['-i', 'recording.webm', '-ss', '00:00:01', '-frames:v', '1', 'thumbnail.jpg']);

  const mp4File = await ffmpeg.readFile('output.mp4');
  const mp4Blob = new Blob([mp4File.buffer], { type: 'video/mp4' });
  const mp4Url = URL.createObjectURL(mp4Blob);

  const thumbFile = await ffmpeg.readFile('thumbnail.jpg');
  const thumbBlob = new Blob([thumbFile.buffer], { type: 'video/mp4' });
  const thumbUrl = URL.createObjectURL(thumbBlob);

  const a = document.createElement('a');
  a.href = mp4Url;
  a.download = 'MyRecording.mp4';
  document.body.appendChild(a);
  a.click();

  const thumbA = document.createElement('a');
  thumbA.href = thumbUrl;
  thumbA.download = 'MyThumbnail.jpg';
  document.body.appendChild(thumbA);
  thumbA.click();

  await ffmpeg.deleteFile('recording.webm');
  await ffmpeg.deleteFile('output.mp4');
  await ffmpeg.deleteFile('thumbnail.jpg');
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
