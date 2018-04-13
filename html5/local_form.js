var formFields = ['fName', 'lName', 'address', 'phone'];

function loadLocalForm() {
  var formData = localStorage.getItem('formData');
  if (formData) {
    formData = JSON.parse(formData);
    formFields.forEach(fieldName => {
      document.getElementsByName(fieldName)[0].value = formData[fieldName];
    });
  }
}

function saveLocalForm() {
  var formData = new FormData(document.getElementById('localForm'))

  var formData = {
    fName: document.getElementsByName('fName')[0].value,
    lName: document.getElementsByName('lName')[0].value,
    address: document.getElementsByName('address')[0].value,
    phone: document.getElementsByName('phone')[0].value,
  }
  localStorage.setItem('formData', JSON.stringify(formData));
}

loadLocalForm();