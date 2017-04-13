import {Window} from "./components/gui/Window";

export class Desktop {
    windows: Window[] = [];

    render() {

        for (let w of this.windows) {
            w.render(w, "content");
        }
    }
}