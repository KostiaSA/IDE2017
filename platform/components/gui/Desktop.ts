import {Window} from "./Window";

export class Desktop {
    windows: Window[] = [];

    render() {
        for (let w of this.windows) {
            w.render();
        }
    }

    openWindow(w: Window) {
        this.windows.push(w);
        w.render();
    }
}