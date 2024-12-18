import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEmptyTransactionsTemplate() {
    return `<p>Нет операций для отображения.</p>`;
}

export default class EmptyTransactionsComponent extends AbstractComponent {
    get template() {
        return createEmptyTransactionsTemplate();
    }
}