const urlContactForm = 'http://localhost:1968/contact/';
// const urlContactForm = 'https://masterdirect.herokuapp.com/contact/';

const preferredStorage = localStorage;
let userInfo = { username: '', email: '', phone: '', address: '' };

document.addEventListener('DOMContentLoaded', () => {
  initUserInfo();
});

function saveUserInfo() {
  if (typeof Storage !== 'undefined')
    preferredStorage.setItem('userInfo', JSON.stringify(userInfo));
}
function getUserInfo() {
  if (typeof Storage !== 'undefined') return JSON.parse(preferredStorage.getItem('userInfo'));
  return null;
}

function initUserInfo() {
  userInfo = getUserInfo() || {};
  [...document.querySelectorAll('.user-info-username')].map(el => {
    el.value = userInfo.username || '';
    el.autocomplete = 'name';
  });
  [...document.querySelectorAll('.user-info-email')].map(el => {
    el.value = userInfo.email || '';
    el.autocomplete = 'email';
  });
  [...document.querySelectorAll('.user-info-phone')].map(el => {
    el.value = userInfo.phone || '';
    el.autocomplete = 'phone';
  });
  [...document.querySelectorAll('.user-info-address')].map(el => {
    el.value = userInfo.address || '';
    el.autocomplete = 'street-address';
  });
  [...document.querySelectorAll('.user-info-installer')].map(el => {
    el.style.display = userInfo.installer ? 'block' : 'none';
  });
}

[...document.querySelectorAll('.user-info-username')].map(element =>
  element.addEventListener('input', e => {
    [...document.querySelectorAll('.user-info-username')].map(el => {
      el.value = e.target.value;
    });
    userInfo.username = e.target.value;
    saveUserInfo();
  })
);
[...document.querySelectorAll('.user-info-email')].map(element =>
  element.addEventListener('input', e => {
    [...document.querySelectorAll('.user-info-email')].map(el => {
      el.value = e.target.value;
    });
    userInfo.email = e.target.value;
    saveUserInfo();
  })
);
[...document.querySelectorAll('.user-info-phone')].map(element =>
  element.addEventListener('input', e => {
    [...document.querySelectorAll('.user-info-phone')].map(el => {
      el.value = e.target.value;
    });
    userInfo.phone = e.target.value;
    saveUserInfo();
  })
);
[...document.querySelectorAll('.user-info-address')].map(element =>
  element.addEventListener('input', e => {
    [...document.querySelectorAll('.user-info-address')].map(el => {
      el.value = e.target.value;
    });
    userInfo.address = e.target.value;
    saveUserInfo();
  })
);
[...document.querySelectorAll('.installer-checkbox-wrapper')].map(element =>
  element.addEventListener('click', e => {
    const prevDisplay = document.querySelector('.user-info-installer').style.display;
    [...document.querySelectorAll('.user-info-installer')].map(el => {
      el.style.display = prevDisplay !== 'block' ? 'block' : 'none';
    });
    userInfo.installer = prevDisplay !== 'block';
    saveUserInfo();
  })
);

/* CONTACT FORM */
document.querySelector('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const validationResult = validateContactForm();
  if (!validationResult.valid) return handleInvalidContactForm(validationResult.msg);

  sendContactForm();
});

function validateContactForm() {
  if (!userInfo.username) return { valid: false, msg: 'Απαιτείται ονοματεπώνυμο' };
  if (!isEmail(userInfo.email)) return { valid: false, msg: 'Απαιτείται έγκυρο email' };
  if (isNaN(userInfo.phone) || userInfo.phone.length != 10)
    return { valid: false, msg: 'Απαιτείται έγκυρος αριθμός τηλεφώνου (10ψηφία)' };
  if (!userInfo.address) return { valid: false, msg: 'Απαιτείται περιοχή / διεύθυνση' };
  if (!document.querySelector('#contactMsg').value)
    return { valid: false, msg: 'Παρακαλούμε γράψτε πρώτα το μήνυμα σας' };
  if (!hasUserInfo()) return { valid: false, msg: 'Συμπληρώστε πρώτα τα προσωπικά σας στοιχεία' };
  return { valid: true };
}

function isEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function hasUserInfo() {
  const ret = getUserInfo();

  if (!ret || !ret.username || !ret.email || !ret.phone) return false;
  else return true;
}

function handleInvalidContactForm(msg) {
  const formErrorEl = document.querySelector('#contactFormError');
  formErrorEl.style.display = 'block';
  formErrorEl.textContent = msg;
  setTimeout(() => (formErrorEl.style.display = 'none'), 3000);
}

function sendContactForm() {
  const data = {
    name: userInfo.username,
    email: userInfo.email,
    phone: userInfo.phone,
    address: userInfo.address,
    isInstaller: !!userInfo.installer,
    contactMsg: document.querySelector('#contactMsg').value,
    contactType: 'Επικοινωνίας'
  };

  document.querySelector('#contactSubmit').value = 'Γίνεται η αποστολή...';
  fetch(urlContactForm, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      if ('status' in data && data.status !== 200) {
        throw new Error();
      }
      document.querySelector('#contactFormError').style.display = 'none';
      document.querySelector('.contact-form-success').style.display = 'flex';
      document.querySelector('#contactSubmit').value = 'Αποστολή';
      document.querySelector('#contactMsg').value = '';
      setTimeout(() => {
        document.querySelector('.contact-form-success').style.display = 'none';
      }, 3000);
    })
    .catch(e => {
      console.error('Error on contact system form :', e);
      handleInvalidContactForm('Υπήρξε πρόβλημα κατά την αποστολή, προσπαθήστε αργότερα');
      document.querySelector('#contactSubmit').value = 'Αποστολή';
    });
}
