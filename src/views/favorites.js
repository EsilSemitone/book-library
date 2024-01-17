import onChange from "on-change";
import { AbstractView } from "../common/view";
import { Header } from "../components/header/header";
import { FavoritesCardConteiner } from "../components/favorites_Card_Conteiner/favorites_Card_Conteiner";

export class FavoritesView extends AbstractView {

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this))
        this.setTitle('Избранное');
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    appStateHook(path) {
        if (path == 'favorites') {
            this.render()
        }
    }

    render() {
        const main = document.createElement('div');
        main.append(new FavoritesCardConteiner(this.appState).render());
        this.app.innerHTML = '';
        this.app.append(main)

        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header)
    }
}