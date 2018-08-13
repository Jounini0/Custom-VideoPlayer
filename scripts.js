// Get Our Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full__screen');


// Build out Functions
function togglePlay(){
	//equal with the down
	// const method = video.paused ? 'play' : 'pause';
	// video[method]();

	if (video.paused){
		video.play();
	} else {
		video.pause();
	}

}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	// console.log('Update the button');
	toggle.textContent = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function openFullscreen() {
	// player.with="100%";
	if (player.requestFullscreen){
		player.requestFullscreen();
	} else if (player.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    	player.webkitRequestFullscreen();
	}
}

// Hook up the event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
// move the progress bar when click is down!
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); //if mousedown is true it moves to function scrub, else not :)
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullScreen.addEventListener('click', openFullscreen)