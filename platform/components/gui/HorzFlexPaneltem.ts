import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";


import {isString} from "util";
import {
    PropertyEditor, Категория_DragDrop, Категория_ПривязкаДанных, Категория_РазмерПозиция,
    Категория_Содержимое
} from "../../../designer/PropertyEditor";
import {StringPropertyEditor} from "../../../designer/StringPropertyEditor";
import {NumberPropertyEditor} from "../../../designer/NumberPropertyEditor";
import {BooleanPropertyEditor} from "../../../designer/BooleanPropertyEditor";
import {getRandomId} from "../../../app/utils/getRandomId";
import {IDesigner} from "../../designer/IDesigner";

export type HorzFlexPanelItemType = "top" | "bottom" | "fill";

export class HorzFlexPanelItem extends Component {


    // ------------------------------ dock ------------------------------
    _dock: HorzFlexPanelItemType = "top";
    get dock(): HorzFlexPanelItemType {
        return this._dock;
    }

    set dock(value: HorzFlexPanelItemType) {
        let needRerender = this._dock !== value;
        this._dock = value;
        if (this.$) {
            if (this.dock === "fill") {
                this.$.css("flex", "1 0 auto");
                this.$.css("height", "10px");
            }
            else{
                this.$.css("flex", "0 0 auto");
            }
            if (needRerender) {
                this.__setOptions_size();
                this.parent.reRender();
                console.log("reRender-flex");
            }
        }
        // if (this.$ && needReloadPropertyEditor && this._designer) {
        //     this._designer.reloadPropertyEditor();
        // }
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
        pe.comboItemsArray = ["top", "bottom", "fill"];
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
    _size: number;
    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
        if (this.$) {
            if (this.dock === "top" || this.dock === "bottom") {
                if (this._designer) {
                    if (this.size)
                        this.$.height(this.size + "px");
                    else
                        this.$.height("50px");
                }
                else {
                    if (this.size && !this.sizeToContent)
                        this.$.height(this.size + "px");
                }
                this.$.css("flex", "0 auto")
            }
        }
    }

    private __setOptions_size() {
        this.size = this._size;
    }

    private __emitCode_size(code: EmittedCode) {
        code.emitNumberValue(this, "size");
    }

    private __getPropertyEditor_size(): PropertyEditor {
        let pe = new NumberPropertyEditor();
        pe.propertyName = "size";
        pe.category = Категория_РазмерПозиция;
        return pe;
    }

    // ------------------------------ sizeToContent ------------------------------
    private _sizeToContent: boolean = false;
    get sizeToContent(): boolean {
        return this._sizeToContent;
    }

    set sizeToContent(value: boolean) {
        this._sizeToContent = value;
        // if (this.$) {
        //     this.jqxWidget({sizeToContent: this._sizeToContent});
        // }
    }

    emitCode_sizeToContent(code: EmittedCode) {
        code.emitBooleanValue(this, "sizeToContent", false);
    }

    private __setOptions_sizeToContent() {
        this.sizeToContent = this._sizeToContent;
    }

    private __getPropertyEditor_sizeToContent(): PropertyEditor {
        let pe = new BooleanPropertyEditor();
        pe.propertyName = "sizeToContent";
        pe.category = Категория_РазмерПозиция;
        return pe;
    }

    // ------------------------------ render ------------------------------
    render(designer?: IDesigner) {
        this._designer = designer;

        if (!this.initialized)
            this.init();

        this._$id = getRandomId();
        this.beforeRender();

        this.$ = $("<div id='" + this._$id + "' style ='border: 1px solid red; position: relative' ></div>").appendTo(this.parent.$childrenContainer);

        //this.__setOptions_padding();

        for (let child of this.children) {
            child.render(this._designer);
        }

        this.setJqxWidgetOptions();

        //this.$.attr("dock", this.dock);
        // if (this.dock === "top" || this.dock === "bottom") {
        //     if (this._designer) {
        //         if (this.size)
        //             this.$.height(this.size + "px");
        //         else
        //             this.$.height("50px");
        //     }
        //     else {
        //         if (this.size && !this.sizeToContent)
        //             this.$.height(this.size + "px");
        //     }
        //     this.$.css("flex", "0 auto")
        // }
        // if (this.dock === "fill") {
        //     this.$.css("flex", "1 0 auto");
        //     this.$.css("height", "10px");
        // }

        this.afterRender();

    }

}