const slider_imgs = document.querySelectorAll('.slider__image');
const btnRight = document.getElementById('btn-right');
const btnLeft = document.getElementById('btn-left');
const btnPlay = document.getElementById('btn-play');
const play__pg = document.querySelector('.play__pg');

var counter = 0;
var selfPlay = true;

var selfPlaying = setInterval(function() {
	changeImage();
}, 3000);


btnLeft.addEventListener('click', function() {
	clearInterval(selfPlaying);
	changeImageBack();
	selfPlay = false;
})

btnRight.addEventListener('click', function() {
	clearInterval(selfPlaying);
	changeImage();
	selfPlay = false;
})

btnPlay.addEventListener('click', function() {
	if (selfPlay == true) {
		clearInterval(selfPlaying);
	} else {
		selfPlaying = setInterval(function() {
			changeImage();
		}, 4000);
	}
	selfPlay = !selfPlay;
})

function changeImage() { //next image
	for (let i = 0;i < slider_imgs.length;i++) {
		slider_imgs[i].style.opacity = '0'
	}
	slider_imgs[counter].style.opacity = '1';
	counter += 1;
	if (counter === slider_imgs.length) {
		counter = 0;
	}

}

function changeImageBack() { //previous image
	for (let i = 0;i<slider_imgs.length;i++) {
		slider_imgs[i].style.opacity = '0'
	}
	slider_imgs[counter].style.opacity = '1';
	counter -= 1;
	if (counter == -1) {
		counter = slider_imgs.length - 1;
	}
}