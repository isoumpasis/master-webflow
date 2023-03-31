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

let fetchedYears;
let fetchedModels;
let fetchedModelObj;
let foundVehicleObj;

const makeSelect = document.querySelector('#makeSelect');
const modelSelect = document.querySelector('#modelSelect');
const yearSelect = document.querySelector('#yearSelect');
const descriptionSelect = document.querySelector('#descriptionSelect');

document.addEventListener('DOMContentLoaded', () => {
  initSelects();

  function initSelects() {
    modelSelect.disabled = true;
    modelSelect.innerHTML = '<option value="">Μοντέλο</option>';
    yearSelect.disabled = true;
    yearSelect.innerHTML = '<option value="">Χρονολογία</option>';
    descriptionSelect.disabled = true;
    descriptionSelect.innerHTML = '<option value="">Περιγραφή</option>';
  }
});

makeSelect.addEventListener('change', function () {
  modelSelect.disabled = true;
  descriptionSelect.disabled = true;
  modelSelect.innerHTML = '<option value="">Μοντέλο</option>';
  descriptionSelect.innerHTML = '<option value="">Κινητήρας</option>';
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

  if (!this.value) {
    yearSelect.disabled = true;
    yearSelect.innerHTML = '<option value="">Χρονολογία</option>';
    // togglePulse('.car-pulse', true);
    // togglePulse('.summary-pulse', false);
    return;
  }
  yearSelect.disabled = false;
  yearSelect.innerHTML = '';
  startLoadingSelect(yearSelect);

  let status;
  fetch(urlYears, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ make: this.value })
  })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(data => {
      if (status !== 200) {
        endLoadingSelect(yearSelect);
        yearSelect.innerHTML = `<option value="">Προσπαθήστε ξανά ${data.msg}</option>`;
        console.warn('status = ' + status);
        return;
      }
      fetchedYears = data;
      // sessionStorage.clear(); //reset every time make changes
      // sessionStorage.fetchedYears = JSON.stringify(fetchedYears);

      populateYearSelect(fetchedYears);
      endLoadingSelect(yearSelect);
    })
    .catch(error => {
      endLoadingSelect(yearSelect);
      let errorMsg;
      if (status === 429) errorMsg = 'Πολλές κλήσεις, προσπαθήστε αργότερα....';
      else errorMsg = 'Προσπαθήστε ξανά';
      yearSelect.innerHTML = `<option value="">${errorMsg}</option>`;
      console.error('Error Fetch:', error);
    });
});

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

function populateYearSelect(fetchedYears) {
  let yearOptionsArray = ['<option value="">Επιλέξτε Χρονολογία</option>'];

  fetchedYears.forEach(year => {
    yearOptionsArray.push(`<option value="${year}">${year}</option>`);
  });

  yearSelect.innerHTML = yearOptionsArray.join('');
  yearSelect.disabled = false;
  yearSelect.focus();
  //One option -> auto populate
  if (yearOptionsArray.length === 2) {
    yearSelect.selectedIndex = 1;
    yearOnChange(yearSelect.value);
    return;
  }
}

yearSelect.addEventListener('change', e => yearOnChange(e.target.value));
function yearOnChange(value) {
  descriptionSelect.disabled = true;
  descriptionSelect.innerHTML = '<option>Περιγραφή</option>';
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
    modelSelect.disabled = true;
    modelSelect.innerHTML = '<option value="">Μοντέλο</option>';
    descriptionSelect.innerHTML = '<option value="">Κινητήρας</option>';
    return;
  }

  modelSelect.disabled = false;
  modelSelect.innerHTML = '';
  startLoadingSelect(modelSelect);
  let status;
  fetch(urlModels, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ make: makeSelect.value, year: value })
  })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(data => {
      if (status !== 200) {
        endLoadingSelect(modelSelect);
        yearSelect.innerHTML = `<option value="">Προσπαθήστε ξανά ${data.msg}</option>`;
        return;
      }
      fetchedModels = data;

      populateModelSelect(fetchedModels);
      endLoadingSelect(modelSelect);
    })
    .catch(error => {
      endLoadingSelect(modelSelect);
      yearSelect.innerHTML = '<option value="">Προσπαθήστε ξανά</option>';
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
