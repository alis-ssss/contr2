import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFilterTemplate() {
    return `
        <div class="filters">
            <h2>Фильтры</h2>
            <select id="type-filter">
                <option value="">Все операции</option>
                <option value="income">Доходы</option>
                <option value="expense">Расходы</option>
            </select>
            <select id="category-filter">
                <option value="">Все категории</option>
                <option value="salary">Зарплата</option>
                <option value="food">Еда</option>
                <option value="transport">Транспорт</option>
                <option value="entertainment">Развлечения</option>
            </select>
        </div>
    `;
}

export default class FilterComponent extends AbstractComponent {
    get template() {
        return createFilterTemplate();
    }

    setFilterChangeHandlers(onTypeChange, onCategoryChange) {
        this.element.querySelector('#type-filter').addEventListener('change', onTypeChange);
        this.element.querySelector('#category-filter').addEventListener('change', onCategoryChange);
    }
}