// let serverUrl = 'https://lovatohellas.herokuapp.com/';
let serverUrl = 'http://localhost:1968/';
const baseUrl = location.origin;
const mapUrl = '/stores';
const urlYears = serverUrl + 'vehicleDB/get/years';
const urlModels = serverUrl + 'vehicleDB/get/models';
const urlDescriptions = serverUrl + 'vehicleDB/get/descriptions';
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
// const baseDateUrl = serverUrl + 'lottery/base-date';
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

let makeDropdownLis, yearDropdownLis, modelDropdownLis, engineDropdownLis;

document.addEventListener('DOMContentLoaded', () => {
  initCustomDropdowns();
});

function initCustomDropdowns() {
  customDropdowns = [...document.querySelectorAll('.custom-dropdown')];

  initCustomDropdown({ dropdownId: 'makeDropdown', placeholderStr: 'Μάρκα' });
  initCustomDropdown({ dropdownId: 'yearDropdown', placeholderStr: 'Χρονολογία' });
  // initCustomDropdown({ dropdownId: 'modelDropdown', placeholderStr: 'Μοντέλο' });
  // initCustomDropdown({ dropdownId: 'engineDropdown', placeholderStr: 'Κινητήρα' });
}

function initCustomDropdown({ dropdownId, placeholderStr }) {
  const customDropdown = document.getElementById(dropdownId);
  const inputField = customDropdown.querySelector('.chosen-value');
  const inputImg = customDropdown.querySelector('.input-container img');

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

      console.log('SEARCH: dropdownArray', dropdownArray, inputWords);
      console.log('S: makeLis', makeDropdownLis);
      console.log('SEH: yearLis', yearDropdownLis);

      const lisToShow = dropdownArray.filter(li =>
        inputWords.some(word =>
          li.textContent.split(' ').some(liWord => liWord.toLowerCase().includes(word))
        )
      );

      console.log('listToShow', lisToShow);

      dropdownArray.forEach(li => li.classList.add('closed'));
      lisToShow.forEach(li => li.classList.remove('closed'));
    } else {
      for (let i = 0; i < dropdownArray.length; i++) {
        dropdownArray[i].classList.remove('closed');
      }
    }
  });

  dropdownArray.forEach(item => {
    item.addEventListener('click', evt => {
      onDropdownItemClick(dropdownId, item);
    });
  });

  inputField.addEventListener('blur', () => {
    inputField.placeholder = 'Επιλέξτε ' + placeholderStr;
    const prevSelectedValue = getSelectedValue(customDropdown.id);
    console.log(prevSelectedValue, inputField.value);
    if (inputField.value && inputField.value !== prevSelectedValue) {
      inputField.value = prevSelectedValue ? prevSelectedValue : '';
    } else if (!inputField.value) {
      if (customDropdown.id === 'makeDropdown') {
        resetDropdowns(['year', 'model', 'engine']);
        selectedMake = undefined;
      } else if (customDropdown.id === 'yearDropdown') {
        resetDropdowns(['model', 'engine']);
        selectedYear = undefined;
      } else if (customDropdown.id === 'modelDropdown') {
        resetDropdowns(['engine']);
        selectedModel = undefined;
      } else if (customDropdown.id === 'egineDropdown') {
        selectedEngine = undefined;
      }
    }
    setTimeout(() => {
      closeDropdown(customDropdown.id);
    }, 100);
  });

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

  inputImg.addEventListener('click', () => {
    _openDropdown();
  });
}

function onDropdownItemClick(dropdownId, item) {
  const inputField = document.querySelector(`#${dropdownId} .chosen-value`);
  inputField.value = item.textContent;

  console.log('inputField.value', inputField.value);
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
      inputField.placeholder = 'Επιλέξτε Μάρκα';
    } else if (dbId === 'yearDropdown') {
      inputField.placeholder = 'Χρονολογία';
    } else if (dbId === 'modelDropdown') {
      inputField.placeholder = 'Μοντέλο';
    } else if (dbId === 'engineDropdown') {
      inputField.placeholder = 'Κινητήρας';
    }

    const valueList = document.querySelector(`#${dbId} .value-list`);
    valueList.innerHTML = '';
  });
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
  const inputImg = document.querySelector(`#${dbId} .input-container img`);
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
    selectedMake = value;
    console.log('make on change', selectedMake);
    makeOnChange(selectedMake);
  } else if (dbId === 'yearDropdown') {
    selectedYear = value;
    console.log('years on change', selectedYear);
    yearOnChange(selectedYear);
  }
}

function makeOnChange(value) {
  resetDropdowns(['model', 'engine']);
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
    resetDropdowns(['year']);
    // togglePulse('.car-pulse', true);
    // togglePulse('.summary-pulse', false);
    return;
  }

  enableDropdown('year');

  // yearSelect.disabled = false;
  const inputField = yearDropdown.querySelector('.chosen-value');
  inputField.placeholder = ''; //loading select
  // startLoadingSelect('year');

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
        // endLoadingSelect(yearSelect);
        if (data.msg === 'no models') {
          inputField.placeholder = 'Δε βρέθηκαν μοντέλα';
        } else {
          inputField.placeholder = 'Υπήρξε πρόβλημα';
        }
        disableDropdown('year');
        return;
      }
      fetchedYears = data;
      // sessionStorage.clear(); //reset every time make changes
      // sessionStorage.fetchedYears = JSON.stringify(fetchedYears);

      console.log('populate year dropdown', fetchedYears);
      populateYearDropdown(fetchedYears);
      inputField.placeholder = 'Επιλέξτε Χρονολογία';
      // endLoadingSelect(yearSelect);
    })
    .catch(error => {
      // endLoadingSelect(yearSelect);
      let errorMsg;
      if (status === 429) errorMsg = 'Πολλές κλήσεις, προσπαθήστε αργότερα....';
      else errorMsg = 'Προσπαθήστε ξανά';
      // yearSelect.innerHTML = `<option value="">${errorMsg}</option>`;
      inputField.placeholder = errorMsg;
      console.error('Error Fetch:', error);
    });
}

function startLoadingSelect(select, triggeredFrom = null, type = null) {
  if (!triggeredFrom) select.classList.add('loading-select');
  // else {
  //   if (triggeredFrom === 'form') {
  //     document.querySelector('#submitSummaryBtn').value = 'Ετοιμάζουμε την προσφορά σου...';
  //   }
  //   if (triggeredFrom === 'basket') {
  //     if (type === 'download') {
  //       if (isFacebookBrowser()) {
  //         document.querySelector('.open-download-form').click();
  //       } else {
  //         document.querySelector('.download-summary-basket-descr').innerHTML =
  //           'Ετοιμάζουμε την<br>προσφορά σου...';
  //       }
  //     } else if (type === 'email')
  //       document.querySelector('.email-summary-basket-descr').innerHTML =
  //         'Ετοιμάζουμε την<br>προσφορά σου...';
  //   }
  // }
}
function endLoadingSelect(select, triggeredFrom = null, type = null) {
  if (!triggeredFrom) select.classList.remove('loading-select');
  // else {
  //   if (triggeredFrom === 'form') {
  //     document.querySelector('#submitSummaryBtn').value =
  //       formType === 'DOWNLOAD' ? 'Κατέβασε και εκτύπωσε!' : 'Πάρε με Email!';
  //   }
  //   if (triggeredFrom === 'basket') {
  //     if (type === 'download')
  //       document.querySelector('.download-summary-basket-descr').innerHTML =
  //         'Κατέβασε<br>και εκτύπωσε!';
  //     else if (type === 'email')
  //       document.querySelector('.email-summary-basket-descr').innerHTML = 'Πάρε<br>σε email!';
  //   }
  // }
}

function populateYearDropdown(fetchedYears) {
  const yearLis = fetchedYears.map(year => `<li class="custom-li"><div>${year}</div></li>`);

  const dropdown = yearDropdown.querySelector('.value-list');
  dropdown.innerHTML = yearLis.join('');

  yearDropdownLis = [...dropdown.querySelectorAll('li')];
  const dropdownArray = yearDropdownLis;
  dropdownArray.forEach(item => {
    item.addEventListener('click', () => {
      onDropdownItemClick('yearDropdown', item);
    });
  });

  // yearSelect.disabled = false;
  // yearSelect.focus();
  //One option -> auto populate
  if (yearDropdownLis.length === 1) {
    console.log('one option -> auto populate!');

    dropdownValueSelected(fetchedYears[0], 'yearDropdown');

    // yearSelect.selectedIndex = 1;
    // yearOnChange(yearSelect.value);
  }
}

function yearOnChange(value) {
  resetDropdowns(['engine']);

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
    resetDropdowns(['model']);
    // modelSelect.disabled = true;
    // modelSelect.innerHTML = '<option value="">Μοντέλο</option>';
    // descriptionSelect.innerHTML = '<option value="">Κινητήρας</option>';
    return;
  }

  enableDropdown('model');

  // modelSelect.disabled = false;
  // modelSelect.innerHTML = '';
  // startLoadingSelect(modelSelect);
  const inputField = modelDropdown.querySelector('.chosen-value');
  inputField.placeholder = ''; //loading select

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
        // endLoadingSelect(modelSelect);
        if (data.msg === 'no models') {
          inputField.placeholder = 'Δε βρέθηκαν μοντέλα';
        } else {
          inputField.placeholder = 'Υπήρξε πρόβλημα';
        }
        disableDropdown('model');
        return;
      }
      fetchedModels = data;

      console.log('populate model dropdown', fetchedModels);
      // populateModelDropdown(fetchedModels);
      inputField.placeholder = 'Επιλέξτε Μοντέλο';

      // populateModelSelect(fetchedModels);
      // endLoadingSelect(modelSelect);
    })
    .catch(error => {
      let errorMsg;
      if (status === 429) errorMsg = 'Πολλές κλήσεις, προσπαθήστε αργότερα....';
      else errorMsg = 'Προσπαθήστε ξανά';
      inputField.placeholder = errorMsg;
      // endLoadingSelect(modelSelect);
      // yearSelect.innerHTML = '<option value="">Προσπαθήστε ξανά</option>';
      console.error('Error Fetch:', error);
    });
}

function populateModelSelect(fetchedModels) {
  let modelOptionsArray = ['<option value="">Επιλέξτε Μοντέλο</option>'];
  fetchedModels.forEach(model => {
    modelOptionsArray.push(`<option value="${model}">${model}</option>`);
  });

  modelSelect.innerHTML = modelOptionsArray.join('');
  modelSelect.disabled = false;
  modelSelect.focus();

  if (modelOptionsArray.length === 2) {
    modelSelect.selectedIndex = 1;
    modelOnChange(modelSelect.value);
    return;
  }
}

modelSelect.addEventListener('change', e => modelOnChange(e.target.value));
function modelOnChange(value) {
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
    descriptionSelect.disabled = true;
    descriptionSelect.innerHTML = '<option value="">Κινητήρας</option>';
    return;
  }
  // sessionStorage.selectedYear = value;

  descriptionSelect.disabled = false;
  descriptionSelect.innerHTML = '';
  startLoadingSelect(descriptionSelect);
  let status;
  fetch(urlDescriptions, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ make: makeSelect.value, year: yearSelect.value, model: value })
  })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(data => {
      if (status !== 200) {
        endLoadingSelect(modelSelect);
        descriptionSelect.innerHTML = `<option value="">Προσπαθήστε ξανά ${data.msg}</option>`;
        return;
      }
      fetchedModelObj = data;

      // sessionStorage.selectedVehicles = JSON.stringify(selectedVehicles);

      // descriptionSelect.innerHTML = `<option value="">${
      //   selectedVehicles.isDirect ? 'Κινητήρας' : 'Κύλινδροι'
      // }</option>`;
      populateDescriptionSelect(fetchedModelObj);
      endLoadingSelect(descriptionSelect);
    })
    .catch(error => {
      endLoadingSelect(descriptionSelect);
      descriptionSelect.innerHTML = '<option value="">Προσπαθήστε ξανά</option>';
      console.error('Error Fetch:', error);
    });
}

function populateDescriptionSelect(fetchedModelObj) {
  let optionsArray;

  // if (fetchedModelObj.isDirect) {
  optionsArray = ['<option value="">Επιλέξτε Κινητήρα</option>'];
  let engineCodesOptions = [];
  fetchedModelObj.vehicles.forEach(vehicle => {
    vehicle.engineCodes.forEach(code => {
      // let convertibleSymbol = vehicle.isConvertible
      //   ? ' ✔️'
      //   : vehicle.cylinders <= 4
      //   ? ' &#9203;'
      //   : ' &#10060;';
      let convertibleSymbol = ' ✔️';
      engineCodesOptions.push(code + convertibleSymbol);
    });
  });
  engineCodesOptions = [...new Set(engineCodesOptions)].sort(
    (a, b) => parseInt(a.split(' ')[0]) - parseInt(b.split(' ')[0])
  );
  engineCodesOptions.forEach(engineCode => {
    let engineCodeValue = engineCode.split(' ');
    engineCodeValue.pop();
    engineCodeValue = engineCodeValue.join(' ');
    optionsArray.push(`<option value="${engineCodeValue}">${engineCode}</option>`);
  });
  // } else {
  //   const filteredVehicles = fetchedModelObj.vehicles.slice();

  //   if (
  //     filteredVehicles.length === 1 ||
  //     (haveSameConsumption(filteredVehicles, { tolerance: 0.5 }) &&
  //       haveSameEmulators(filteredVehicles) &&
  //       (filteredVehicles.every(veh => veh.hp <= 180) ||
  //         filteredVehicles.every(veh => veh.hp > 180)))
  //   ) {
  //     optionsArray = ['<option value="">Επιλέξτε Κυλίνδρους</option>'];
  //     let cylinders = filteredVehicles.map(veh => veh.cylinders);
  //     cylinders = [...new Set(cylinders)].sort();
  //     cylinders.forEach(cylinder => {
  //       optionsArray.push(`<option value="${cylinder}">${cylinder} cyl</option>`);
  //     });
  //   } else {
  //     optionsArray = ['<option value="">Επιλέξτε Ιπποδύναμη</option>'];
  //     let hpOptions = filteredVehicles.map(veh => veh.hp);
  //     hpOptions = [...new Set(hpOptions)].sort((a, b) => parseInt(a) - parseInt(b));
  //     hpOptions.forEach(opt => {
  //       optionsArray.push(`<option value="${opt}">${opt} HP</option>`);
  //     });
  //   }
  // }

  descriptionSelect.innerHTML = optionsArray.join('');
  descriptionSelect.disabled = false;
  descriptionSelect.focus();
  //One option -> auto populate
  if (optionsArray.length === 2) {
    descriptionSelect.selectedIndex = 1;
    descriptionOnChange(descriptionSelect.value);
    return;
  }
}

descriptionSelect.addEventListener('change', e => descriptionOnChange(e.target.value));

function descriptionOnChange(value) {
  // suggestedContainers.forEach(cont => (cont.style.display = 'none'));

  if (!value) {
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

    return;
  }

  showResults(fetchedModelObj);
  // calcResult(false);

  // saveUserSelections();
}

function showResults(fetchedModelObj) {
  console.log('RESULTS!!!', fetchedModelObj);
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
