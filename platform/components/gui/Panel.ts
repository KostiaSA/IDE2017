import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import PanelOptions = jqwidgets.PanelOptions;

export class Panel extends Control {

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
            this.$.jqxPanel({sizeMode: this.autoSize === true ? "wrap" : "fixed"} as PanelOptions);
        }
    }


    height_change() {
        super.height_change();
        if (this.$)
            this.$.jqxPanel({height: this.height + "px"} as PanelOptions);
    }

    width_change() {
        super.width_change();
        if (this.$)
            this.$.jqxPanel({width: this.width + "px"} as PanelOptions);
    }

    renderBody() {
        super.renderBody();
        this.$ = $("<div style='border: 1px solid green' id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);
        let panelOptions: PanelOptions = {
            autoUpdate:true,
            theme: appState.theme,
        };

        this.$.jqxPanel(panelOptions);
    }

    renderProperties() {
        super.renderProperties();
        this.autoSize_change();
    }

    emitCode(code: EmittedCode) {
        super.emitCode(code);
        code.emitBooleanValue(this, "autoSize", false);
    }

}