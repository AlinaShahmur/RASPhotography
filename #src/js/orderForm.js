let btnsPlus = document.querySelectorAll('.btn-plus')
let btnsMinus = document.querySelectorAll('.btn-minus')
let counters = document.querySelectorAll('.rooms-counter')
let rooms = {}

//filling object with keys
for (let i = 0; i < counters.length; i++){
    rooms[counters[i].getAttribute('data-room')] = 0
}
console.log(rooms)

//counters
for (let i = 0; i < counters.length; i++) {
    btnsPlus[i].addEventListener('click', function() {
        let counter = ++counters[i].innerHTML;
        counters[i].innerHTML = counter
        rooms[counters[i].getAttribute('data-room')] = counter
        if (counter > 0) {
            btnsMinus[i].disabled = false
        }
    })
    btnsMinus[i].addEventListener('click', function() {
        if (counters[i].innerHTML != 0) {
            let counter = --counters[i].innerHTML;
            counters[i].innerHTML = counter
            rooms[counters[i].getAttribute('data-room')] = counter
            if (counter === 0){
                this.disabled = true
            }
        } 
    })
}



//form submitting
window.onload = function() {
    let form = document.getElementById('form');
    form.addEventListener('submit', sendOrderForm)

    async function sendOrderForm(e) {
        e.preventDefault()
        let form = document.getElementById('form');
        let error = formValidate();
        let formData = new FormData(form)
        for (let i = 0;i < counters.length; i++) {
            if (rooms[counters[i].getAttribute('data-room')] != 0) {
                formData.append(counters[i].getAttribute('data-room'), rooms[counters[i].getAttribute('data-room')])
            }
        }
        console.log(formData.get('salon'))
        for (let value of formData.values()) {
            console.log(value)
        }
        console.log(formData.get('outdoor'))

        if (error === 0) {
            form.classList.add('__sending')
            let response = await fetch('sendOrderForm.php', {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                let result = await response.json()
                alert(result.message)
                form.reset()
                form.classList.remove('_sending');
            } else {
                alert('Error...');
                form.classList.remove('_sending');
            }
        } else {
            alert('Enter required fields') 
        }
    }

    function formValidate() {
        let error = 0;
        let formReq = document.querySelectorAll('._req'); //required fields in the form
        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);

            if(input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++; 
                }           
            }
        }
        return error;
    }

    function formAddError(input) { 
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input) { 
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value); //searching for match between a regular expression and an input value
    }
}







