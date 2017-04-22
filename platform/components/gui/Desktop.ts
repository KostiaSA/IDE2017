import {Window} from "./Window";
import {DivPanel} from "./DivPanel";
import {Button} from "./Button";
import {Component, IEventArgs} from "../Component";

export class Desktop {
    windows: Window[] = [];

    taskbar: DivPanel = new DivPanel();

    render() {
        for (let w of this.windows) {
            w.render();
        }

        this.taskbar.padding = "4px";
        this.taskbar.parent = new Component();
        this.taskbar.parent.$childrenContainer = $("#taskbar");
        for (let win of this.windows) {
            this.taskbar.childrenAdd(win.taskbarButtton);
        }
        this.taskbar.render();
    }

    removeWindowAfterClose(w: Window) {
        let index = this.windows.indexOf(w);
        if (index >= 0)
            this.windows.splice(index, 1);

        index = this.taskbar.children.indexOf(w.taskbarButtton);
        if (index >= 0)
            this.taskbar.children.splice(index, 1);
        this.taskbar.reRender();
    }

    openWindow(w: Window) {
        this.windows.push(w);
        w.render();
        this.taskbar.childrenAdd(w.taskbarButtton);
        this.taskbar.reRender();
    }
}