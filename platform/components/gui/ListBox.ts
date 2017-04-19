import {Component, IComponentRegistration, IEvent, IEventArgs, Компоненты_Списки} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import jqxWidgetOptions = jqwidgets.ListBoxOptions;
import {PanelDock} from "./SplitPanel";
import {getAllObjectProps} from "../../utils/getAllObjectProps";
import {PropertyEditor, PropertyEditorCategories} from "../../../designer/PropertyEditor";
import {getRandomId} from "../../../app/utils/getRandomId";
import {escapeHtml} from "../../utils/escapeHtml";
import * as R from "ramda";
import {isArray} from "util";


export interface IListBoxItem {
    label?: string;
    value?: any;
    checked?: boolean;
    disabled?: boolean;
    group?: string;
    hasThreeStates?: boolean;
    html?: string;
}

export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Списки,
        componentClass: ListBox,
        image: "vendor/fugue/icons/ui-list-box-blue.png",
        title: "список"
    }
}


export class ListBox extends Component {

    constructor() {
        super();
        this.renderJqxWidgetAfterChildren = true;
    }

    jqxWidget(...args: any[]): Function {
        return this.$.jqxListBox(...args);
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

    // ------------------------------ dataSource ------------------------------
    _dataSource: Component | IListBoxItem[];
    get dataSource(): Component | IListBoxItem[] {
        return this._dataSource;
    }

    set dataSource(value: Component | IListBoxItem[]) {
        this._dataSource = value;
        if (this.$) {
            if (!value || isArray(value))
                this.$.jqxListBox({source: this.dataSource});
            else
                throw "не реализовано";
        }
    }

    private __emitCode_dataSource(code: EmittedCode) {
        code.emitStringValue(this, "dataSource");
    }

    private __setOptions_dataSource() {
        this.dataSource = this._dataSource;
    }

    // private __getPropertyEditor_dataSource(): PropertyEditor {
    //     let pe = new StringPropertyEditor();
    //     pe.propertyName = "dataSource";
    //     pe.category = Категория_Содержимое;
    //     return pe;
    // }

}