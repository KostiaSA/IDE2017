import {Component, IComponentRegistration, IEvent, IEventArgs, Компоненты_Панели} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import jqxWidgetOptions = jqwidgets.PanelOptions;
import {PanelDock} from "./SplitPanel";
import {PropertyEditor, Категория_РазмерПозиция} from "../../../designer/PropertyEditor";
import {StringPropertyEditor} from "../../../designer/StringPropertyEditor";
import {isString} from "util";


export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Панели,
        componentClass: Panel,
        image: "vendor/fugue/icons/ui-panel.png",
        title: "панель"
    }
}

export class Panel extends Control {

    constructor() {
        super();
        this.renderJqxWidgetAfterChildren = true;
    }

    jqxWidget(...args: any[]): Function {
        return this.$.jqxPanel(...args);
    };

    // // ------------------------------ _autoSize ------------------------------
    // protected _autoSize: boolean = false;
    // get autoSize(): boolean {
    //     return this._autoSize;
    // }
    //
    // set autoSize(value: boolean) {
    //     this._autoSize = value;
    //     this.autoSize_change();
    // }
    //
    // autoSize_change() {
    //     if (this.$) {
    //         this.$.jqxPanel({sizeMode: this.autoSize === true ? "wrap" : "fixed"} as PanelOptions);
    //     }
    // }


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

    private __getPropertyEditor__dock(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.comboType = "array";
        pe.comboItemsArray = ["none", "fill"];
        pe.propertyName = "comboType";
        pe.category = Категория_РазмерПозиция;
        return pe;
    }

    // ------------------------------ padding ------------------------------
    _padding: string | number;
    get padding(): string | number {
        return this._padding;
    }

    set padding(value: string | number) {
        this._padding = value;
        if (this.$) {
            if (isString(value))
                this.$.css("padding", this.padding);
            else
                this.$.css("padding", this.padding + "px");
        }
    }

    private __emitCode_padding(code: EmittedCode) {
        if (isString(this.padding))
            code.emitStringValue(this, "padding");
        else
            code.emitNumberValue(this, "padding");
    }

    private __setOptions_padding() {
        this.padding = this._padding;
    }

    private __getPropertyEditor_padding(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.propertyName = "padding";
        pe.category = Категория_РазмерПозиция;
        return pe;
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

    renderBody() {
        $("<div style='border: none;' id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);
    }

}