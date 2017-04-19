import {Component, IEvent, IEventArgs} from "../platform/components/Component";
import {EmittedCode} from "../platform/components/code-emitter/EmittedCode";
import {Control} from "../platform/components/gui/Control";
import {appState} from "../platform/AppState";
import jqxWidgetOptions = jqwidgets.PanelOptions;
import {PanelDock} from "../platform/components/gui/SplitPanel";
import {getAllObjectProps} from "../platform/utils/getAllObjectProps";
import {PropertyEditor, PropertyEditorCategories} from "./PropertyEditor";
import {getRandomId} from "../app/utils/getRandomId";
import {escapeHtml} from "../platform/utils/escapeHtml";
import * as R from "ramda";


export class PropertiesEditor extends Control {

    constructor() {
        super();
        this.renderJqxWidgetAfterChildren = true;
    }

    jqxWidget(...args: any[]): Function {
        return this.$.jqxPanel(...args);
    };

    // ------------------------------ editedObject ------------------------------
    _editedObject: Component;
    get editedObject(): Component {
        return this._editedObject;
    }

    set editedObject(value: Component) {
        this._editedObject = value;
        if (this.$)
            this.renderEditors();
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
                this.jqxWidget({height: "98%"} as jqxWidgetOptions);
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
            opt.height = "98%";
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
                this.jqxWidget({width: "98%"} as jqxWidgetOptions);
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
            opt.width = "98%";
        else
            opt.width = this.width;
    }

    renderBody() {
//        this.$ = $("<div style='border: 1px solid green' id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);
        this.$ = $("<div style='width:100px;height: 100px; border: 0px solid red'><table id='" + this.$id + "' style='border:0px solid green; width:95%;border-spacing:0;'></table></div>").appendTo(this.parent.$childrenContainer);

    }

    renderEditors() {

        $("#"+this.$id).empty();

        let allCategories:string[]=R.clone(PropertyEditorCategories);
        let categories:string[]=[];

        let propEditors: PropertyEditor[] = [];

        for (let propName of getAllObjectProps(this.editedObject)) {
            if (propName.startsWith("__getPropertyEditor_")) {
                let pe = ((this.editedObject as any)[propName]).call(this);
                pe.component = this.editedObject;
                allCategories.push(pe.category);
                categories.push(pe.category);
                propEditors.push(pe);
            }
        }

        allCategories=R.uniq(allCategories);

        for (let category of allCategories) {

            if (R.contains(category,categories)) {
                let $catagoryTr = $("<tr><td colspan='2' style='text-align: right; font-weight: bold; font-size: 11px; padding-top: 7px; padding-bottom: 5px;  padding-left: 5px;padding-right: 5px'>" + escapeHtml(category) + "</td><td></td></tr>");
                $catagoryTr.appendTo($("#" + this.$id));

                for (let pe of propEditors) {
                    if (pe.category === category) {
                        let $peId = getRandomId();
                        let $tr = $("<tr id='" + $peId + "'><td style='min-width: 50px; padding-left: 5px;padding-right: 5px'>" + escapeHtml((pe.title || pe.propertyName).toString()) + "</td> <td id='" + $peId + "-input'></td></tr>");
                        $tr.appendTo($("#" + this.$id));
                        pe.render($("#" + $peId + "-input"));
                    }
                }
            }
        }
        console.log("propEditors", propEditors);

    }

}