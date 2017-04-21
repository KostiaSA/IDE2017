import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import PanelOptions = jqwidgets.PanelOptions;
import {isString} from "util";
import {PropertyEditor, Категория_РазмерПозиция, Категория_Содержимое} from "../../../designer/PropertyEditor";
import {StringPropertyEditor} from "../../../designer/StringPropertyEditor";
import {NumberPropertyEditor} from "../../../designer/NumberPropertyEditor";

export class SplitPanelItem extends Control {

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

    private __getPropertyEditor_size(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.propertyName = "size";
        pe.category = Категория_РазмерПозиция;
        return pe;
    }

    // ------------------------------ minSize ------------------------------
    _minSize: number;
    get minSize(): number {
        return this._minSize;
    }

    set minSize(value: number) {
        this._minSize = value;
        //if (this.$)
        //  this.$.minSize(this.minSize);
    }

    private __emitCode_minSize(code: EmittedCode) {
        code.emitNumberValue(this, "minSize");
    }

    private __setOptions_minSize() {
        this.minSize = this._minSize;
    }

    private __getPropertyEditor_minSize(): PropertyEditor {
        let pe = new NumberPropertyEditor();
        pe.propertyName = "minSize";
        pe.category = Категория_РазмерПозиция;
        return pe;
    }


    // ------------------------------ render ------------------------------
    render() {
        if (!this.initialized)
            this.init();
        this.$ = $("<div></div>").appendTo(this.parent.$childrenContainer);
        this.__setOptions_padding();
        this.renderChildren();
    }

}