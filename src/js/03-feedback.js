import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const saveFormData = () => {
  const formData = new FormData(feedbackForm);
  const savedData = {};
  formData.forEach((value, key) => (savedData[key] = value));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
};

const populateFormData = () => {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    Object.entries(savedData).forEach(([key, value]) => {
      feedbackForm.elements[key].value = value;
    });
  }
};

feedbackForm.addEventListener('input', throttle(saveFormData, 500));

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(feedbackForm);
  let isFormValid = true;
  for (let value of formData.values()) {
    if (!value.trim()) {
      isFormValid = false;
      break;
    }
  }

  if (!isFormValid) {
    alert('Proszę uzupełnić wszystkie pola przed wysłaniem formularza.');
    return;
  }

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
  feedbackForm.reset();
});

document.addEventListener('DOMContentLoaded', populateFormData);
