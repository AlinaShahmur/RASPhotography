let counter;
let images = document.querySelectorAll('.img-gallery img')

function customSlider(classes, parent = document.body) {
    this.classes = classes;
    this.parent = parent
    this.init = function() {
        let element = document.createElement('div');
        this.classes.forEach(item => {
            element.classList.add(item);
        })      
        this.parent.appendChild(element);
        return element
    }
}
function customBtn(content, id, clickHandler,parent = document.body) {
    this.content = content,
    this.id = id;
    this.clickHandler = clickHandler
    this.parent = parent
    this.init = function() {
        let element = document.createElement('button')
        this.parent.appendChild(element)
        element.classList.add('btn-slider');
        element.setAttribute('id', this.id)
        element.setAttribute('aria-label', this.id)
        element.innerHTML = this.content;
        element.addEventListener('click', this.clickHandler)
        return element
    }
}

let sliderClasses = ['my-custom-slider', 'inactive']
let slider = new customSlider(sliderClasses).init()

let btnRight = new customBtn('<i class="fas fa-arrow-right"></i>','btn-right', rightClickHandler,slider).init()
let btnLeft= new customBtn('<i class="fas fa-arrow-left"></i>','btn-left', leftClickHandler,slider).init()
let btnClose = new customBtn('<i class="fas fa-times"></i>','btn-close',closeClickHandler,slider).init()

Array.from(images).forEach(elem => {
    let image = document.createElement('img')
    image.setAttribute('src',elem.src)
    image.setAttribute('alt','slider-image')
    slider.appendChild(image);
})

let imagesSlider = document.querySelectorAll('.my-custom-slider img')

for(let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function(e) {
        console.log('clicked', e.target)
        e.stopPropagation();
        counter = i;
        slider.classList.remove('inactive')
        imageInit()
    })
}

document.body.addEventListener('click', clickOutsideHandler)

function rightClickHandler() {
    counter++
    if (counter === imagesSlider.length) {
        counter = 0;
    }
    imageInit()
}

function leftClickHandler() {
    counter--
    if (counter === -1) {
        counter = imagesSlider.length - 1;
    }
    imageInit()
}

function closeClickHandler() {
    slider.classList.add('inactive');
}

function imageInit() {
    for (let i = 0; i < imagesSlider.length; i++) {
        imagesSlider[i].style.opacity = '0';
    }
    imagesSlider[counter].style.opacity = '1';
}

function clickOutsideHandler(e) {
    if (e.target !== document.querySelector('.my-custom-slider') && !e.target.closest('.btn-slider') && Array.from(!imagesSlider).some(image => e.target == image) ){
        slider.classList.add('inactive')
    } 
}





