import {Component, IComponentRegistration, IEvent, IEventArgs, Компоненты_Списки} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";

import jqxWidgetOptions = jqwidgets.TreeOptions;
import {PanelDock} from "./SplitPanel";
import {
    PropertyEditor, PropertyEditorCategories, Категория_DragDrop,
    Категория_РазмерПозиция, Категория_Стиль
} from "../../../designer/PropertyEditor";
import {getRandomId} from "../../../app/utils/getRandomId";
import {escapeHtml} from "../../utils/escapeHtml";
import {isArray} from "util";
import {BooleanPropertyEditor} from "../../../designer/BooleanPropertyEditor";

export interface ITreeListItem {
    label?: string;
    value?: any;
    id?:string | number;
    checked?: boolean;
    disabled?: boolean;
    expanded?: boolean;
    selected?: boolean;
    items?:ITreeListItem[];
    html?: string;
    icon?: string;
    iconSize?: number;
}
/*
 label - sets the item's label.
 value - sets the item's value.
 html - item's html. The html to be displayed in the item.
 id - sets the item's id.
 disabled - sets whether the item is enabled/disabled.
 checked - sets whether the item is checked/unchecked(when checkboxes are enabled).
 expanded - sets whether the item is expanded or collapsed.
 selected - sets whether the item is selected.
 items - sets an array of sub items.
 icon - sets the item's icon(url is expected).
 iconsize - sets the size of the item's icon.
 */
export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Списки,
        componentClass: TreeList,
        image: "vendor/fugue/icons/document-tree.png",
        title: "иерархический список"
    }
}

export interface ITreeListEventArgs extends IEventArgs {
    item: ITreeListItem;
}

export class TreeList extends Component {

    constructor() {
        super();
        this.renderJqxWidgetAfterChildren = true;
    }

    jqxWidget(...args: any[]): Function {
        return this.$.jqxTree(...args);
    };

    // ------------------------------ allowDrag ------------------------------
    private _allowDrag: boolean = false;
    get allowDrag(): boolean {
        return this._allowDrag;
    }

    set allowDrag(value: boolean) {
        this._allowDrag = value;
        if (this.$) {
            this.jqxWidget({allowDrag: this._allowDrag});
        }
    }

    emitCode_allowDrag(code: EmittedCode) {
        code.emitBooleanValue(this, "allowDrag", false);
    }

    private __setOptions_allowDrag() {
        this.allowDrag = this._allowDrag;
    }

    private __getPropertyEditor_allowDrag(): PropertyEditor {
        let pe = new BooleanPropertyEditor();
        pe.propertyName = "allowDrag";
        pe.category = Категория_DragDrop;
        return pe;
    }


    // ------------------------------ allowDrop ------------------------------
    private _allowDrop: boolean = false;
    get allowDrop(): boolean {
        return this._allowDrop;
    }

    set allowDrop(value: boolean) {
        this._allowDrop = value;
        if (this.$) {
            this.jqxWidget({allowDrop: this._allowDrop});
        }
    }

    emitCode_allowDrop(code: EmittedCode) {
        code.emitBooleanValue(this, "allowDrop", false);
    }

    private __setOptions_allowDrop() {
        this.allowDrop = this._allowDrop;
    }

    private __getPropertyEditor_allowDrop(): PropertyEditor {
        let pe = new BooleanPropertyEditor();
        pe.propertyName = "allowDrop";
        pe.category = Категория_DragDrop;
        return pe;
    }


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
        if (this.$) {
            if (this.dock === "fill") {
                this.$.css("top", "0px");
            }
            else if (value) {
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
        if (this.$) {
            if (this.dock === "fill") {
                this.$.css("left", "0px");
            }
            else if (value) {
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
        if (this.$)
            if (this.dock === "fill") {
                this.jqxWidget({height: "100%"} as jqxWidgetOptions);
            }
            else if (value) {
                this.jqxWidget({height: value} as jqxWidgetOptions);
            }
    }

    private __emitCode_height(code: EmittedCode) {
        code.emitNumberValue(this, "height");
    }

    private __setOptions___emitCode_height() {
        this.height = this._height;
    }

    // ------------------------------ width ------------------------------
    _width: number;
    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        if (this.$)
            if (this.dock === "fill") {
                this.jqxWidget({width: "100%"} as jqxWidgetOptions);

            }
            else if (value) {
                this.jqxWidget({width: value} as jqxWidgetOptions);
            }
    }

    private __emitCode_width(code: EmittedCode) {
        code.emitNumberValue(this, "width");
    }

    private __setOptions___emitCode_width() {
        this.width = this._width;
    }

    // ------------------------------ noBorder ------------------------------
    private _noBorder: boolean = false;
    get noBorder(): boolean {
        return this._noBorder;
    }

    set noBorder(value: boolean) {
        this._noBorder = value;
        if (this.$) {
            if (this._noBorder && !this._designer)
                this.$.css("border", "none");
            else
                this.$.css("border", "");
        }
    }

    emitCode_noBorder(code: EmittedCode) {
        code.emitBooleanValue(this, "noBorder", false);
    }

    private __setOptions_noBorder() {
        this.noBorder = this._noBorder;
    }

    private __getPropertyEditor_noBorder(): PropertyEditor {
        let pe = new BooleanPropertyEditor();
        pe.propertyName = "noBorder";
        pe.category = Категория_Стиль;
        return pe;
    }

    // ------------------------------ dataSource ------------------------------
    _dataSource: Component | ITreeListItem[];
    get dataSource(): Component | ITreeListItem[] {
        return this._dataSource;
    }

    set dataSource(value: Component | ITreeListItem[]) {
        this._dataSource = value;
        if (this.$) {
            if (!value || isArray(value)) {
                //this.prepareDataSource(this.dataSource);
                this.$.jqxTree({source: this.dataSource, height:"100%"});
            }
            else if ((value as any).bindDownloadComplete && (value as any).buildHierarchy) { // это jqx.dataAdapter
                //this.prepareDataSource((value as any)._source);
                this.$.jqxTree({source: value});
            }
            else {
                //(window as any)["xxx"]=value; bindDownloadComplete
                //console.log(value);
                throw "не реализовано";
            }
        }
    }

    private __emitCode_dataSource(code: EmittedCode) {
        code.emitStringValue(this, "dataSource");
    }

    private __setOptions_dataSource() {
        this.dataSource = this._dataSource;
    }

    // private prepareDataSource(dataSource: Component | ITreeListItem[]) {
    //     // добавляем иконки
    //     if (isArray(dataSource)) {
    //         for (let item of dataSource as ITreeListItem[]) {
    //             if (!item.html && item.image) {
    //                 item.html = `<div><img width='16' height='16' style='float: left; margin-top: 1px; margin-right: 5px;' src='${item.image}'/>${escapeHtml(item.label!)}</div>`;
    //             }
    //         }
    //     }
    // }

    // ------------------------------ onDblClick ------------------------------
    _onDblClick: IEvent<ITreeListEventArgs>;
    get onDblClick(): IEvent<ITreeListEventArgs> {
        return this._onDblClick;
    }

    set onDblClick(value: IEvent<ITreeListEventArgs>) {
        this._onDblClick = value;
        if (this.$ && this._onDblClick) {
            let __this = this;
            this.$.find(".jqx-tree-item").dblclick((event: any) => {
                console.log("dbl-eventTarget", event.target);
                let args: ITreeListEventArgs = {
                    sender: this,
                    item: __this.$.jqxTree("getSelectedItem").value
                };
                this._onDblClick.call(this._owner, args);
            })
        }
    }

    private __setOptions_onDblClick() {
        this.onDblClick = this._onDblClick;
    }

    private __emitCode_onDblClick(code: EmittedCode) {
        code.emitEventValue(this, "onDblClick");
    }


    // ------------------------------ onChange ------------------------------
    _onChange: IEvent<ITreeListEventArgs>;
    get onChange(): IEvent<ITreeListEventArgs> {
        return this._onChange;
    }

    set onChange(value: IEvent<ITreeListEventArgs>) {
        this._onChange = value;
        if (this.$ && this._onChange) {
            let __this = this;
            this.$.on("change", (event: any) => {
                console.log("change-event.args.item", event.args.item);
                let args: ITreeListEventArgs = {
                    sender: __this,
                    item: event.args.item
                };
                this._onChange.call(this._owner, args);
            })
        }
    }

    private __setOptions_onChange() {
        this.onChange = this._onChange;
    }

    private __emitCode_onChange(code: EmittedCode) {
        code.emitEventValue(this, "onChange");
    }

    // ------------------------------ render ------------------------------
    renderBody() {
        // не убирать style='height: 100%'
        this.$ = $("<div data-component='" + this.constructor.name + "' id='" + this._$id + "' style='height: 100%'></div>").appendTo(this.parent.$childrenContainer);
    }

    doLayout() {
        if (this.$)
            this.jqxWidget("refresh");
        super.doLayout();
    }

}