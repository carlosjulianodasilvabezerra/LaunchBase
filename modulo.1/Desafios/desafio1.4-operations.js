const user = {
  name: "Mariana",
  transactions: [],
  balance: 0
};

function createTransaction(transaction){

  user.transactions.push(transaction)

  if (transaction.type == 'credit'){
    user.balance = user.balance + transaction.value
  } else if (transaction.type == 'debit'){
    user.balance = user.balance - transaction.value
  }
}

function getHigherTransactionByType(type){
let highValue = 0
let highTransaction;
  for(let i = 0; i < user.transactions.length; i++){
    if(type == user.transactions[i].type && user.transactions[i].value > highValue){
      highValue = user.transactions[i].value
      highTransaction = user.transactions[i]
    }
  }
  console.log('Highest transactions: R$', highTransaction)
    
}

function getAverageTransactionValue(){
  let value = 0
  let transactions = 0
  for (let i = 0; i < user.transactions.length; i++){
    value = value + user.transactions[i].value
    transactions++
  }
  console.log(`${user.name}, your average transaction value is: R$`, (value / transactions).toFixed(2))
  return value / transactions
}

function getTransactionsCount(){
  let credit = 0
  let debit = 0

  for (let i = 0; i < user.transactions.length; i++){
    if (user.transactions[i].type == 'credit'){
      credit++
    }else if (user.transactions[i].type == 'debit'){
      debit++
    }
  }
const answer = {
  credit: credit++,
  debit: debit++
}
console.log("This is the number of transactions that you have made:", answer)
}



createTransaction({ type: 'credit', value: 327.23});
createTransaction({ type: 'credit', value: 80.25});
createTransaction({ type: 'credit', value: 132.27});
createTransaction({ type: 'debit', value: 45.32});
createTransaction({ type: 'debit', value: 97.23});
createTransaction({ type: 'debit', value: 153.87});

console.log(`${user.name}, seu saldo atual é de: R$`, (user.balance).toFixed(2));

getHigherTransactionByType("credit");
getHigherTransactionByType("debit");
getAverageTransactionValue();
getTransactionsCount();