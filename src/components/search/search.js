import { DivComponent } from "../../common/div-component.js";
import './search.css'

export class Search extends DivComponent {
    constructor(state) {
        super();
        this.state = state;
    }

    search() {
        const value = this.el.querySelector('.search__input').value;
        this.state.searchQuery = value;
    }

    render() {
        this.el.classList.add('search');
        this.el.innerHTML = `
            <div class="search__wrapper">
                <input 
                    type="text" 
                    class="search__input" 
                    placeholder="Найти книгу или автора...."
                    value="${this.state.searchQuery ? this.state.searchQuery : ""}"
                />   
                <img src="/static/search.svg" alt="Поиск" />
            </div>
            <button><img src="/static/search_button.svg" alt="Поиск кнопка" /></button>
        `;

        this.el.querySelector('button').addEventListener('click', this.search.bind(this));
        this.el.querySelector('.search__input').addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                this.search();
            }
        })
        return this.el;
    }
}