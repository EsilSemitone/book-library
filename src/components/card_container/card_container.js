
import { DivComponent } from '../../common/div-component';
import { Card } from '../card/card';
import './card_container.css'

export class CardContainer extends DivComponent {
    constructor(appState, parentState) {
        super();
        this.appState = appState;
        this.parentState = parentState
    }   


    render() {
        if (this.parentState.loading) {
            this.el.innerHTML = `
                <h1 class="card_container__loader">Загрузка...</h1>`
            return this.el;
        }

        this.el.classList.add('cards__container');
        this.el.innerHTML = `
            <h1 class="cards_container__title">Найдено книг - ${this.parentState.numFound}</h1>
            <div class="card__container_wrapper"</div>
        `
        const container = this.el.querySelector('.card__container_wrapper');

        for (const card of this.parentState.list) {
            container.append(new Card(this.appState, card).render())
        }
        return this.el;
    }
}