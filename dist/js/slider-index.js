const slider_imgs = document.querySelectorAll('.slider__image');
const btnRight = document.getElementById('btn-right');
const btnLeft = document.getElementById('btn-left');
const btnPlay = document.getElementById('btn-play');

var counter = 0;
var selfPlay = true;

var selfPlaying = setInterval(function() {
	changeImage();
}, 3000);


btnLeft.addEventListener('click', () => leafClick(changeImageBack))

btnRight.addEventListener('click', () => leafClick(changeImage))

btnPlay.addEventListener('click', function() {
	if (selfPlay == true) {
		clearInterval(selfPlaying);
		playBtnActive()
	} else {
		pauseBtnActive()
		selfPlaying = setInterval(function() {
			changeImage();
		}, 4000);
	}
	selfPlay = !selfPlay;
})

function changeImage() { //next image
	counter ++;
	if (counter === slider_imgs.length-1) {
		counter = 0;
	}
	for (let i = 0;i < slider_imgs.length;i++) {
		slider_imgs[i].style.opacity = '0'
	}
	slider_imgs[counter].style.opacity = '1';

}

function changeImageBack() { //previous image
	counter--;
	if (counter == -1) {
		counter = slider_imgs.length - 1;
	}
	for (let i = 0;i<slider_imgs.length;i++) {
		slider_imgs[i].style.opacity = '0'
	}
	slider_imgs[counter].style.opacity = '1';
}

function leafClick(dirCallback) {
	playBtnActive()
	clearInterval(selfPlaying);
	dirCallback();
	selfPlay = false;
}

function pauseBtnActive() {
	document.querySelector('.fa-play').classList.add('inactive')
	document.querySelector('.fa-pause').classList.remove('inactive')
}

function playBtnActive() {
	document.querySelector('.fa-play').classList.remove('inactive')
	document.querySelector('.fa-pause').classList.add('inactive')
}