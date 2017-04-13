import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import PanelOptions = jqwidgets.PanelOptions;

export class LayoutPanel extends Control {

    // height_change() {
    //     super.height_change();
    //     if (this.$)
    //         this.$.jqxPanel({height: this.height + "px"} as PanelOptions);
    // }
    //
    // width_change() {
    //     super.width_change();
    //     if (this.$)
    //         this.$.jqxPanel({width: this.width + "px"} as PanelOptions);
    // }

    renderBody() {
        super.renderBody();
        this.$ = $("<div style='border: 1px solid blue' id='" + this.$id + "'></div>").appendTo(this.parent.$);
        let panelOptions: PanelOptions = {
            autoUpdate:true,
            theme: appState.theme,
        };

        this.$.jqxPanel(panelOptions);
    }

    renderProperties() {
        super.renderProperties();
    }

    emitCode(code: EmittedCode) {
        super.emitCode(code);
        code.emitBooleanValue(this, "autoSize", false);
    }

}