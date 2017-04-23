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
        let needRefresh = this._activeComponent !== value;
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

            (this.toolbar as any).parent = {};
            (this.toolbar as any).parent.$childrenContainer = $("#toolbar");
            this.toolbar.render();
        });
        //ReactDOM.render(<App/>, document.getElementById("content"));
    }


    test1() {
        console.log("test1");
    }
}


export let appState = new AppState();
appState.startApp();

////////////////////////////////////////////////////


// class Point {
//     public x: number;
//     public y: number;
// }


// class Person_ {
//     lastName: string;
 //}

type Constructor<T> = new(...args: any[]) => T;

class E {

}

function Point<T extends Constructor<{}>>(Base: T) {
    return class extends Base {
        public x: number;
        public y: number;
        constructor(...args: any[]) {
            super(...args);
            //          this._tag = "";
        }
    }
}

function Person<T extends Constructor<Component>>(Base: T) {
    return class extends Base {
        lastName: string;
        constructor(...args: any[]) {
            super(...args);
            //          this._tag = "";
        }
    }
}


export class But extends Person(Point(Component)) {
    text: string;
}

let but=new But();
but.text="wwwwww";
but.x=100;
but.lastName="lastna";
but.afterRender()
console.log(but);

//const TaggedPoint = MixOf(Point);

//let point1 = new (MixOf(Point))();

//let point = new TaggedPoint();
//point._tag = "hello";


appState.test1();

