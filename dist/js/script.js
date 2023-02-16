//hamburger menu
const toggler = document.querySelector('.toggler-label');
const menu = document.querySelector('.sidebar__navbar');
const dropdownArchitecture = document.querySelector('#dropdown-architecture')
const dropdownItems = document.querySelectorAll('.dropdown')
const dropdownMenus = document.querySelectorAll('.navbar__dropdown-content')
const dropdownLinks = document.querySelectorAll('.dropdown-link')

toggler.addEventListener('click', function() {
    menu.classList.toggle('show');
})

let navlinks = document.querySelectorAll('.navbar__link');

navlinks.forEach(link => {
    if (document.location.pathname == '/') {
        navlinks[0].classList.add('active');
    }
    dropdownItems.forEach(item => {
        let linksOfDropdown = Array.from(dropdownLinks).filter(dropdownLink => dropdownLink.getAttribute('data-index-dropdown') === item.getAttribute('data-index-dropdown'))
        linksOfDropdown.forEach(link => {
            if (document.location.href == link.href) {
                item.classList.add('active')
            }
        })
    })
    if (document.location.href.indexOf(link.href) == 0) {
       link.classList.add('active')
    }
})


dropdownItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault()
        let menu = Array.from(dropdownMenus).find(menu => menu.getAttribute('data-index-dropdown') === item.getAttribute('data-index-dropdown')) 
        menu.classList.toggle('opened')
    })
})
