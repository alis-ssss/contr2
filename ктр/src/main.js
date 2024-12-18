import FormAddTransactionComponent from './view/form-add-transaction-component.js';
import TransactionsModel from './model/transactions-model.js';
import TransactionsPresenter from './presenter/transactions-presenter.js';
import { render, RenderPosition } from './framework/render.js';

const transactionsBoardContainer = document.querySelector('.transactions-container');
const formContainer = document.querySelector('.form-container');

const transactionsModel = new TransactionsModel();
const transactionsPresenter = new TransactionsPresenter({
    boardContainer: transactionsBoardContainer,
    transactionsModel: transactionsModel,
});

const formAddTransactionComponent = new FormAddTransactionComponent({
    onSubmit: (type, category, amount) => {
        transactionsModel.addTransaction(type, category, amount);
    },
});

render(formAddTransactionComponent, formContainer, RenderPosition.AFTERBEGIN);
transactionsPresenter.init();