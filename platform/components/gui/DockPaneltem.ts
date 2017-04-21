import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import PanelOptions = jqwidgets.PanelOptions;
import {isString} from "util";
import {
    PropertyEditor, Категория_ПривязкаДанных, Категория_РазмерПозиция,
    Категория_Содержимое
} from "../../../designer/PropertyEditor";
import {StringPropertyEditor} from "../../../designer/StringPropertyEditor";
import {NumberPropertyEditor} from "../../../designer/NumberPropertyEditor";

export type DockPanelItemType = "top" | "left" | "right" | "bottom" | "fill";

export class DockPanelItem extends Control {


    // ------------------------------ dock ------------------------------
    _dock: DockPanelItemType = "top";
    get dock(): DockPanelItemType {
        return this._dock;
    }

    set dock(value: DockPanelItemType) {
        let needReloadPropertyEditor = this._dock !== value;
        this._dock = value;
        if (this.$ && needReloadPropertyEditor && this._designer) {
            this._designer.reloadPropertyEditor();
        }
    }

    private __emitCode_dock(code: EmittedCode) {
        code.emitStringValue(this, "dock", "top");
    }

    private __setOptions_dock() {
        this.dock = this._dock;
    }

    private __getPropertyEditor_dock(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.propertyName = "dock";
        pe.comboType = "array";
        pe.comboItemsArray = ["top", "left", "right", "bottom"];
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

    // ------------------------------ size ------------------------------
    _size: number = 50;
    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
        //if (this.$)
        //  this.$.size(this.size);
    }

    private __emitCode_size(code: EmittedCode) {
        code.emitNumberValue(this, "size", 50);
    }

    private __getPropertyEditor_size(): PropertyEditor {
        let pe = new NumberPropertyEditor();
        pe.propertyName = "size";
        pe.category = Категория_РазмерПозиция;
        return pe;
    }

    // ------------------------------ render ------------------------------
    render() {
        if (!this.initialized)
            this.init();

        this.beforeRender();

        // let styleStr = "";
        // if (this.dock === "top" || this.dock === "bottom")
        //     styleStr = "style='height:" + this.size + "px'";
        // else if (this.dock === "left" || this.dock === "right")
        //     styleStr = "style='width:" + this.size + "px'";

        this.$ = $("<div ></div>").appendTo(this.parent.$childrenContainer);

        this.__setOptions_padding();

        this.$.attr("dock", this.dock);
        if (this.dock === "top" || this.dock === "bottom") {
            this.$.height(this.size + "px");
            console.log(this.size + "px");
        }
        else if (this.dock === "left" || this.dock === "right")
            this.$.width(this.size + "px");


        for (let child of this.children) {
            child.render(this._designer);
        }

        this.afterRender();

    }

}