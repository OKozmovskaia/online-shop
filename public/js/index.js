// Register new user
const formDataUser = document.querySelector('#formRegister');

formDataUser.addEventListener('submit', function(event) {
  event.preventDefault();

  const formEvent = event.target;
  // get values from formData
  let formData = new FormData(formEvent);
  const plainFormData = Object.fromEntries(formData.entries());
  const dataBody = JSON.stringify(plainFormData);

  console.log(dataBody);

  fetch('/api/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: dataBody
});
});

// Authentication 
const formDataLogin = document.querySelector('#formLogin');

formDataLogin.addEventListener('submit', function(event) {
  event.preventDefault();

  const formEvent = event.target;
  // get values from formData
  let formData = new FormData(formEvent);
  const plainFormData = Object.fromEntries(formData.entries());
  console.log(plainFormData);
  const dataBody = JSON.stringify(plainFormData);

  console.log(dataBody);

  fetch('/api/auth', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: dataBody
});
});