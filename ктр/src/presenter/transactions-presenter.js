import TransactionComponent from "../view/transaction-component.js";
import TransactionsBoardComponent from "../view/transactions-board-component.js";
import EmptyTransactionsComponent from "../view/empty-transactions-component.js";
import FilterComponent from "../view/filter-component.js"; 
import BalanceComponent from "../view/balance-component.js"; 
import { render } from "../framework/render.js";

export default class TransactionsPresenter {
    #boardContainer = null;
    #transactionsModel = null;
    #transactionsBoardComponent = new TransactionsBoardComponent();
    #filterComponent = new FilterComponent();
    #balanceComponent = null; 

    constructor({ boardContainer, transactionsModel }) {
        this.#boardContainer = boardContainer;
        this.#transactionsModel = transactionsModel;

        this.#transactionsModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#renderBoard();
    }

    #renderBoard() {
        render(this.#transactionsBoardComponent, this.#boardContainer);
        render(this.#filterComponent, this.#boardContainer);

        this.#balanceComponent = new BalanceComponent(this.#calculateTotalBalance());
        render(this.#balanceComponent, document.querySelector('.balance'));

        this.#filterComponent.setFilterChangeHandlers(
            this.#filterTransactions.bind(this), 
            this.#filterTransactions.bind(this) 
        );
        
        this.#filterTransactions();
    }

    #handleModelChange() {
        this.#clearBoard();
        document.querySelector(".balance").innerHTML = "";
        this.#renderBoard();
    }

    #clearBoard() {
        document.querySelector("#transactions-list").innerHTML = "";
    }

    #renderTransaction(transaction) {
        const transactionComponent = new TransactionComponent(
            transaction,
            this.#handleDeleteTransaction.bind(this)
        );
        render(transactionComponent, document.querySelector("#transactions-list"));
    }

    #filterTransactions() {
        const typeFilter = document.querySelector('#type-filter').value;
        const categoryFilter = document.querySelector('#category-filter').value;

        const filteredTransactions = this.#transactionsModel.allTransactions.filter(transaction => {
            const matchType = typeFilter ? transaction.type === typeFilter : true;
            const matchCategory = categoryFilter ? transaction.category === categoryFilter : true;
            return matchType && matchCategory;
        });

        this.#clearBoard();
        if (filteredTransactions.length === 0) {
            render(new EmptyTransactionsComponent(), document.querySelector("#transactions-list"));
        } else {
            filteredTransactions.forEach(transaction => this.#renderTransaction(transaction));
        }

        this.#updateTotalBalance(filteredTransactions);
    }

    #updateTotalBalance(transactions) {
        const totalBalance = this.#calculateTotalBalance(transactions);
        this.#balanceComponent.updateBalance(totalBalance); 
    }

    #calculateTotalBalance(transactions = this.#transactionsModel.allTransactions) {
        return transactions.reduce((total, transaction) => {
            return transaction.type === 'income' ? total + transaction.amount : total - transaction.amount;
        }, 0);
    }

    #handleDeleteTransaction(transactionId) {
        this.#transactionsModel.deleteTransaction(transactionId);
    }
}