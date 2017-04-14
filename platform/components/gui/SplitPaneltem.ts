import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import PanelOptions = jqwidgets.PanelOptions;
import {isString} from "util";

export class SplitPanelItem extends Control {

    // --- size ---
    protected _size: string | number;
    get size(): string | number {
        return this._size;
    }

    set size(value: string | number) {
        this._size = value;
        //if (this.$)
        //  this.$.size(this.size);
    }


    renderBody() {
//        this.$ = $("<div style='border: 0px solid orange' id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);
        this.$ = $("<div style='border: 0px solid orange'></div>").appendTo(this.parent.$childrenContainer);
    }

    // не удалять
    renderProperties() {
    }

    emitCode(code: EmittedCode) {
        super.emitCode(code);
        if (isString(this.size))
            code.emitStringValue(this, "size");
        else
            code.emitNumberValue(this, "size");
    }

}