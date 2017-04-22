import * as React from "react";
import * as  ReactDOM from "react-dom";
import {App} from "../app/App";
import {createTestApplication2} from "../test/createTestApplication2";
import {Desktop} from "./components/gui/Desktop";
import {ToolBar} from "./components/gui/toolbar/ToolBar";
import {AppToolBar} from "./components/gui/AppToolBar";
import {Component} from "./components/Component";


export class AppState {
    //application: Application;
    desktop: Desktop = new Desktop();
    toolbar: AppToolBar = new AppToolBar();

    _activeWindow: Window;
    get activeWindow(): Window {
        return this._activeWindow;
    }

    set activeWindow(value: Window) {
        this._activeWindow = value;
        //if (this.$)
        //  this.$.text(this.text);
    }

    _activeComponent: Component;
    get activeComponent(): Component {
        return this._activeComponent;
    }

    set activeComponent(value: Component) {
        let needRefresh=this._activeComponent !== value;
        this._activeComponent = value;
        if (needRefresh)
            this.toolbar.refresh();
    }


    theme: string = "office";

    startApp() {
        ($ as any).jqx.theme = "office";
        //this.application = new Application();
        //createTestApplication();
        createTestApplication2();

        $(document).ready(() => {
            this.desktop.render();

            (this.toolbar as any).parent={};
            (this.toolbar as any).parent.$childrenContainer=$("#toolbar");
            this.toolbar.render();
        });
        //ReactDOM.render(<App/>, document.getElementById("content"));
    }
}


export let appState = new AppState();

appState.startApp();
