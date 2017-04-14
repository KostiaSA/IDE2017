import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import SplitterOptions = jqwidgets.SplitterOptions;
import SplitterPanel = jqwidgets.SplitterPanel;
import {SplitPanelItem} from "./SplitPaneltem";

export type SplitPanelOrientation = "vertical" | "horizontal";

export class SplitPanel extends Control {

    // --- orientation ---
    protected _orientation: SplitPanelOrientation = "horizontal";
    get orientation(): SplitPanelOrientation {
        return this._orientation;
    }

    set orientation(value: SplitPanelOrientation) {
        this._orientation = value;
        if (this.$)
            this.$.jqxSplitter({orientation: this.orientation} as SplitterOptions);
    }


    // --- splitterVisible ---
    private _splitterVisible: boolean = true;
    get splitterVisible(): boolean {
        return this._splitterVisible;
    }

    set splitterVisible(value: boolean) {
        this._splitterVisible = value;
        if (this.$)
            this.$.jqxSplitter({showSplitBar: value} as SplitterOptions);
    }

    height_change() {
        super.height_change();
        if (this.$)
            this.$.jqxSplitter({height: this.height + "px"} as SplitterOptions);
    }

    width_change() {
        super.width_change();
        if (this.$)
            this.$.jqxSplitter({width: this.width + "px"} as SplitterOptions);
    }


    getPanelsLayout(): SplitterPanel[] {
        return this.children.map((child: Component) => {
            return {size: (child as SplitPanelItem).size};
        });
    }

    renderBody() {
        super.renderBody();
        this.$ = $("<div style='border: 1px solid orange' id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);

    }

    // не удалять
    renderProperties() {
    }

    renderChildren() {
        super.renderChildren();
        let panelOptions: SplitterOptions = {
            theme: appState.theme,
            orientation: this.orientation,
            splitBarSize: 2,
            showSplitBar: this.splitterVisible,
            panels: this.getPanelsLayout(),
        };
        this.$.jqxSplitter(panelOptions);
        super.renderProperties();
    }

    emitCode(code: EmittedCode) {
        super.emitCode(code);
        code.emitStringValue(this, "text");
        code.emitBooleanValue(this, "splitterVisible", true);

    }

}