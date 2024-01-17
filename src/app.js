import { FavoritesView } from "./views/favorites.js";
import { MainView } from "./views/main/main.js";

class App {
    routes = [
        {path: "", view: MainView},
        {path: "#favorites", view: FavoritesView}
    ];

    appState = {
        favorites: []
    }

    constructor() {
        this.route()
        window.addEventListener('hashchange', this.route.bind(this));
    }   

    route() {
        if (this.currentViev) {
            this.currentViev.destroy();
        }
        console.log('location hash -> ', location.hash)
        const view = this.routes.find(r => r.path == location.hash).view
        this.currentViev = new view(this.appState);
        this.currentViev.render()
    }
}

new App();