import { DivComponent } from '../../common/div-component';
import { Card } from '../card/card';
import './favorites_Card_Conteiner.css'

export class FavoritesCardConteiner extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }   


    render() {
        this.el.classList.add('cards__container');
        this.el.innerHTML = `
            <h1 class="cards_container__title">Избранные книги</h1>
            <div class="card__container_wrapper"</div>
        `
        const container = this.el.querySelector('.card__container_wrapper');

        for (const card of this.appState.favorites) {
            container.append(new Card(this.appState, card).render())
        }
        return this.el;
    }
}