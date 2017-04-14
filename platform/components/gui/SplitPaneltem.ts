import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import PanelOptions = jqwidgets.PanelOptions;

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
        super.renderBody();
        this.$ = $("<div style='border: 0px solid orange' id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);
        // let panelOptions: PanelOptions = {
        //     //autoUpdate:true,
        //     theme: appState.theme,
        // };
        //
        // this.$.jqxPanel(panelOptions);
    }

    // не удалять
    renderProperties() {
    }

    emitCode(code: EmittedCode) {
        super.emitCode(code);
        //code.emitBooleanValue(this, "autoSize", false);
    }

}