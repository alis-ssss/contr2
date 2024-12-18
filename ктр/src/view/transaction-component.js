import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTransactionTemplate(transaction) {
    return `<div class="transaction ${transaction.type === 'income' ? 'income' : 'expense'}">
                <span>${transaction.type === 'income' ? 'Доход' : 'Расход'}: ${transaction.category} - ${transaction.amount} руб.</span>
                <button class="delete-button">Удалить</button>
            </div>`;
}

export default class TransactionComponent extends AbstractComponent {
    constructor(transaction, onDelete) {
        super();
        this._transaction = transaction;
        this._onDelete = onDelete;
        this._setDeleteHandler();
    }

    get template() {
        return createTransactionTemplate(this._transaction);
    }

    _setDeleteHandler() {
        this.element.querySelector('.delete-button')
            .addEventListener('click', this._handleDelete.bind(this));
    }

    _handleDelete() {
        this._onDelete(this._transaction.id);
    }
}