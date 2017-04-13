import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import LayoutOptions = jqwidgets.LayoutOptions;

export class Layout extends Control {

    // --- autoSize ---
    protected _autoSize: boolean = false;
    get autoSize(): boolean {
        return this._autoSize;
    }

    set autoSize(value: boolean) {
        this._autoSize = value;
        this.autoSize_change();
    }

    autoSize_change() {
        if (this.$) {
            this.$.jqxLayout({sizeMode: this.autoSize === true ? "wrap" : "fixed"} as LayoutOptions);
        }
    }


    height_change() {
        super.height_change();
        if (this.$)
            this.$.jqxLayout({height: this.height + "px"} as LayoutOptions);
    }

    width_change() {
        super.width_change();
        if (this.$)
            this.$.jqxLayout({width: this.width + "px"} as LayoutOptions);
    }

    renderBody() {
        super.renderBody();
        this.$ = $("<div style='border: 1px solid red' id='" + this.$id + "'></div>").appendTo($("#" + this._parentId));
        let LayoutOptions: LayoutOptions = {
            theme: appState.theme,
        };

        this.$.jqxLayout(LayoutOptions);
    }

    renderProperties() {
        super.renderProperties();
        this.autoSize_change();
    }

    emitCode(code: EmittedCode) {
        super.emitCode(code);
    }

}