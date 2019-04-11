const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const progressBar = player.querySelector('.progress__filled');
const progress = player.querySelector('.progress')
const buttons = player.querySelectorAll('[data-skip]');
const volumeRange = player.querySelector('[name=volume]');
const playbackRange = player.querySelector('[name=playbackRate]');


function togglePlay() {
   video.paused ? video.play() : video.pause();   
}
function changeButton() {
    const icon = this.paused ? '▶' : '▋▋';
    toggle.textContent = icon; 
}
function updateProgressBar() {
    const percent = (video.currentTime / video.duration) * 100 ;
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
function updateVolume() {
    video.volume = this.value;
}
function updatePlayRate() {
    video.playbackRate = this.value;
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', changeButton);
video.addEventListener('pause', changeButton);
video.addEventListener('timeupdate', updateProgressBar);
toggle.addEventListener('click', togglePlay);
buttons.forEach(button => button.addEventListener('click', skip));
volumeRange.addEventListener('change', updateVolume);
playbackRange.addEventListener('change', updatePlayRate);


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
