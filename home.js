let serverUrl = 'https://masterdirect.herokuapp.com/';
// let serverUrl = 'http://localhost:1968/';

const baseUrl = location.origin;
const mapUrl = '/stores';
const urlYears = serverUrl + 'vehicleDB/get/years';
const urlModels = serverUrl + 'vehicleDB/get/models';
const urlEngineCodes = serverUrl + 'vehicleDB/get/descriptions';
const urlFuelPrices = serverUrl + 'fuelPrices';
let downloadSummaryUrl = serverUrl + 'summaries/download/system';
// const downloadSummaryUrl = 'http://localhost:1917/summaries/download/system';
let emailSummaryUrl = serverUrl + 'summaries/email/system';
// const emailSummaryUrl = 'http://localhost:1917/summaries/email/system';
const mapBaseUrl = baseUrl + mapUrl;
const numPlaceUrl = serverUrl + 'map/pins/numPlace';
const closestUrl = serverUrl + 'map/pins/closest';
const urlContactForm = serverUrl + 'contact/';
const easyPayFileUploaderUrl = serverUrl + 'summaries/easyPay';
const urlNotConvForm = serverUrl + 'notConvertible';

const makeImgPrefix = 'https://uploads-ssl.webflow.com/60362f40a83dcf0034eb880b/';
const makeImgDict = {
  'ALFA ROMEO': '6077f1d502c7ef4d03ff154b_Alfa_Romeo.png',
  AUDI: '6077f607b580721ba1274496_Audi.png',
  BMW: '6077f607325eb960af680a4e_BMW.png',
  CADILLAC: '61b8fd8721dd7f462b25e630_Cadillac.png',
  CHEVROLET: '6077f60729203574193c205c_Chevrolet.png',
  CHRYSLER: '6077f6077735848685f48c4d_Chrysler.png',
  CITROEN: '6077f607703f5581b7a6b6e9_Citroen.png',
  DACIA: '6077f607ac4c2566782969fa_Dacia.png',
  DAEWOO: '6077f6096e3ae999700f15ad_Daewoo.png',
  DAIHATSU: '6077f6095e0f21739e801c4d_Daihatsu.png',
  DODGE: '6077f60929203581043c205d_Dodge.png',
  FIAT: '6077f609aecccf25fc3868f0_Fiat.png',
  FORD: '6077f609ed355314a4ea8ba7_Ford.png',
  HONDA: '6077f6094bacedfa12748b66_Honda.png',
  HUMMER: '6077f609325eb912c5680a51_Hummer.png',
  HYUNDAI: '6077f60969316192201b5e9a_Hyundai.png',
  JAGUAR: '6077f609703f555667a6b6eb_Jaguar.png',
  JEEP: '6077f6099881859ece0dc158_Jeep.png',
  KIA: '6077f609ed35535997ea8ba8_Kia.jpg',
  LADA: '6077f60b7735848bc7f48c50_Lada.png',
  LANCIA: '6077f60b703f55244fa6b6ec_Lancia.png',
  'LAND ROVER': '6077f60baecccf47553868f2_Land_Rover.png',
  LEXUS: '6077f60b02c7ef3588ff4bed_Lexus.png',
  MAZDA: '6077f60bac4c25e840296a07_Mazda.png',
  'MERCEDES-BENZ': '6077f60b2cf4c1fc9aeb4a97_Mercedes-Benz.png',
  MG: '63132f4ce66c6bff8c0bdbba_MG.png',
  MINI: '6077f60dec0785fc99826f63_Mini.png',
  MITSUBISHI: '6077f60df4fa193ad096cf91_Mitsubishi.png',
  NISSAN: '6077f60c3f6057d3245ac3fd_Nissan.png',
  OPEL: '6077f60d8ec314543c0c7030_Opel.png',
  PEUGEOT: '6077f60da5cf01576cad4d60_Peugeot.png',
  PORSCHE: '6077f60dec07850afc826f64_Porsche.png',
  RENAULT: '6077f60e7c02f416a420a7ea_Renault.png',
  ROVER: '6077f60deb33aa3e792d0d74_Rover.png',
  SAAB: '6077f60dde273a2a845dc8c0_Saab.png',
  SEAT: '6077f60e66bedcb79fa5a7ff_Seat.png',
  SKODA: '6077f60e9d13c22e7326344f_Skoda.png',
  SMART: '6077f60dacb311235e2254ff_Smart.png',
  SUBARU: '6077f60f51e2742da00ac18a_Subaru.png',
  SUZUKI: '6077f60f1fb9c523b6315031_Suzuki.png',
  TOYOTA: '6077f60f163ba8861a8a41ee_Toyota.png',
  VOLVO: '6077f60f6931617b461b5e9e_Volvo.png',
  VW: '6077f60f66bedc404ea5a800_VW.png'
};

const SystemDict = {
  systems: {
    SR: 'SR',
    AR: 'AR',
    PIEZO_BMW: 'PIEZO BMW',
    PIEZO_MERCEDES: 'PIEZO MERCEDES',
    SR_ALFA_ROMEO: 'SR ALFA ROMEO'
  }
};

let fetchedYears;
let fetchedModels;
let fetchedModelObj;
let foundVehicleObj;

let customDropdowns;
let selectedMake, selectedYear, selectedModel, selectedEngine;

const makeDropdown = document.querySelector('#makeDropdown');
const yearDropdown = document.querySelector('#yearDropdown');
const modelDropdown = document.querySelector('#modelDropdown');
const engineDropdown = document.querySelector('#engineDropdown');

const filesGalleryFullScreenContainer = document.querySelector('.files-gallery');
let galleryMainFileSelectedIndex = 0;

let makeDropdownLis, yearDropdownLis, modelDropdownLis, engineDropdownLis;

const suggestedContainers = document.querySelectorAll('.suggested-container');
let activeContainer;

const files = [
  {
    size: 338794,
    name: 'samples/people/smiling-man',
    url: 'https://res.cloudinary.com/master-direct/image/upload/v1685777100/samples/people/smiling-man.jpg',
    fileType: 'image',
    duration: null
  },
  {
    size: 581238,
    name: 'samples/people/boy-snow-hoodie',
    url: 'https://res.cloudinary.com/master-direct/image/upload/v1685777103/samples/people/boy-snow-hoodie.jpg',
    fileType: 'image',
    duration: null
  },
  {
    duration: null,
    fileType: 'image',
    name: '1_sbseyz',
    size: 122590,
    url: 'https://res.cloudinary.com/master-direct/image/upload/v1685778209/1_sbseyz.jpg'
  },
  {
    size: 695548,
    name: 'samples/people/jazz',
    url: 'https://res.cloudinary.com/master-direct/image/upload/v1685777103/samples/people/jazz.jpg',
    fileType: 'image',
    duration: null
  },
  {
    size: 1130015,
    name: 'samples/people/bicycle',
    url: 'https://res.cloudinary.com/master-direct/image/upload/v1685777105/samples/people/bicycle.jpg',
    fileType: 'image',
    duration: null
  },
  {
    size: 1130015,
    name: 'samples/people/bicycle',
    url: 'https://res.cloudinary.com/master-direct/image/upload/v1685777105/samples/people/bicycle.jpg',
    fileType: 'image',
    duration: null
  },
  {
    size: 1130015,
    name: 'samples/people/bicycle',
    url: 'https://res.cloudinary.com/master-direct/image/upload/v1685777105/samples/people/bicycle.jpg',
    fileType: 'image',
    duration: null
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initCustomDropdowns();
  initCardFiles();
  initGalleryFiles();
});

function initCardFiles() {
  const cardMainFileContainers = [...document.querySelectorAll('.main-file')];
  cardMainFileContainers.forEach(c =>
    c.addEventListener('click', () => {
      openGallery();
    })
  );

  const cardMainFiles = [...document.querySelectorAll('.main-file .lightbox-image')];
  cardMainFiles.forEach(cardMainFile => {
    cardMainFile.removeAttribute('srcset');
    cardMainFile.removeAttribute('sizes');
  });

  suggestedContainers.forEach(container => {
    const cardSideFileContainers = [...container.querySelectorAll('.side-file')];
    cardSideFileContainers.forEach((file, index) =>
      file.addEventListener('click', () => {
        openGallery(index + 1);
      })
    );
  });

  const cardSideFiles = [...document.querySelectorAll('.side-file .lightbox-image')];
  cardSideFiles.forEach(file => {
    file.removeAttribute('srcset');
    file.removeAttribute('sizes');
  });
}

function initGalleryFiles() {
  document.querySelector('.gallery-wrap').addEventListener('click', () => {
    closeGallery();
  });
  document.querySelector('.close-gallery').addEventListener('click', () => {
    closeGallery();
  });

  const galleryMainImage = document.querySelector('.gallery-main-image');
  galleryMainImage.removeAttribute('srcset');
  galleryMainImage.removeAttribute('sizes');
  galleryMainImage.addEventListener('click', e => e.stopPropagation());

  const galleryFilesContainer = document.querySelector('.gallery-files-container');
  galleryFilesContainer.addEventListener('click', e => e.stopPropagation());

  const gallerySideFiles = [...document.querySelectorAll('.gallery-side-file img')];
  gallerySideFiles.forEach(file => {
    file.removeAttribute('srcset');
    file.removeAttribute('sizes');
  });

  const gallerySideFileContainers = [...document.querySelectorAll('.gallery-side-file')];

  gallerySideFileContainers.forEach((sideFile, index) => {
    sideFile.addEventListener('click', () => {
      selectMainGalleryFile(index);
    });
  });

  document.querySelector('.left-file-container').addEventListener('click', e => {
    e.stopPropagation();
    selectMainGalleryFile(galleryMainFileSelectedIndex - 1);
  });

  document.querySelector('.right-file-container').addEventListener('click', e => {
    e.stopPropagation();
    selectMainGalleryFile(galleryMainFileSelectedIndex + 1);
  });

  filesGalleryFullScreenContainer.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeGallery();
    }
    if (e.key === 'ArrowLeft') {
      selectMainGalleryFile(galleryMainFileSelectedIndex - 1);
    }
    if (e.key === 'ArrowRight') {
      selectMainGalleryFile(galleryMainFileSelectedIndex + 1);
    }
  });
}

function openGallery(selectedIndex = 0) {
  filesGalleryFullScreenContainer.style.display = 'block';
  filesGalleryFullScreenContainer.focus();
  document.querySelector('body').style.overflow = 'hidden';
  selectMainGalleryFile(selectedIndex);
}

function closeGallery() {
  filesGalleryFullScreenContainer.style.display = 'none';
  document.querySelector('body').style.overflow = 'auto';
  const galleryMainVideo = document.querySelector('.gallery-main-video video');
  galleryMainVideo.pause();
}

function selectMainGalleryFile(index) {
  if (index >= foundVehicleObj.files.length) {
    index = 0;
  }
  if (index < 0) {
    index = foundVehicleObj.files.length - 1;
  }

  const fileType = foundVehicleObj.files[index].fileType;
  galleryMainFileSelectedIndex = index;

  const galleryMainImage = document.querySelector('.gallery-main-image');
  const galleryMainVideoEmbed = document.querySelector('.gallery-main-video');
  const galleryMainVideo = document.querySelector('.gallery-main-video video');

  galleryMainVideo.pause(); //pause prev if there

  if (fileType === 'video') {
    galleryMainImage.style.display = 'none';
    galleryMainVideo.src = foundVehicleObj.files[index].url;
    galleryMainVideo.controls = true;
    galleryMainVideo.style.display = 'block';

    if (filesGalleryFullScreenContainer.style.display === 'block') {
      galleryMainVideo.play(); //only if gallery is open
    }
    galleryMainVideoEmbed.style.display = 'block';
  } else {
    galleryMainVideo.style.display = 'none';
    galleryMainVideoEmbed.style.display = 'none';
    galleryMainImage.src = foundVehicleObj.files[index].url;
    galleryMainImage.alt = foundVehicleObj.files[index].name;
    galleryMainImage.style.display = 'block';
  }

  const gallerySideFileContainers = [...document.querySelectorAll('.gallery-side-file')];
  gallerySideFileContainers.forEach((container, containerIndex) => {
    if (index === containerIndex) {
      container.classList.add('selected');
    } else {
      container.classList.remove('selected');
    }
  });
}

function getActiveContainer() {
  return [...suggestedContainers].filter(
    container => container.style.display !== 'none' && container.style.display
  )[0];
}

function hideSuggestedContainers() {
  suggestedContainers.forEach(c => (c.style.display = 'none'));
  document.querySelector('#carResultContainer').style.display = 'none';
}

function initCustomDropdowns() {
  customDropdowns = [...document.querySelectorAll('.custom-dropdown')];

  initCustomDropdown({ dropdownId: 'makeDropdown', placeholderStr: 'ΜΑΡΚΑ' });
  initCustomDropdown({ dropdownId: 'yearDropdown', placeholderStr: 'ΧΡΟΝΟΛΟΓΙΑ' });
  initCustomDropdown({ dropdownId: 'modelDropdown', placeholderStr: 'ΜΟΝΤΕΛΟ' });
  initCustomDropdown({ dropdownId: 'engineDropdown', placeholderStr: 'ΚΙΝΗΤΗΡΑ' });
}

function initCustomDropdown({ dropdownId, placeholderStr }) {
  const customDropdown = document.getElementById(dropdownId);
  const inputField = customDropdown.querySelector('.chosen-value');
  const inputImg = customDropdown.querySelector('.input-container .img-arrow');

  const dropdown = customDropdown.querySelector('.value-list');
  let dropdownArray = [...dropdown.querySelectorAll('li')];

  if (dropdownId === 'makeDropdown') {
    makeDropdownLis = dropdownArray;
  }

  let valueArray = [];
  dropdownArray.forEach(item => {
    valueArray.push(item.textContent);
  });

  resetDropdowns(['year', 'model', 'engine']);

  // const _closeDropdown = () => {
  //   dropdown.classList.remove('open');
  //   inputImg.style.transform = 'rotate(0deg)';
  // };

  const _openDropdown = () => {
    dropdown.classList.add('open');
    inputImg.style.transform = 'rotate(180deg)';
    dropdown.scrollTop = 0;
    dropdownArray.forEach(dropdown => {
      dropdown.classList.remove('closed');
    });
  };

  const _isDropdownOpen = () => dropdown.classList.contains('open');

  inputField.addEventListener('input', () => {
    _openDropdown();

    if (dropdownId === 'makeDropdown') {
      dropdownArray = makeDropdownLis;
    } else if (dropdownId === 'yearDropdown') {
      dropdownArray = yearDropdownLis;
    } else if (dropdownId === 'modelDropdown') {
      dropdownArray = modelDropdownLis;
    } else if (dropdownId === 'engineDropdown') {
      dropdownArray = engineDropdownLis;
    }

    let inputValue = inputField.value.toLowerCase();

    if (inputValue.length > 0) {
      let inputWords = inputValue.split(' ').filter(w => w.length > 0);

      // console.log('SEARCH: dropdownArray', dropdownArray, inputWords);
      // console.log('S: makeLis', makeDropdownLis);
      // console.log('SEH: yearLis', yearDropdownLis);

      const lisToShow = dropdownArray.filter(li =>
        inputWords.some(word =>
          li.textContent.split(' ').some(liWord => liWord.toLowerCase().includes(word))
        )
      );

      // console.log('listToShow', lisToShow);

      dropdownArray.forEach(li => li.classList.add('closed'));
      lisToShow.forEach(li => li.classList.remove('closed'));
    } else {
      for (let i = 0; i < dropdownArray.length; i++) {
        dropdownArray[i].classList.remove('closed');
      }
    }
  });

  dropdownArray.forEach(item => {
    item.addEventListener('mousedown', evt => {
      onDropdownItemClick(dropdownId, item);
    });
  });

  inputField.addEventListener('blur', () => {
    inputField.placeholder = 'ΕΠΙΛΕΞΤΕ ' + placeholderStr;
    const prevSelectedValue = getSelectedValue(customDropdown.id);
    // console.log(prevSelectedValue, inputField.value);
    if (inputField.value && inputField.value !== prevSelectedValue) {
      inputField.value = prevSelectedValue ? prevSelectedValue : '';
    } else if (!inputField.value) {
      if (customDropdown.id === 'makeDropdown') {
        resetDropdowns(['year', 'model', 'engine']);
        selectedMake = undefined;
        removeFadeIn([yearDropdown, modelDropdown, engineDropdown]);
      } else if (customDropdown.id === 'yearDropdown') {
        resetDropdowns(['model', 'engine']);
        selectedYear = undefined;
        removeFadeIn([modelDropdown, engineDropdown]);
      } else if (customDropdown.id === 'modelDropdown') {
        resetDropdowns(['engine']);
        selectedModel = undefined;
        removeFadeIn([engineDropdown]);
      } else if (customDropdown.id === 'egineDropdown') {
        selectedEngine = undefined;
      }
    }
    setTimeout(() => {
      closeDropdown(customDropdown.id);
    }, 100);
  });

  // inputField.addEventListener('mouseover', () => {
  //   // console.log('inputField clicked!');
  //   inputField.placeholder = 'Αναζήτηση...';
  //   if (_isDropdownOpen()) {
  //     // console.log('Dropdown is already open');
  //     inputField.setAttribute('inputmode', 'text');
  //   } else {
  //     // console.log('dropdown was closed before now opening!');
  //     _openDropdown();
  //   }
  // });
  inputField.addEventListener('click', () => {
    // console.log('inputField clicked!');
    inputField.placeholder = 'Αναζήτηση...';
    if (_isDropdownOpen()) {
      // console.log('Dropdown is already open');
      inputField.setAttribute('inputmode', 'text');
    } else {
      // console.log('dropdown was closed before now opening!');
      _openDropdown();
    }
  });

  // inputImg.addEventListener('mouseover', () => {
  //   _openDropdown();
  // });
  inputImg.addEventListener('click', () => {
    _openDropdown();
  });
}

function onDropdownItemClick(dropdownId, item) {
  const inputField = document.querySelector(`#${dropdownId} .chosen-value`);
  inputField.value = item.textContent;

  // console.log('inputField.value', inputField.value);
  dropdownValueSelected(inputField.value, dropdownId);
}

function getSelectedValue(dbId) {
  if (dbId === 'makeDropdown') {
    return selectedMake;
  } else if (dbId === 'yearDropdown') {
    return selectedYear;
  } else if (dbId === 'modelDropdown') {
    return selectedModel;
  } else if (dbId === 'engineDropdown') {
    return selectedEngine;
  }
}

function resetDropdowns(dropdownArray) {
  dropdownArray.forEach(db => {
    let dbId = db + 'Dropdown';

    disableDropdown(db);
    closeDropdown(dbId);

    const inputField = document.querySelector(`#${dbId} .chosen-value`);
    if (dbId === 'makeDropdown') {
      inputField.placeholder = 'ΕΠΙΛΕΞΤΕ ΜΑΡΚΑ';
      selectedMake = null;
    } else if (dbId === 'yearDropdown') {
      inputField.placeholder = 'ΧΡΟΝΟΛΟΓΙΑ';
      selectedYear = null;
      // if (fadeOut) {
      //   removeFadeIn(yearDropdown);
      // }
    } else if (dbId === 'modelDropdown') {
      inputField.placeholder = 'ΜΟΝΤΕΛΟ';
      selectedModel = null;
      // if (fadeOut) {
      //   removeFadeIn(modelDropdown);
      // }
    } else if (dbId === 'engineDropdown') {
      inputField.placeholder = 'ΚΙΝΗΤΗΡΑΣ';
      selectedEngine = null;
      // if (fadeOut) {
      //   removeFadeIn(engineDropdown);
      // }
    }
    inputField.value = '';

    const valueList = document.querySelector(`#${dbId} .value-list`);
    valueList.innerHTML = '';
  });
  hideSuggestedContainers();
}

function enableDropdown(db) {
  const dbId = db + 'Dropdown';
  const inputField = document.querySelector(`#${dbId} .chosen-value`);
  inputField.removeAttribute('disabled');
}
function disableDropdown(db) {
  const dbId = db + 'Dropdown';
  const inputField = document.querySelector(`#${dbId} .chosen-value`);
  inputField.setAttribute('disabled', '');
}
function closeDropdown(dbId) {
  const valueList = document.querySelector(`#${dbId} .value-list`);
  valueList.classList.remove('open');
  const inputImg = document.querySelector(`#${dbId} .input-container .img-arrow`);
  inputImg.style.transform = 'rotate(0deg)';
  // if (isMobile()) {
  document.querySelector(`#${dbId} .chosen-value`).setAttribute('inputmode', 'none');
  // }
}

function closeDropdowns() {
  customDropdowns.forEach(db => {
    closeDropdown(db.id);
  });
}

function dropdownValueSelected(value, dbId) {
  document.querySelector(`#${dbId} .chosen-value`).setAttribute('inputmode', 'none');
  if (dbId === 'makeDropdown') {
    selectedMake = value === 'VOLKSWAGEN' ? 'VW' : value;
    // console.log('make on change', selectedMake);
    makeOnChange(selectedMake);
  } else if (dbId === 'yearDropdown') {
    selectedYear = value;
    // console.log('year on change', selectedYear);
    yearOnChange(selectedYear);
  } else if (dbId === 'modelDropdown') {
    selectedModel = value;
    // console.log('model on change', selectedModel);
    modelOnChange(selectedModel);
  } else if (dbId === 'engineDropdown') {
    let words = value.split(' ');
    words.pop();
    selectedEngine = words.join(' ');
    // console.log('engine on change', selectedEngine);
    engineOnChange(selectedEngine);
  }
}

function makeOnChange(value) {
  resetDropdowns(['year', 'model', 'engine']);
  removeFadeIn([yearDropdown, modelDropdown, engineDropdown]);
  // suggestedContainers.forEach(container => {
  //   container.style.display = 'none';
  // });
  // showGuarantee(false);
  // resetCalc();
  // resetEasyPay();
  // step2Triggered = false;
  // calcResult(false);
  // updateBasketSection({ resetNoVehicle: true });
  // resetProgressSteps();
  // togglePulse('.car-pulse', false);
  // resetNotConvForm();

  // userSelections.vehicle = {};
  // delete userSelections.calculator.driveOftenIndex;
  // userSelections.easyPay = {};
  // saveUserSelections();

  if (!value) {
    // resetDropdowns(['year']);
    // togglePulse('.car-pulse', true);
    // togglePulse('.summary-pulse', false);
    return;
  }
  if (value === 'VOLKSWAGEN') value = 'VW';

  const inputField = yearDropdown.querySelector('.chosen-value');
  inputField.placeholder = '';
  startLoadingSelect(inputField);
  enableDropdown('year');
  addFadeIn(yearDropdown);

  let status;
  fetch(urlYears, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ make: value })
  })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(data => {
      if (status !== 200) {
        endLoadingSelect(inputField);
        resetDropdowns(['year']);
        if (data.msg === 'no models') {
          inputField.placeholder = 'Δε βρέθηκαν μοντέλα';
        } else {
          inputField.placeholder = 'Υπήρξε πρόβλημα';
        }
        return;
      }
      fetchedYears = data;
      // sessionStorage.clear(); //reset every time make changes
      // sessionStorage.fetchedYears = JSON.stringify(fetchedYears);

      // console.log('populate year dropdown', fetchedYears);
      populateYearDropdown(fetchedYears);
      inputField.placeholder = 'ΕΠΙΛΕΞΤΕ ΧΡΟΝΟΛΟΓΙΑ';
      endLoadingSelect(inputField);
    })
    .catch(error => {
      endLoadingSelect(inputField);
      resetDropdowns(['year']);
      let errorMsg;
      if (status === 429) errorMsg = 'Πολλές κλήσεις, προσπαθήστε αργότερα....';
      else errorMsg = 'Προσπαθήστε ξανά';
      inputField.placeholder = errorMsg;
      console.error('Error Fetch:', error);
    });
}

function startLoadingSelect(inputField) {
  inputField.classList.add('loading-select');
}
function endLoadingSelect(inputField) {
  inputField.classList.remove('loading-select');
}

function addFadeIn(db) {
  db.classList.add('fade-in-dropdown');
}
function removeFadeIn(db) {
  let dbs = db;
  if (!Array.isArray(db)) {
    dbs = [db];
  }
  dbs.forEach(db => {
    db.classList.remove('fade-in-dropdown');
    // db.classList.add('fade-out-dropdown');
  });
}

function populateYearDropdown(fetchedYears) {
  const yearLis = fetchedYears.map(year => `<li class="custom-li"><div>${year}</div></li>`);

  const dropdown = yearDropdown.querySelector('.value-list');
  dropdown.innerHTML = yearLis.join('');

  yearDropdownLis = [...dropdown.querySelectorAll('li')];
  const dropdownArray = yearDropdownLis;
  dropdownArray.forEach(item => {
    item.addEventListener('mousedown', () => {
      onDropdownItemClick('yearDropdown', item);
    });
  });

  //One option -> auto populate
  if (yearDropdownLis.length === 1) {
    // console.log('one option -> auto populate!');
    const inputField = yearDropdown.querySelector('.chosen-value');
    inputField.value = fetchedYears[0];
    dropdownValueSelected(fetchedYears[0], 'yearDropdown');
  }
}

function yearOnChange(value) {
  resetDropdowns(['model', 'engine']);
  removeFadeIn([modelDropdown, engineDropdown]);

  // descriptionSelect.disabled = true;
  // descriptionSelect.innerHTML = '<option>Περιγραφή</option>';
  // suggestedContainers.forEach(container => {
  //   container.style.display = 'none';
  // });
  // showGuarantee(false);
  // resetCalc();
  // resetEasyPay();
  // step2Triggered = false;

  // calcResult(false);
  // updateBasketSection({ resetNoVehicle: true });
  // resetProgressSteps();
  // togglePulse('.summary-pulse', false);
  // resetNotConvForm();

  // userSelections.vehicle = {};
  // delete userSelections.calculator.driveOftenIndex;
  // userSelections.easyPay = {};
  // saveUserSelections();

  if (!value) {
    // resetDropdowns(['model']);
    // modelSelect.disabled = true;
    // modelSelect.innerHTML = '<option value="">Μοντέλο</option>';
    // descriptionSelect.innerHTML = '<option value="">ΚΙΝΗΤΗΡΑΣ</option>';
    return;
  }

  // modelSelect.disabled = false;
  // modelSelect.innerHTML = '';
  const inputField = modelDropdown.querySelector('.chosen-value');
  inputField.placeholder = ''; //loading select
  startLoadingSelect(inputField);
  enableDropdown('model');
  addFadeIn(modelDropdown);

  let status;
  fetch(urlModels, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ make: selectedMake, year: value })
  })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(data => {
      if (status !== 200) {
        endLoadingSelect(inputField);
        resetDropdowns(['model']);
        if (data.msg === 'no models') {
          inputField.placeholder = 'Δε βρέθηκαν μοντέλα';
        } else {
          inputField.placeholder = 'Υπήρξε πρόβλημα';
        }
        return;
      }
      fetchedModels = data;

      // console.log('populate model dropdown', fetchedModels);
      populateModelDropdown(fetchedModels);
      inputField.placeholder = 'ΕΠΙΛΕΞΤΕ ΜΟΝΤΕΛΟ';
      endLoadingSelect(inputField);
    })
    .catch(error => {
      endLoadingSelect(inputField);
      resetDropdowns(['model']);
      let errorMsg;
      if (status === 429) errorMsg = 'Πολλές κλήσεις, προσπαθήστε αργότερα....';
      else errorMsg = 'Προσπαθήστε ξανά';
      inputField.placeholder = errorMsg;
      console.error('Error Fetch:', error);
    });
}

function populateModelDropdown(fetchedModels) {
  const modelLis = fetchedModels.map(model => `<li class="custom-li"><div>${model}</div></li>`);

  const dropdown = modelDropdown.querySelector('.value-list');
  dropdown.innerHTML = modelLis.join('');

  modelDropdownLis = [...dropdown.querySelectorAll('li')];
  const dropdownArray = modelDropdownLis;
  dropdownArray.forEach(item => {
    item.addEventListener('mousedown', () => {
      onDropdownItemClick('modelDropdown', item);
    });
  });

  //One option -> auto populate
  if (modelDropdownLis.length === 1) {
    // console.log('one option -> auto populate!');
    const inputField = modelDropdown.querySelector('.chosen-value');
    inputField.value = fetchedModels[0];
    dropdownValueSelected(fetchedModels[0], 'modelDropdown');
  }
}
function modelOnChange(value) {
  resetDropdowns(['engine']);
  removeFadeIn([engineDropdown]);
  // suggestedContainers.forEach(container => {
  //   container.style.display = 'none';
  // });
  // showGuarantee(false);
  // resetCalc();
  // resetEasyPay();
  // step2Triggered = false;

  // calcResult(false);
  // updateBasketSection({ resetNoVehicle: true });
  // resetProgressSteps();
  // togglePulse('.summary-pulse', false);
  // resetNotConvForm();

  // userSelections.vehicle = {};
  // delete userSelections.calculator.driveOftenIndex;
  // userSelections.easyPay = {};
  // saveUserSelections();

  if (!value) {
    return;
  }
  // sessionStorage.selectedYear = value;

  // descriptionSelect.disabled = false;
  // descriptionSelect.innerHTML = '';
  const inputField = engineDropdown.querySelector('.chosen-value');
  inputField.placeholder = '';
  startLoadingSelect(inputField);
  enableDropdown('engine');
  addFadeIn(engineDropdown);

  let status;
  fetch(urlEngineCodes, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ make: selectedMake, year: selectedYear, model: value })
  })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(data => {
      if (status !== 200) {
        endLoadingSelect(inputField);
        // removeFadeIn(engineDropdown);
        resetDropdowns(['engine']);
        if (data.msg === 'no models') {
          inputField.placeholder = 'Δε βρέθηκαν μοντέλα';
        } else {
          inputField.placeholder = 'Υπήρξε πρόβλημα';
        }
        return;
      }
      fetchedModelObj = data;

      // console.log('populate engine dropdown', fetchedModelObj);
      populateEngineDropdown(fetchedModelObj);
      inputField.placeholder = 'ΕΠΙΛΕΞΤΕ ΚΙΝΗΤΗΡΑ';
      endLoadingSelect(inputField);
      // removeFadeIn(engineDropdown);
    })
    .catch(error => {
      endLoadingSelect(inputField);
      // removeFadeIn(engineDropdown);
      resetDropdowns(['engine']);
      let errorMsg;
      if (status === 429) errorMsg = 'Πολλές κλήσεις, προσπαθήστε αργότερα....';
      else errorMsg = 'Προσπαθήστε αργότερα';
      inputField.placeholder = errorMsg;
      console.error('Error Fetch:', error);
    });
}

function populateEngineDropdown(fetchedModelObj) {
  let convertibleSymbol = '✔️';
  let engineLis = [];
  let engineCodes = [];

  fetchedModelObj.forEach(vehicle => {
    vehicle.engineCodes.forEach(code => {
      engineCodes.push(`${vehicle.hp} HP - ${code} ${convertibleSymbol}`);
    });
  });

  engineCodes = [...new Set(engineCodes)].sort(
    (a, b) => parseInt(a.split(' ')[0]) - parseInt(b.split(' ')[0])
  );

  engineCodes.forEach(engineCode => {
    let engineCodeValue = engineCode.split(' ');
    engineCodeValue.pop();
    engineCodeValue = engineCodeValue.join(' ');
    engineLis.push(
      `<li class="custom-li" data-engine-code="${engineCodeValue}"><div>${engineCode}</div></li>`
    );
  });

  const dropdown = engineDropdown.querySelector('.value-list');
  dropdown.innerHTML = engineLis.join('');

  engineDropdownLis = [...dropdown.querySelectorAll('li')];
  const dropdownArray = engineDropdownLis;
  dropdownArray.forEach(item => {
    item.addEventListener('mousedown', () => {
      onDropdownItemClick('engineDropdown', item);
    });
  });

  //One option -> auto populate
  if (engineDropdownLis.length === 1) {
    // console.log('one option -> auto populate!');
    const inputField = engineDropdown.querySelector('.chosen-value');
    inputField.value = engineCodes[0];
    dropdownValueSelected(engineCodes[0], 'engineDropdown');
  }
}

function engineOnChange(value) {
  const selectedHP = parseInt(value.split(' ')[0]);
  let selectedEngineCode = value.split(' - ')[1];

  // console.log(selectedHP, selectedEngineCode);

  const foundVehicles = fetchedModelObj.filter(
    model => model.hp === selectedHP && model.engineCodes.includes(selectedEngineCode)
  );
  // console.log('found vehciels', foundVehicles);

  foundVehicleObj = runConsumptionRace(foundVehicles)[0].veh;

  console.log('foundVehicleOBj', foundVehicleObj);

  showResults(fetchedModelObj);
  return; //

  // if (!value) {
  // showGuarantee(false);
  // resetCalc();
  // resetEasyPay();
  // step2Triggered = false;
  //
  // calcResult(false);
  // updateBasketSection({ resetNoVehicle: true });
  // resetProgressSteps();
  // togglePulse('.summary-pulse', false);
  // resetNotConvForm();
  //
  // userSelections.vehicle = {};
  // delete userSelections.calculator.driveOftenIndex;
  // userSelections.easyPay = {};
  // saveUserSelections();

  // return;
  // }

  // showResults(fetchedModelObj);
  // calcResult(false);

  // saveUserSelections();
}

function runConsumptionRace(vehicles) {
  const consumptionObjs = [];
  vehicles.forEach(veh => {
    consumptionObjs.push({ conSum: veh.consumption.reduce((prev, curr) => prev + curr, 0), veh });
  });
  return consumptionObjs.sort((a, b) => b.conSum - a.conSum);
}

function showResults(fetchedModelObj) {
  configureSuggestedContainer();

  // configureCalculatorAfterSuggestion();
  // const years = yearSelect.value;

  // resetNotConvForm();

  // if (suggestedPricesChanges.length) resetToDefaultPrices();

  // if (fetchedModelObj.isDirect) {
  //   showDirectResults(fetchedModelObj);
  // } else if (fetchedModelObj.isMonou) {
  //   showMonouResults(fetchedModelObj);
  // } else {
  //   showCylinderResults(fetchedModelObj, years);
  // }

  // const suggestedContainer = getActiveContainer();

  // userSelections.vehicle.suggestions = {
  //   ...userSelections.vehicle.suggestions,
  //   containerId: suggestedContainer.id
  // };
  // saveUserSelections();

  // adjustSectionPaddings();

  // //If there is a suggestion
  // if (
  //   suggestedContainer &&
  //   !suggestedContainer.classList.contains(
  //     `not-convertible-${userSelections.selectedFuel}-container`
  //   ) &&
  //   !suggestedContainer.classList.contains('not-convertible-form-container')
  // ) {
  //   showGuarantee(true);
  //   displayEmulatorInfo(suggestedContainer);

  //   configureCalculatorAfterSuggestion();
  //   configureEasyPayAfterSuggestion();
  //   configureLastStepAfterSuggestion();
  // } else {
  //   showGuarantee(false);
  //   resetCalc();
  //   resetEasyPay();
  //   updateBasketSection({ resetNoVehicle: true });
  //   resetProgressSteps();
  // }

  // configureUserSelectionsAfterResults();

  // if (
  //   suggestedContainer &&
  //   !suggestedContainer.classList.contains(
  //     `not-convertible-${userSelections.selectedFuel}-container`
  //   ) &&
  //   !suggestedContainer.classList.contains('not-convertible-form-container')
  // ) {
  //   updateBasketSection({
  //     vehicle: true,
  //     calculator: true,
  //     easyPay: true,
  //     prokatavoliDoseis: true,
  //     easyPayMonthlyGain: true
  //   });
  //   trigger_car_step_2();
  //   togglePulse('.summary-pulse', true);
  // } else if (suggestedContainer) {
  //   trigger_not_convertible(
  //     suggestedContainer.classList.contains('not-convertible-form-container')
  //   );
  // }
}

function isMobile() {
  return window.matchMedia('screen and (max-width: 768px)').matches;
}

// function configureCalculatorAfterSuggestion() {
// document.querySelector('#calcTitle').textContent =
//   'Υπολόγισε πόσα θα εξοικονομείς με το αυτοκίνητό σου!';

// document.querySelector(
//   '#inConsumption .text-span'
// ).innerHTML = `(${foundVehicleObj.consumption[0]}L/100km)`;
// document.querySelector(
//   '#outConsumption .text-span'
// ).innerHTML = `(${foundVehicleObj.consumption[1]}L/100km)`;
// document.querySelector(
//   '#combinedConsumption .text-span'
// ).innerHTML = `(${foundVehicleObj.consumption[2]}L/100km)`;

// const consumptionRadios = document.querySelectorAll('.radio-button.w-radio');

// consumptionRadios[0].dataset.cons = foundVehicleObj.consumption[0];
// consumptionRadios[1].dataset.cons = foundVehicleObj.consumption[1];
// consumptionRadios[2].dataset.cons = foundVehicleObj.consumption[2];

// document.querySelector('#calcContainerVehicle').style.display = 'block';
// document.querySelector('#calcContainerNoVehicle').style.display = 'none';

// sliders[1].value = foundVehicleObj.consumption[getDriveOftenIndex()];
// outputs[1].value = sliders[1].value;
// calcCovers[1].style.width = calcCoverWidth(sliders[1]) + '%';

// [...document.querySelectorAll('.in-consumption')].map(
//   el => (el.textContent = foundVehicleObj.consumption[0])
// );
// [...document.querySelectorAll('.out-consumption')].map(
//   el => (el.textContent = foundVehicleObj.consumption[1])
// );
// [...document.querySelectorAll('.combined-consumption')].map(
//   el => (el.textContent = foundVehicleObj.consumption[2])
// );

// document.querySelector(
//   '#consumptionModelNameCalc'
// ).textContent = `${makeSelect.value} ${modelSelect.value} (${yearSelect.value})`;
// document.querySelector('#consumptionModelNameCalc').classList.add('calc-info-style');
// }

function configureSuggestedContainer() {
  showCarResultContainer();
  showSuggestedContainer();
  if (foundVehicleObj.files.length) {
    configureFilesGallery();
  } else {
    console.log('vehicle with no files!');
  }
}

function showCarResultContainer() {
  document.querySelector('#makeImg').src = makeImgPrefix + makeImgDict[selectedMake];
  document.querySelector('#makeImg').alt = selectedMake;
  document.querySelector(
    '#modelName'
  ).textContent = `${selectedModel} (${selectedYear}) ${selectedEngine}`;

  document.querySelector('#carResultContainer').style.display = 'flex';
}

function showSuggestedContainer() {
  const system = foundVehicleObj.master;
  let foundContainer;

  if (system === SystemDict.systems.SR) {
    foundContainer = document.querySelector('.sr-container');
  } else if (system === SystemDict.systems.AR) {
    foundContainer = document.querySelector('.ar-container');
  } else if (system === SystemDict.systems.PIEZO_BMW) {
    foundContainer = document.querySelector('.piezo-bmw-container');
  } else if (system === SystemDict.systems.PIEZO_MERCEDES) {
    foundContainer = document.querySelector('.piezo-mercedes-container');
  } else if (system === SystemDict.systems.SR_ALFA_ROMEO) {
    foundContainer = document.querySelector('.sr-alfa-romeo-container');
  }

  foundContainer.style.display = 'block';
  activeContainer = foundContainer;
}

function configureFilesGallery() {
  //card files appearance depending on files length
  const sideFiles = [...activeContainer.querySelectorAll('.side-file')];
  setCardFilesAppearance(sideFiles);

  // set files to card
  const mainCardFile = activeContainer.querySelector('.main-file');
  addFileToLightbox(foundVehicleObj.files[0], mainCardFile);
  // mainCardFile.src = foundVehicleObj.files[0].url;
  // mainCardFile.alt = foundVehicleObj.files[0].name;

  sideFiles.forEach((side, index) => {
    if (side.style.display === 'block') {
      addFileToLightbox(foundVehicleObj.files[index + 1], side, 'side');
      // const file = side.querySelector('.lightbox-image');
      // file.src = foundVehicleObj.files[index + 1].url;
      // file.alt = foundVehicleObj.files[index + 1].name;
    }
  });

  //set files to files gallery
  const sideGalleryFiles = [...document.querySelectorAll('.gallery-side-file')];
  removeAllFilesFromGallery(sideGalleryFiles);
  setFilesToSideGallery(sideGalleryFiles);
  selectMainGalleryFile(0);
}

function addFileToLightbox(file, box, boxType) {
  const boxImage = box.querySelector('.lightbox-image');
  const boxVideo = box.querySelector('.lightbox-video');

  if (file.fileType === 'video') {
    const video = boxVideo.querySelector('video');
    boxImage.style.display = 'none';
    video.src = file.url;
    video.controls = true;
    boxVideo.style.display = 'block';
    if (boxType === 'side') {
      video.controls = false;
    }
  } else {
    boxVideo.style.display = 'none';
    boxImage.src = file.url;
    boxImage.alt = file.name;
    boxImage.style.display = 'block';
  }
}

function setCardFilesAppearance(sideFiles) {
  const mainFile = activeContainer.querySelector('.main-file');
  const moreFilesContainer = activeContainer.querySelector('.more-files-container');
  moreFilesContainer.style.display = 'none';
  if (foundVehicleObj.files.length > 4) {
    sideFiles.forEach(side => {
      side.style.display = 'block';
      side.style.width = '33%';
      mainFile.style.height = '230px';
    });
    moreFilesContainer.style.display = 'flex';
    moreFilesContainer.querySelector('.more-files-number').textContent = `+${
      foundVehicleObj.files.length - 4
    }`;
  } else if (foundVehicleObj.files.length === 4) {
    sideFiles.forEach(side => {
      side.style.display = 'block';
      side.style.width = '33%';
      mainFile.style.height = '230px';
    });
  } else if (foundVehicleObj.files.length === 3) {
    sideFiles.forEach((side, i) => {
      side.style.display = 'block';
      side.style.width = '50%';
      mainFile.style.height = '230px';
      if (i === 2) {
        side.style.display = 'none';
      }
    });
  } else if (foundVehicleObj.files.length === 2) {
    sideFiles.forEach((side, i) => {
      side.style.display = 'block';
      side.style.width = '0%';
      mainFile.style.height = '100%';
      if (i >= 1) {
        side.style.display = 'none';
      }
    });
  } else if (foundVehicleObj.files.length === 1) {
    sideFiles.forEach((side, i) => {
      side.style.display = 'none';
      side.style.width = '0%';
      mainFile.style.height = '100%';
    });
  }
}

function removeAllFilesFromGallery(sideGalleryFiles) {
  sideGalleryFiles.forEach(f => (f.style.display = 'none'));
}

function setFilesToSideGallery(sideGalleryFiles) {
  foundVehicleObj.files.forEach((file, index) => {
    sideGalleryFiles[index].style.display = 'block';

    const image = sideGalleryFiles[index].querySelector('img');
    const video = sideGalleryFiles[index].querySelector('video');

    if (file.fileType === 'video') {
      image.style.display = 'none';
      video.src = file.url;
      video.controls = false;
      video.style.display = 'block';
      sideGalleryFiles[index].querySelector('.gallery-video').style.display = 'block';
    } else {
      video.style.display = 'none';
      sideGalleryFiles[index].querySelector('.gallery-video').style.display = 'none';
      image.src = file.url;
      image.alt = file.name;
      image.style.display = 'block';
    }
  });
}
