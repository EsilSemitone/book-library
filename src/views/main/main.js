import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardContainer } from "../../components/card_container/card_container.js";

export class MainView extends AbstractView {

    state = {
        list: [],
        numFound: 0,
        loading: false,
        searchQuery: undefined,
        offset: 0
    }

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this))
        this.state = onChange(this.state, this.stateHook.bind(this) )
        this.setTitle('Поиск книг');
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    appStateHook(path) {
        if (path == 'favorites') {
            console.log('favorites ', this.appState.favorites)
            this.render()
        }
    }

    async stateHook(path, value) {
        if (path === "searchQuery") {
            this.state.loading = true;
            console.log('Загрузка')
            const {docs, numFound} = await this.loadList(value, this.state.offset);
            console.log(numFound)
            this.state.list = docs
            this.state.numFound = numFound
            this.state.loading = false;
            console.log(this.state.list)
            

        }
        if (path === 'list' || path === 'loading') {
            this.render();
        }
    }

    async loadList(q, offset) {
        try {
            const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`)
            return res.json();
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const main = document.createElement('div');
        main.append(new Search(this.state).render());
        main.append(new CardContainer(this.appState ,this.state).render());
        this.app.innerHTML = '';
        this.app.append(main)

        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header)
    }
}