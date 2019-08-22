class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    this.transactions.forEach(transaction => 
      {
        return balance += transaction.value;
      });
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed()) {
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
    } else {
      return false;
    }
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
  
  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }
  isAllowed() {
    return(this.account.balance - this.amount >= 0);
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);
t2 = new Withdrawal(50.25, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(50.25, myAccount);
t3.commit();
console.log('Transaction 2:', t3);

// t2 = new Withdrawal(9.99);
// t2.commit();
// console.log('Transaction 2:', t2);

// t3 = new Deposit(120.00);
// t3.commit();
// console.log('Transaction 3:', t3);

// console.log('Balance:', balance);

console.log('Ending Balance:', myAccount.balance);
