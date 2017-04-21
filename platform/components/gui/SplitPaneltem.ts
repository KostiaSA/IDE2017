import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import PanelOptions = jqwidgets.PanelOptions;
import {isString} from "util";
import {PropertyEditor, Категория_РазмерПозиция, Категория_Содержимое} from "../../../designer/PropertyEditor";
import {StringPropertyEditor} from "../../../designer/StringPropertyEditor";

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

    private __getPropertyEditor_size(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.propertyName = "size";
        pe.category = Категория_РазмерПозиция;
        return pe;
    }

    // ------------------------------ minSize ------------------------------
    _minSize: string | number;
    get minSize(): string | number {
        return this._minSize;
    }

    set minSize(value: string | number) {
        this._minSize = value;
        //if (this.$)
        //  this.$.minSize(this.minSize);
    }

    private __emitCode_minSize(code: EmittedCode) {
        if (isString(this.minSize))
            code.emitStringValue(this, "minSize");
        else
            code.emitNumberValue(this, "minSize");
    }

    private __setOptions_minSize() {
        this.minSize = this._minSize;
    }

    private __getPropertyEditor_minSize(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.propertyName = "minSize";
        pe.category = Категория_РазмерПозиция;
        return pe;
    }


    // ------------------------------ render ------------------------------
    render() {
        if (!this.initialized)
            this.init();
        this.$ = $("<div style='border: 0px solid orange'></div>").appendTo(this.parent.$childrenContainer);
        this.renderChildren();
    }

}