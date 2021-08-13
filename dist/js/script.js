//hamburger menu
const toggler = document.querySelector('.toggler-label');
const menu = document.querySelector('.sidebar__navbar');
const dropdownArchitecture = document.querySelector('#dropdown-architecture')


toggler.addEventListener('click', function() {
    menu.classList.toggle('show');
})
//active tabs

let navlinks = document.querySelectorAll('.navbar__link');

navlinks.forEach(link => {
    if (document.location.pathname == '/') {
        navlinks[0].classList.add('active');
    }
    if (document.location.href.indexOf(link.href) == 0) {
       link.classList.add('active')
    }
})

if (document.location.pathname == '/architecture.html'||document.location.pathname == '/order-form.html') {
    dropdownArchitecture.style.display = 'block'
}
