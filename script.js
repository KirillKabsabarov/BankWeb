let operationsHistory = []; // Массив для хранения истории операций
let balance = 100000; // Начальный баланс
let currentFormId = null;

function showMobilePayment() {
  document.getElementById("mobilePaymentForm").style.display = "block";
}

function hideMobilePayment() {
  document.getElementById("mobilePaymentForm").style.display = "none";
}

function makeMobilePayment() {
  let phoneNumber = document.getElementById("phoneNumber").value;
  let operator = document.getElementById("operator").value;
  let amount = parseFloat(document.getElementById("amount").value);

  if (phoneNumber.length !== 11) {
      alert("Номер телефона должен содержать ровно 11 цифр");
      return;
  }

  if (isNaN(amount) || amount <= 0) {
      alert("Введите корректную сумму платежа (больше нуля)");
      return;
  }

  if (amount > balance) {
      alert("Недостаточно средств на балансе");
      return;
  }

  // Вычитаем сумму операции из баланса
  balance -= amount;

  alert("Операция выполнена успешно");
  recordOperation(`Мобильная связь (${operator})`, amount);

  // Обновляем отображение баланса
  updateBalanceDisplay();

  document.getElementById("phoneNumber").value = "";
  document.getElementById("amount").value = "";
}

function updateBalanceDisplay() {
  let balanceElements = document.getElementsByClassName("balance");
  if (balanceElements.length > 0) {
    balanceElements[0].textContent = `Баланс: ${balance} руб.`;
  }
}

function showHousePayment() {
  document.getElementById("housePaymentForm").style.display = "block";
}

function hideHousePayment() {
  document.getElementById("housePaymentForm").style.display = "none";
}

function makeHousePayment() {
  let accountNumber = document.getElementById("accountNumber").value;
  let utilityType = document.getElementById("utilityType").value;
  let houseAmount = parseFloat(document.getElementById("houseAmount").value);

  if (accountNumber.length !== 10) {
      alert("Лицевой счет должен содержать ровно 10 цифр");
      return;
  }

  if (isNaN(houseAmount) || houseAmount <= 0) {
      alert("Введите корректную сумму платежа (больше нуля)");
      return;
  }

  if (houseAmount > balance) {
      alert("Недостаточно средств на балансе");
      return;
  }

  // Вычитаем сумму операции из баланса
  balance -= houseAmount;

  alert("Оплата коммунальных услуг выполнена успешно");
  recordOperation(`Оплата коммунальных услуг (${utilityType})`, houseAmount);

  // Обновляем отображение баланса
  updateBalanceDisplay();

  document.getElementById("accountNumber").value = "";
  document.getElementById("houseAmount").value = "";
}


function showTransportMenu() {
  document.getElementById("transportMenu").style.display = "block";
}

function hideTransportMenu() {
  document.getElementById("transportMenu").style.display = "none";
}

function showTrafficFines() {
  hideTransportMenu();
  document.getElementById("trafficFinesForm").style.display = "block";
}

function hideTrafficFines() {
  document.getElementById("trafficFinesForm").style.display = "none";
  showTransportMenu();
}

function showParkingPayment() {
  hideTransportMenu();
  document.getElementById("parkingPaymentForm").style.display = "block";
}

function hideParkingPayment() {
  document.getElementById("parkingPaymentForm").style.display = "none";
  showTransportMenu();
}

function payTrafficFine() {
  alert("Штраф оплачен успешно");
}

function payParking() {
  alert("Парковка оплачена успешно");
}

function showEducationPayment() {
  document.getElementById("educationPaymentForm").style.display = "block";
}

function hideEducationPayment() {
  document.getElementById("educationPaymentForm").style.display = "none";
}

function makeEducationPayment() {
  let institution = document.getElementById("educationInstitution").value;
  let fullName = document.getElementById("fullName").value;
  let courseCode = document.getElementById("courseCode").value;
  let group = document.getElementById("group").value;
  let educationAmount = parseFloat(document.getElementById("educationAmount").value);

  if (isNaN(educationAmount) || educationAmount <= 0) {
      alert("Введите корректную сумму платежа (больше нуля)");
      return;
  }

  if (educationAmount > balance) {
      alert("Недостаточно средств на балансе");
      return;
  }

  // Вычитаем сумму операции из баланса
  balance -= educationAmount;

  alert("Оплата за образование выполнена успешно");
  recordOperation(`Оплата образования (${institution})`, educationAmount);

  // Обновляем отображение баланса
  updateBalanceDisplay();

  document.getElementById("fullName").value = "";
  document.getElementById("courseCode").value = "";
  document.getElementById("group").value = "";
  document.getElementById("educationAmount").value = "";
}

function showInvoicePayment() {
  document.getElementById("invoicePaymentForm").style.display = "block";
}

function hideInvoicePayment() {
  document.getElementById("invoicePaymentForm").style.display = "none";
}

function makeInvoicePayment() {
  let recipientInfo = document.getElementById("recipientInfo").value;
  let invoiceAmount = parseFloat(document.getElementById("invoiceAmount").value);

  if (isNaN(invoiceAmount) || invoiceAmount <= 0) {
      alert("Введите корректную сумму платежа (больше нуля)");
      return;
  }

  if (invoiceAmount > balance) {
      alert("Недостаточно средств на балансе");
      return;
  }

  // Вычитаем сумму операции из баланса
  balance -= invoiceAmount;

  alert("Оплата по реквизитам выполнена успешно");
  recordOperation(`Оплата по реквизитам (${recipientInfo})`, invoiceAmount);

  // Обновляем отображение баланса
  updateBalanceDisplay();

  document.getElementById("recipientInfo").value = "";
  document.getElementById("invoiceAmount").value = "";
}

function showHistory() {
  document.getElementById("historySection").style.display = "block";
  displayOperationsHistory();
}

function hideHistory() {
  document.getElementById("historySection").style.display = "none";
}

function recordOperation(type, amount) {
  let operation = {
      type: type,
      amount: amount,
      timestamp: new Date().toLocaleString() // Записываем текущее время в удобочитаемом формате
  };
  operationsHistory.push(operation);
  displayOperationsHistory(); // При каждой записи обновляем отображение истории
}

function displayOperationsHistory() {
  let historyList = document.getElementById("operationHistory");
  historyList.innerHTML = ""; // Очищаем список перед обновлением

  operationsHistory.forEach(operation => {
      let listItem = document.createElement("li");
      listItem.textContent = `${operation.type}: ${operation.amount} руб. (${operation.timestamp})`;
      historyList.appendChild(listItem);
  });
}

// Функция для инициализации отображения начального баланса
function initializeBalanceDisplay() {
  updateBalanceDisplay();
}

// Вызываем инициализацию отображения баланса при загрузке страницы
initializeBalanceDisplay();


function hideTransferSection() {
  document.querySelector(".transfer-section").style.display = "none";
}

function showTransferSection() {
  document.querySelector(".transfer-section").style.display = "block";
}

function hidePaySection() {
  document.querySelector(".pay-section").style.display = "none";
}

function showPaySection() {
  document.querySelector(".pay-section").style.display = "block";
}

function showMobilePayment() {
  hideCurrentForm(); // Скрыть текущую форму
  hideTransferSection(); // Скрыть раздел "Перевести"
  hidePaySection(); // Скрыть раздел "Оплатить"
  document.getElementById("mobilePaymentForm").style.display = "block";
  currentFormId = "mobilePaymentForm"; // Обновить текущую форму
}

function hideMobilePayment() {
  document.getElementById("mobilePaymentForm").style.display = "none";
  showTransferSection(); // Показать раздел "Перевести"
  showPaySection(); // Показать раздел "Оплатить"
  currentFormId = null; // Очистить текущую форму
}

function showHousePayment() {
  hideCurrentForm(); // Скрыть текущую форму
  hideTransferSection(); // Скрыть раздел "Перевести"
  hidePaySection(); // Скрыть раздел "Оплатить"
  document.getElementById("housePaymentForm").style.display = "block";
  currentFormId = "housePaymentForm"; // Обновить текущую форму
}

function hideHousePayment() {
  document.getElementById("housePaymentForm").style.display = "none";
  showTransferSection(); // Показать раздел "Перевести"
  showPaySection(); // Показать раздел "Оплатить"
  currentFormId = null; // Очистить текущую форму
}

function showEducationPayment() {
  hideCurrentForm(); // Скрыть текущую форму
  hideTransferSection(); // Скрыть раздел "Перевести"
  hidePaySection(); // Скрыть раздел "Оплатить"
  document.getElementById("educationPaymentForm").style.display = "block";
  currentFormId = "educationPaymentForm"; // Обновить текущую форму
}

function hideEducationPayment() {
  document.getElementById("educationPaymentForm").style.display = "none";
  showTransferSection(); // Показать раздел "Перевести"
  showPaySection(); // Показать раздел "Оплатить"
  currentFormId = null; // Очистить текущую форму
}

function showTransportMenu() {
  hideCurrentForm(); // Скрыть текущую форму
  hideTransferSection(); // Скрыть раздел "Перевести"
  hidePaySection(); // Скрыть раздел "Оплатить"
  document.getElementById("transportMenu").style.display = "block";
  currentFormId = "transportMenu"; // Обновить текущую форму
}

function hideTransportMenu() {
  document.getElementById("transportMenu").style.display = "none";
  showTransferSection(); // Показать раздел "Перевести"
  showPaySection(); // Показать раздел "Оплатить"
  currentFormId = null; // Очистить текущую форму
}

function showInvoicePayment() {
  hideCurrentForm(); // Скрыть текущую форму
  hideTransferSection(); // Скрыть раздел "Перевести"
  hidePaySection(); // Скрыть раздел "Оплатить"
  document.getElementById("invoicePaymentForm").style.display = "block";
  currentFormId = "invoicePaymentForm"; // Обновить текущую форму
}

function hideInvoicePayment() {
  document.getElementById("invoicePaymentForm").style.display = "none";
  showTransferSection(); // Показать раздел "Перевести"
  showPaySection(); // Показать раздел "Оплатить"
  currentFormId = null; // Очистить текущую форму
}

function hideCurrentForm() {
  if (currentFormId) {
    document.getElementById(currentFormId).style.display = "none";
    currentFormId = null;
  }
}

function transfer() {
  let phoneNumber = document.querySelector(".transfer-section input[type='text'][placeholder='Номер телефона']").value;
  let amount = parseFloat(document.querySelector(".transfer-section input[type='text'][placeholder='Сумма']").value);

  if (phoneNumber.length !== 11) {
    alert("Номер телефона должен содержать ровно 11 цифр");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("Введите корректную сумму перевода (больше нуля)");
    return;
  }

  if (amount > balance) {
    alert("Недостаточно средств на балансе");
    return;
  }

  // Вычитаем сумму перевода из баланса
  balance -= amount;

  // Записываем операцию в историю
  recordOperation(`Перевод на номер ${phoneNumber}`, amount);

  // Обновляем отображение баланса
  updateBalanceDisplay();

  // Очищаем поля ввода после успешного перевода
  document.querySelector(".transfer-section input[type='text'][placeholder='Номер телефона']").value = "";
  document.querySelector(".transfer-section input[type='text'][placeholder='Сумма']").value = "";

  alert("Перевод выполнен успешно");
}
