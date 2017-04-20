import {Component, IComponentRegistration, IEvent, IEventArgs, Компоненты_Панели} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import SplitterPanel = jqwidgets.SplitterPanel;
import {SplitPanelItem} from "./SplitPaneltem";

import jqxWidgetOptions = jqwidgets.SplitterOptions;

export type SplitPanelOrientation = "vertical" | "horizontal";
export type PanelDock = "none" | "fill";

export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Панели,
        componentClass: SplitPanel,
        image: "vendor/fugue/icons/ui-split-panel.png",
        title: "панель с разделителем"
    }
}

export class SplitPanel extends Component {

    constructor() {
        super();
        this.renderJqxWidgetAfterChildren = true;
    }

    jqxWidget(...args: any[]): Function {
        return this.$.jqxSplitter(...args);
    };

    // ------------------------------ dock ------------------------------
    _dock: PanelDock = "none";
    get dock(): PanelDock {
        return this._dock;
    }

    set dock(value: PanelDock) {
        let needRefresh = this._dock !== value;
        this._dock = value;
        if (this.$ && needRefresh) {
            this.top = this._top;
            this.left = this._left;
            this.width = this._width;
            this.height = this._height;
        }
    }

    private __emitCode_dock(code: EmittedCode) {
        code.emitStringValue(this, "dock", "none");
    }

    private __setOptions_dock() {
        this.dock = this._dock;
    }

    // ------------------------------ top ------------------------------
    _top: number;
    get top(): number {
        return this._top;
    }

    set top(value: number) {
        this._top = value;
        if (this.$ && value) {
            if (this.dock === "fill") {
                this.$.css("top", "0px");
            }
            else {
                this.$.css("top", value + "px");
                this.$.css("position", "absolute");
            }
        }
    }

    private __emitCode_top(code: EmittedCode) {
        code.emitNumberValue(this, "top");
    }

    private __setOptions_top() {
        this.top = this._top;
    }


    // ------------------------------ left ------------------------------
    _left: number;
    get left(): number {
        return this._left;
    }

    set left(value: number) {
        this._left = value;
        if (this.$ && value) {
            if (this.dock === "fill") {
                this.$.css("left", "0px");
            }
            else {
                this.$.css("left", value + "px");
                this.$.css("position", "absolute");
            }
        }
    }

    private __emitCode_left(code: EmittedCode) {
        code.emitNumberValue(this, "left");
    }

    private __setOptions_left() {
        this.left = this._left;
    }

    // ------------------------------ height ------------------------------
    _height: number;
    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        if (this.$ && value)
            if (this.dock === "fill") {
                this.jqxWidget({height: "100%"} as jqxWidgetOptions);
            }
            else {
                this.jqxWidget({height: value} as jqxWidgetOptions);
            }
    }

    private __emitCode_height(code: EmittedCode) {
        code.emitNumberValue(this, "height");
    }

    private __fillOptions_height(opt: jqxWidgetOptions) {
        if (this.dock === "fill")
            opt.height = "100%";
        else
            opt.height = this.height;
    }

    // ------------------------------ width ------------------------------
    _width: number;
    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        if (this.$ && value)
            if (this.dock === "fill") {
                this.jqxWidget({width: "100%"} as jqxWidgetOptions);
            }
            else {
                this.jqxWidget({width: value} as jqxWidgetOptions);
            }
    }

    private __emitCode_width(code: EmittedCode) {
        code.emitNumberValue(this, "width");
    }

    private __fillOptions_width(opt: jqxWidgetOptions) {
        if (this.dock === "fill")
            opt.width = "100%";
        else
            opt.width = this.width;
    }

    // ------------------------------ orientation ------------------------------
    _orientation: SplitPanelOrientation = "horizontal";
    get orientation(): SplitPanelOrientation {
        return this._orientation;
    }

    set orientation(value: SplitPanelOrientation) {
        this._orientation = value;
        if (this.$) {
            this.jqxWidget({orientation: this.orientation} as jqxWidgetOptions);
        }
    }

    private __emitCode_orientation(code: EmittedCode) {
        code.emitStringValue(this, "orientation", "horizontal");
    }

    private __fillOptions_orientation(opt: jqxWidgetOptions) {
        opt.orientation = this.orientation;
    }

    // ------------------------------ splitterVisible ------------------------------
    private _splitterVisible: boolean = true;
    get splitterVisible(): boolean {
        return this._splitterVisible;
    }

    set splitterVisible(value: boolean) {
        this._splitterVisible = value;
        if (this.$)
            this.$.jqxWidget({showSplitBar: value} as jqxWidgetOptions);
    }

    private __emitCode_splitterVisible(code: EmittedCode) {
        code.emitBooleanValue(this, "splitterVisible", true);
    }

    private __fillOptions_splitterVisible(opt: jqxWidgetOptions) {
        opt.showSplitBar = this.splitterVisible;
    }

    // ------------------------------ renderBody ------------------------------
    renderBody() {
        this.$ = $("<div style='border: 0px solid orange' id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);
    }

    getPanelsLayout(): SplitterPanel[] {
        return this.children.map((child: Component) => {
            return {size: (child as SplitPanelItem).size};
        });
    }


    fillJqxWidgetOptions(opt: jqxWidgetOptions) {
        opt.panels = this.getPanelsLayout();
        opt.splitBarSize = 3;
    }

    // renderChildren() {
    //     super.renderChildren();
    //     let panelOptions: jqxWidgetOptions = {
    //         theme: appState.theme,
    //         orientation: this.orientation,
    //         splitBarSize: 2,
    //         showSplitBar: this.splitterVisible,
    //         panels: this.getPanelsLayout(),
    //     };
    //     this.$.jqxSplitter(panelOptions);
    //     super.setJqxWidgetOptions();
    // }
    //
    // emitCode(code: EmittedCode) {
    //     super.emitCode(code);
    //     code.emitStringValue(this, "text");
    //     code.emitBooleanValue(this, "splitterVisible", true);
    //
    // }

}