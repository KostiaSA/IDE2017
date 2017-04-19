import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import PanelOptions = jqwidgets.PanelOptions;
import {isString} from "util";

export class SplitPanelItem extends Control {

    // ------------------------------ size ------------------------------
    _size: string | number;
    get size(): string | number {
        return this._size;
    }

    set size(value: string | number) {
        this._size = value;
        //if (this.$)
        //  this.$.size(this.size);
    }

    private __emitCode_size(code: EmittedCode) {
        if (isString(this.size))
            code.emitStringValue(this, "size");
        else
            code.emitNumberValue(this, "size");
    }

    private __setOptions_size() {
        this.size = this._size;
    }


    // ------------------------------ size ------------------------------
    render() {
        if (!this.initialized)
            this.init();
        this.$ = $("<div style='border: 0px solid orange'></div>").appendTo(this.parent.$childrenContainer);
        this.renderChildren();
    }

}