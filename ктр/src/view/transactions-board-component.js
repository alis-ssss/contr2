import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTransactionsBoardTemplate() {
    return `<div class="transactions-board"></div>`;
}

export default class TransactionsBoardComponent extends AbstractComponent {
    get template() {
        return createTransactionsBoardTemplate();
    }

    getElement() {
        return this.element.querySelector('.transactions-board');
    }
}