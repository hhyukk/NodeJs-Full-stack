import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const startBtn = document.getElementById('startBtn');
const video = document.getElementById('preview');

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({ log: true }); //ffmpeg instance 만듦
  await ffmpeg.load();

  ffmpeg.FS('writeFile', 'recording.webm', await fetchFile(videoFile)); //FFmpeg 가상의 세계에 파일을 만듦

  await ffmpeg.run('-i', 'recording.webm', '-r', '60', 'output.mp4'); //60프레임
  // 가상의 파일(recording.webm)을 가상의 컴퓨터에서 input으로 받은 후 이를 지정한 결과물(output.mp4)로 변환

  await ffmpeg.run(
    '-i',
    'recording.webm',
    // 영상의 특정 시간대(여기서는 1초)로 이동
    '-ss',
    '00:00:01',
    // 이동한 시간대의 첫 프레임을 스크린샷 1장장
    '-frames:v',
    '1',
    // 그 스크린샷을 썸네일 만듦
    'thumbnail.jpg'
  );

  const mp4File = ffmpeg.FS('readFile', 'output.mp4'); // mp4File은 Uint8Array 형식
  const thumbFile = ffmpeg.FS('readFile', 'thumbnail.jpg');

  const mp4Blop = new Blob([mp4File.buffer], { type: 'video/mp4' }); //mp4File.buffer는 ArrayBuffer 형식식
  const thumbBlob = new Blob([thumbFile.buffer], { type: 'image/mp4' });

  const mp4Url = URL.createObjectURL(mp4Blop);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  const a = document.createElement('a');
  a.href = mp4Url;
  a.download = 'MyRecording'; //비디로오 안 나오고 텍스트 등으로 나오면 .webm 등 확장자 추가
  document.body.appendChild(a);
  a.click();

  const thumbA = document.createElement('a');
  thumbA.href = thumbUrl;
  thumbA.download = 'MyThumbnail.jpg';
  document.body.appendChild(thumbA);
  thumbA.click();
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
