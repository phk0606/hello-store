import { bankAccount } from './index';

function getBankAccounts() {
  return bankAccount.get('/getBankAccounts');
}

function createBankAccount(data) {
  return bankAccount.post('/createBankAccount', data);
}

function getBankAccount(data) {
  return bankAccount.get('/getBankAccount', { params: data });
}

function modifyBankAccount(data) {
  return bankAccount.put('/modifyBankAccount', data);
}

function removeBankAccount(data) {
  return bankAccount.delete('/removeBankAccount', { data });
}

export {
  getBankAccounts,
  createBankAccount,
  getBankAccount,
  modifyBankAccount,
  removeBankAccount,
};
