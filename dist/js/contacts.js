"use strict"

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#form');
    form.addEventListener('submit', formSend);


    async function formSend(e) {
        e.preventDefault();

        //simple form validation
        let error = formValidate(form);

        let formData = new FormData(form); //fetching all the data from the form's fields

        if (error === 0) { //form validation is passed successfully
            form.classList.add('_sending'); //the form becomes unchangeable 
            let response = await fetch('sendmail.php',{
                method: 'POST',
                body: formData
            });
            if (response.ok) { //if we received a response
                let result = await response.json();
                alert(result.message);
                form.reset();  //clearing the fields
                form.classList.remove('_sending');
            } else {
                alert('Error...');
                form.classList.remove('_sending');
            }
        } else {
           alert('Enter required fields') 
        }
    }

    function formValidate(form) {
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

    //email validation
    function emailTest(input) { 
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value); //searching for match between a regular expression and an input value
    }
});
