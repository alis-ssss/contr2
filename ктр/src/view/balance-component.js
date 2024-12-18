import { AbstractComponent } from "../framework/view/abstract-component.js";

function createBalanceTemplate(balance) {
    return `
        <div class="balance">
            <h2>Общий баланс: <span id="total-balance">${balance}</span> руб.</h2>
        </div>
    `;
}

export default class BalanceComponent extends AbstractComponent {
    #balance = 0;

    constructor(balance) {
        super();
        this.#balance = balance;
    }

    get template() {
        return createBalanceTemplate(this.#balance);
    }

    updateBalance(newBalance) {
        this.#balance = newBalance;
        this.element.querySelector('#total-balance').textContent = this.#balance;
    }
}