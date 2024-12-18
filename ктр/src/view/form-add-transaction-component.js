import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormAddTransactionTemplate() {
    return `<form class="add-transaction__form" aria-label="Форма добавления операции">
            <select id="type" required>
                <option value="">Выберите тип операции</option>
                <option value="income">Доход</option>
                <option value="expense">Расход</option>
            </select>
            <select id="category" required>
                <option value="">Выберите категорию</option>
                <option value="salary">Зарплата</option>
                <option value="food">Еда</option>
                <option value="transport">Транспорт</option>
                <option value="entertainment">Развлечения</option>
            </select>
            <input type="number" id="amount" placeholder="Сумма" required />
            <button type="submit">Добавить операцию</button>
        </form>`;
}

export default class FormAddTransactionComponent extends AbstractComponent {
    constructor({ onSubmit }) {
        super();
        this._handleSubmit = onSubmit;
        this.element.addEventListener('submit', this._submitHandler.bind(this));
    }

    get template() {
        return createFormAddTransactionTemplate();
    }

    _submitHandler(evt) {
        evt.preventDefault();
        const type = this.element.querySelector('#type').value;
        const category = this.element.querySelector('#category').value;
        const amount = parseFloat(this.element.querySelector('#amount').value);
        this._handleSubmit(type, category, amount);
        this.element.reset();
    }
}