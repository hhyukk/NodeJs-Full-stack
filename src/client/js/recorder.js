import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const actionBtn = document.getElementById('actionBtn');
const video = document.getElementById('preview');

let stream;
let recorder;
let videoFile;

const files = {
  input: 'recording.webm',
  output: 'output.mp4',
  thumb: 'thumbnail.jpg',
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement('a');
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  actionBtn.removeEventListener('click', handleDownload);

  actionBtn.innerText = 'Transcoding...';
  actionBtn.disabled = true;

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
  await ffmpeg.writeFile(files.input, await fetchFile(videoFile));
  await ffmpeg.exec(['-i', files.input, '-r', '60', files.output]);

  await ffmpeg.exec(['-i', files.input, '-ss', '00:00:01', '-frames:v', '1', files.thumb]);

  const mp4File = await ffmpeg.readFile(files.output);
  const mp4Blob = new Blob([mp4File.buffer], { type: 'video/mp4' });
  const mp4Url = URL.createObjectURL(mp4Blob);

  const thumbFile = await ffmpeg.readFile(files.thumb);
  const thumbBlob = new Blob([thumbFile.buffer], { type: 'image/jpg' });
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, 'MyRecording.mp4');
  downloadFile(thumbUrl, 'MyThumbnail.jpg');

  await ffmpeg.deleteFile(files.input);
  await ffmpeg.deleteFile(files.output);
  await ffmpeg.deleteFile(files.thumb);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  init();
  actionBtn.innerText = 'recording Again';
  actionBtn.addEventListener('click', handleStart);
};

const handleStart = async () => {
  actionBtn.innerText = 'Recording';
  actionBtn.disabled = true;
  actionBtn.removeEventListener('click', handleStart);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    console.log(videoFile);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();

    actionBtn.innerText = 'Download';
    actionBtn.disabled = false;
    actionBtn.addEventListener('click', handleDownload);
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 5000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1024,
      height: 576,
    },
  });
  video.srcObject = stream;
  video.play();
};

init();
actionBtn.addEventListener('click', handleStart);
