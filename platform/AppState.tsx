import * as React from "react";
import * as  ReactDOM from "react-dom";
import {App} from "../app/App";
import {Application} from "../app/components/Application";
import {createTestApplication} from "../test/createTestApplication";
import {createTestApplication2} from "../test/createTestApplication2";
import {Desktop} from "./Desktop";


export class AppState {
    //application: Application;
    desktop: Desktop = new Desktop();

    theme: string = "office";

    startApp() {
        $.jqx.theme = "office";
        //this.application = new Application();
        //createTestApplication();
        createTestApplication2();

        $(document).ready(() => {
            this.desktop.render();
        });
        //ReactDOM.render(<App/>, document.getElementById("content"));
    }
}

export let appState = new AppState();