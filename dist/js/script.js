//hamburger menu
const toggler = document.querySelector('.toggler-label');
const menu = document.querySelector('.sidebar__navbar');

toggler.addEventListener('click', function() {
    menu.classList.toggle('show');
})
//active tabs

let navlinks = document.querySelectorAll('.navbar__link');

for (let i = 0; i < navlinks.length;i++) {
    if (document.location.href.indexOf(navlinks[i].href) == 0) {
        navlinks[i].classList.add('active');
        if (i !== 0) {
            navlinks[0].classList.remove('active');
        }

    }
}
