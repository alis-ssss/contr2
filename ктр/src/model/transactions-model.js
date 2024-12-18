import { generateId } from "../utils.js";
import { transactions } from "../mock/transactions.js";

export default class TransactionsModel {
    #transactions = transactions;
    #observers = [];

    get allTransactions() {
        return this.#transactions;
    }

    addTransaction(type, category, amount) {
        const newTransaction = {
            type,
            category,
            amount,
            id: generateId(),
        };
        this.#transactions.push(newTransaction);
        this._notifyObservers();
    }

    deleteTransaction(transactionId) {
        this.#transactions = this.#transactions.filter(transaction => transaction.id !== transactionId);
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter(obs => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach(observer => observer());
    }
}