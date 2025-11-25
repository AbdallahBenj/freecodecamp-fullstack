console.log('Customer Complaint Form');

const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const orderNo = document.getElementById('order-no');
const productCode = document.getElementById('product-code');
const quantity = document.getElementById('quantity');

// #complaints-group inputs
const complaintsGroup = document.getElementById('complaints-group');
const complaintsGroupInputs = document.querySelectorAll(
  '#complaints-group input',
);

// #complaint-description
const complaintOther = document.getElementById('other-complaint');
const complaintDescription = document.getElementById('complaint-description');
complaintDescription.style.display = 'none';

// #solutions-group inputs
const solutionsGroup = document.getElementById('solutions-group');
const solutionsGroupInputs = document.querySelectorAll(
  '#solutions-group input',
);

// #solution-description
const solutionOther = document.getElementById('other-solution');
const solutionDescription = document.getElementById('solution-description');
solutionDescription.style.display = 'none';

let objectStatus = {
  'full-name': false,
  email: false,
  'order-no': false,
  'product-code': false,
  quantity: false,
  'complaints-group': false,
  'complaint-description': true,
  'solutions-group': false,
  'solution-description': true,
};

// #full-name validity
function fullNameIsValid() {
  fullName.setCustomValidity('');

  if (fullName.value.trim() === '') {
    fullName.setCustomValidity('Please Enter a Full Name');
    objectStatus['full-name'] = false;
  } else if (!fullName.checkValidity()) {
    fullName.setCustomValidity('Your name is not valid');
    objectStatus['full-name'] = false;
  } else {
    objectStatus['full-name'] = true;
  }

  console.log('objectStatus["full-name"]: ', objectStatus['full-name']);
  return objectStatus['full-name'];
}

// #email validity
function emailIsValid() {
  email.setCustomValidity('');

  if (email.value.trim() === '') {
    email.setCustomValidity('Please enter an email');
    objectStatus['email'] = false;
  } else if (!email.checkValidity()) {
    email.setCustomValidity('Your email is not valid');
    objectStatus['email'] = false;
  } else {
    objectStatus['email'] = true;
  }

  console.log('objectStatus["email"]: ', objectStatus['email']);
  return objectStatus['email'];
}

// #order-no validity
function orderNoIsValid() {
  const orderNoRegex = /^2024.{6}$/;
  const orderNoStr = orderNo.value.trim();

  orderNo.setCustomValidity('');

  if (orderNoStr === '') {
    orderNo.setCustomValidity('Please enter order no');
    objectStatus['order-no'] = false;
  } else if (!orderNoRegex.test(orderNoStr)) {
    orderNo.setCustomValidity('Your order no is not valid');
    objectStatus['order-no'] = false;
  } else {
    objectStatus['order-no'] = true;
  }

  console.log('objectStatus[order-no"]: ', objectStatus['order-no']);
  return objectStatus['order-no'];
}

// #product-code Validity
function productCodeIsValid() {
  const productCodeRegex = /^[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d$/;
  const productCodeStr = productCode.value.trim();

  productCode.setCustomValidity('');

  if (productCodeStr === '') {
    productCode.setCustomValidity('Please enter product code');
    objectStatus['product-code'] = false;
  } else if (!productCodeRegex.test(productCodeStr)) {
    productCode.setCustomValidity('Your product code is not valid');
    objectStatus['product-code'] = false;
  } else {
    objectStatus['product-code'] = true;
  }

  console.log('objectStatus["product-code"]: ', objectStatus['product-code']);
  return objectStatus['product-code'];
}

// #quantity validity
function quantityIsValid() {
  quantity.setCustomValidity('');

  if (quantity.value.trim() === '') {
    quantity.setCustomValidity('Please enter quantity');
    objectStatus['quantity'] = false;
  } else if (!quantity.checkValidity()) {
    quantity.setCustomValidity('Your quantity is not valid');
    objectStatus['quantity'] = false;
  } else {
    objectStatus['quantity'] = true;
  }

  console.log('objectStatus["quantity"]: ', objectStatus['quantity']);
  return objectStatus['quantity'];
}

// Complain Validity
function complaintIsValid() {
  const checkedComplaint = Array.from(complaintsGroupInputs).some((el) => {
    return el.checked;
  });

  complaintsGroupInputs[0].setCustomValidity('');
  complaintDescription.setCustomValidity('');

  if (!checkedComplaint) {
    complaintsGroupInputs[0].setCustomValidity('Please select an option');
    // complaintsGroup.setCustomValidity('Please check option');
    objectStatus['complaints-group'] = false;
  } else {
    complaintsGroupInputs[0].setCustomValidity('');
    objectStatus['complaints-group'] = true;
  }

  console.log(
    'objectStatus["complaints-group"]: ',
    objectStatus['complaints-group'],
  );
  console.log(
    'objectStatus["complaint-description"]: ',
    objectStatus['complaint-description'],
  );
  return objectStatus['complaints-group'];
}

// Complain Description Validity
function complaintDescriptionIsValid() {
  complaintDescription.setCustomValidity('');

  if (complaintOther.checked) {
    complaintDescription.style.display = 'block';
    complaintDescription.setCustomValidity('');
    const descriptionValue = complaintDescription.value.trim();

    if (descriptionValue === '') {
      complaintDescription.setCustomValidity('Please enter Description');
      objectStatus['complaint-description'] = false;
    } else if (descriptionValue.length < 20) {
      complaintDescription.setCustomValidity(
        'Please enter more than 20 characters in the description',
      );
      objectStatus['complaint-description'] = false;
    } else {
      complaintDescription.setCustomValidity('');
      objectStatus['complaint-description'] = true;
    }
  } else {
    complaintDescription.style.display = 'none';
    complaintDescription.setCustomValidity('');
    objectStatus['complaint-description'] = true;
  }

  console.log(
    'objectStatus["complaints-group"]: ',
    objectStatus['complaints-group'],
  );
  console.log(
    'objectStatus["complaint-description"]: ',
    objectStatus['complaint-description'],
  );
  return objectStatus['complaint-description'];
}

// Solution Validity
function solutionIsValid() {
  const checkedSolutions = Array.from(solutionsGroupInputs).some((el) => {
    return el.checked;
  });

  solutionsGroupInputs[0].setCustomValidity('');
  solutionDescription.setCustomValidity('');

  if (!checkedSolutions) {
    solutionsGroupInputs[0].setCustomValidity('Please choose an option');
    objectStatus['solutions-group'] = false;
  } else {
    solutionsGroupInputs[0].setCustomValidity('');
    objectStatus['solutions-group'] = true;
  }

  console.log(
    'objectStatus["solutions-group"]: ',
    objectStatus['solutions-group'],
  );
  console.log(
    'objectStatus["solution-description"]: ',
    objectStatus['solution-description'],
  );
  return objectStatus['solutions-group'];
}

// Solution Description Validity
function solutionDescriptionIsValid() {
  solutionDescription.setCustomValidity('');

  if (solutionOther.checked) {
    solutionDescription.style.display = 'block';
    solutionDescription.setCustomValidity('');
    const solutionDesValue = solutionDescription.value.trim();

    if (solutionDesValue === '') {
      solutionDescription.setCustomValidity('Please Enter Others Description');
      objectStatus['solution-description'] = false;
    } else if (solutionDesValue.length < 20) {
      solutionDescription.setCustomValidity(
        'Please enter more than 20 characters in the description',
      );
      objectStatus['solution-description'] = false;
    } else {
      solutionDescription.setCustomValidity('');
      objectStatus['solution-description'] = true;
    }
  } else {
    solutionDescription.style.display = 'none';
    solutionDescription.setCustomValidity('');
    objectStatus['solution-description'] = true;
  }

  console.log(
    'objectStatus["solutions-group"]: ',
    objectStatus['solutions-group'],
  );
  console.log(
    'objectStatus["solution-description"]: ',
    objectStatus['solution-description'],
  );
  return objectStatus['solution-description'];
}

// change Event Function
function changeEventFunction(input, functionInputValid) {
  input.addEventListener('change', () => {
    input.style.borderColor = functionInputValid() ? 'green' : 'red';
    input.reportValidity();
  });
}

// change Event Function for other checkbox
function otherEventFunction(input, otherDescription, functionInputValid) {
  input.addEventListener('change', () => {
    otherDescription.style.borderColor = functionInputValid() ? 'green' : 'red';
    otherDescription.reportValidity();
  });
}

// Function validateForm

function validateForm() {
  fullNameIsValid();
  emailIsValid();
  orderNoIsValid();
  productCodeIsValid();
  quantityIsValid();
  complaintIsValid();
  complaintDescriptionIsValid();
  solutionIsValid();
  solutionDescriptionIsValid();

  changeEventFunction(fullName, fullNameIsValid);
  changeEventFunction(email, emailIsValid);
  changeEventFunction(orderNo, orderNoIsValid);
  changeEventFunction(productCode, productCodeIsValid);
  changeEventFunction(quantity, quantityIsValid);
  changeEventFunction(complaintsGroup, complaintIsValid);
  changeEventFunction(complaintDescription, complaintDescriptionIsValid);
  otherEventFunction(
    complaintsGroup,
    complaintDescription,
    complaintDescriptionIsValid,
  );

  changeEventFunction(solutionsGroup, solutionIsValid);
  changeEventFunction(solutionDescription, solutionDescriptionIsValid);
  otherEventFunction(
    solutionsGroup,
    solutionDescription,
    solutionDescriptionIsValid,
  );

  return objectStatus;
}

validateForm();

function isValid(param) {
  validateForm();
  const arrayValues = Object.values(param);
  const objectStatusIsValid = arrayValues.every((el) => el === true);

  return objectStatusIsValid;
}

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const valid = isValid(objectStatus);
  if (valid) {
    console.log('✅ Form submitted successfully!');
    // Here you can perform the actual submission if you want:
    // form.submit(); or submit via AJAX
  }
  if (!valid) {
    const firstInvalid = document.querySelector(':invalid');
    if (firstInvalid)
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    console.log('❌ Form has errors. Please correct them.');
  }
});
