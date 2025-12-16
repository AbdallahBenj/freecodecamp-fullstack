console.log('Bank Account App');

class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
    this.isValidAmount = true;
  }

  deposit(depositAmount) {
    let result;
    if (depositAmount > 0) {
      this.transactions.push({
        type: 'deposit',
        amount: depositAmount,
      });
      this.balance += depositAmount;
      result = `Successfully deposited $${depositAmount}. New balance: $${this.balance}`;
      this.isValidAmount = true;
      return result;
    } else if (depositAmount <= 0) {
      result = `Deposit amount must be greater than zero.`;
      this.isValidAmount = false;
      return result;
    }
  }

  withdraw(withdrawAmount) {
    let result;
    if (withdrawAmount > 0 && withdrawAmount <= this.balance) {
      this.transactions.push({ type: 'withdraw', amount: withdrawAmount });
      this.balance -= withdrawAmount;
      result = `Successfully withdrew $${withdrawAmount}. New balance: $${this.balance}`;
      this.isValidAmount = true;
    } else if (withdrawAmount <= 0 || withdrawAmount > this.balance) {
      result = 'Insufficient balance or invalid amount.';
      this.isValidAmount = false;
    }
    return result;
  }

  checkBalance() {
    let result;
    result = `${this.balance}`; // `Current balance: $${this.balance}`
    return result;
  }

  listAllDeposits() {
    let result = 'Deposits: ';
    let depositEl = this.transactions.filter((el) => el.type === 'deposit');
    let depositArr = depositEl.map((el) => el.amount).join(',');
    result += depositArr;
    return result;
  }

  listAllWithdrawals() {
    let result = 'Withdrawals: ';
    let withdrawEl = this.transactions.filter((el) => el.type === 'withdraw');
    let withdrawArr = withdrawEl.map((el) => el.amount).join(',');
    result += withdrawArr;
    return result;
  }
}

const myAccount = new BankAccount();

// Costume functions and methods

const myModal = document.getElementById('myModal');
const myInput = document.getElementById('ModalFloatingInput');

const userNameBtn = document.getElementById('user-name-btn');
const btnSaveName = document.getElementById('btn-save-name');

// Modal

let modal = new bootstrap.Modal(myModal);

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus();
});

/* global bootstrap */
window.addEventListener('load', () => modal.show());

userNameBtn.addEventListener('click', () => modal.show());

// Modal Name input event listener

myInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    btnSaveName.click(); // simulate button click
  }
});

btnSaveName.addEventListener('click', () => {
  let saveName = myInput.value.trim();
  if (saveName.length < 3) {
    alert('Please enter more than 3 character');
  } else {
    modal.hide();
    userNameBtn.textContent = `Hi ${saveName[0].toUpperCase() + saveName.slice(1)}`;
    myInput.value = '';
  }
});

// Ballance and message event listener

const floatingInput = document.getElementById('floatingInput');
const balance = document.getElementById('balance');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const messageInput = document.getElementById('messageInput');
const message = document.getElementById('message');

// Function animation

function setAnimation(element, type) {
  element.classList.add(type);
  setTimeout(() => element.classList.remove(type), 600);
}

// Function message style

function setMessageStyle(isValid) {
  message.classList.toggle('text-info', isValid);
  message.classList.toggle('border-info', isValid);
  message.classList.toggle('text-danger', !isValid);
  message.classList.toggle('border-danger', !isValid);
}

// Deposit button event

depositBtn.addEventListener('click', () => {
  messageInput.textContent = myAccount.deposit(Number(floatingInput.value));
  const isValid = myAccount.isValidAmount;

  if (isValid) {
    balance.textContent = myAccount.checkBalance();
    setAnimation(balance, 'fadeUp');

    getLastTransactionsContent();
  }

  message.style.display = 'block';
  setAnimation(message, 'fadeUp');
  setMessageStyle(isValid);

  floatingInput.value = '';
});

withdrawBtn.addEventListener('click', () => {
  messageInput.textContent = myAccount.withdraw(Number(floatingInput.value));
  const isValid = myAccount.isValidAmount;

  if (isValid) {
    balance.textContent = myAccount.checkBalance();
    setAnimation(balance, 'fadeUp');

    getLastTransactionsContent();
  }

  message.style.display = 'block';
  setAnimation(message, 'fadeUp');
  setMessageStyle(isValid);

  floatingInput.value = '';
});

// Transaction section event listener

function getLastTransactionsContent() {
  let childCardBody = document.getElementById('child-card-body');
  childCardBody.innerHTML = '';

  let lastTransactionsArr = myAccount.transactions.slice(-5).reverse();

  lastTransactionsArr.forEach((obj) => {
    let line = document.createElement('div');
    childCardBody.appendChild(line);
    line.classList.add('border-bottom', 'mx-5');

    let transactionsRow = document.createElement('div');
    childCardBody.appendChild(transactionsRow);
    transactionsRow.classList.add('row', 'my-3');
    setTimeout(
      () => transactionsRow.classList.add('fadeUp'),
      `${lastTransactionsArr.indexOf(obj)}00`,
    );

    let transactionName = document.createElement('div');
    transactionsRow.appendChild(transactionName);
    transactionName.classList.add(`${obj.type}-trans`, `col`, `mx-sm-4`);

    transactionName.setAttribute(
      'id',
      `${obj.type}-trans-${lastTransactionsArr.indexOf(obj)}`,
    );
    transactionName.textContent =
      obj.type === 'deposit' ? 'Deposit' : 'Withdraw';

    let transactionIcon = document.createElement('i');
    transactionName.appendChild(transactionIcon);
    transactionIcon.classList.add(
      'bi',
      ...(obj.type === 'deposit'
        ? ['bi-arrow-up-circle-fill', 'text-info', 'ms-4']
        : ['bi-arrow-down-circle-fill', 'text-danger', 'ms-2']),
    );

    let transactionValue = document.createElement('div');
    transactionsRow.appendChild(transactionValue);
    transactionValue.classList.add(
      `${obj.type}-trans`,
      'col',
      'mx-sm-4',
      'text-end',
    );

    transactionValue.setAttribute(
      'id',
      `${obj.type}-value-${lastTransactionsArr.indexOf(obj)}`,
    );
    transactionValue.textContent = `💲${Number(obj.amount).toFixed(2)}`;
  });
}
getLastTransactionsContent();

// Dark icon event

const darkIcon = document.getElementById('dark-icon');
const body = document.getElementById('body');

let isDark;
darkIcon.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default behavior
  e.stopPropagation();

  if (!isDark) {
    body.setAttribute('data-bs-theme', 'dark');
  } else if (isDark) {
    body.removeAttribute('data-bs-theme');
  }
  isDark = !isDark;
  console.log('isDark:', isDark);
});
