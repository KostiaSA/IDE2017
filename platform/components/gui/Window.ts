import {Component} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {IDesigner} from "../../designer/IDesigner";
import jqxWidgetOptions = jqwidgets.WindowOptions;
import {BaseDesigner_Panel} from "../../../designer/BaseDesigner_Panel";
import {FormDesigner_Panel} from "../../../designer/FormDesigner_Panel";


export class Window extends Component {
    constructor() {
        super();
    }

    jqxWidget(...args: any[]): Function {
        if (this._designer)
            return this.$.jqxPanel(...args);
        else
            return this.$.jqxWindow(...args);
    };

    getDesignerPanel(): BaseDesigner_Panel {
        return new FormDesigner_Panel();
    }

    // ------------------------------ top ------------------------------
    _top: number;
    get top(): number {
        return this._top;
    }

    set top(value: number) {
        this._top = value;
        if (this.$ && value) {
            if (!this._designer)
                this.jqxWidget({position: {y: this._top, x: this._left}} as jqxWidgetOptions);
            else {
                this.$.css("top", "10px");
                this.$.css("position", "absolute");
            }

        }
    }

    private __emitCode_top(code: EmittedCode) {
        code.emitNumberValue(this, "top");
    }

    private __fillOptions_top(opt: jqxWidgetOptions) {
        if (!this._designer)
            opt.position = {y: this._top, x: this._left}
    }

    private __setOptions_top() {
        if (this._designer)
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
            if (!this._designer)
                this.jqxWidget({position: {y: this._top, x: this._left}} as jqxWidgetOptions);
            else {
                this.$.css("left", "10px");
                this.$.css("position", "absolute");
            }
        }
    }

    private __emitCode_left(code: EmittedCode) {
        code.emitNumberValue(this, "left");
    }

    private __fillOptions_left(opt: jqxWidgetOptions) {
        if (!this._designer)
            opt.position = {y: this._top, x: this._left}
    }

    private __setOptions_left() {
        if (this._designer)
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
            this.jqxWidget({height: value} as jqxWidgetOptions);
    }

    private __emitCode_height(code: EmittedCode) {
        code.emitNumberValue(this, "height");
    }

    private __fillOptions_height(opt: jqxWidgetOptions) {
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
            this.jqxWidget({width: value} as jqxWidgetOptions);
    }

    private __emitCode_width(code: EmittedCode) {
        code.emitNumberValue(this, "width");
    }

    private __fillOptions_width(opt: jqxWidgetOptions) {
        opt.width = this.width;
    }


    // ------------------------------ title ------------------------------
    private _title: string = "окно";
    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
        if (this.$ && !this._designer)
            $("#" + this.$titleId).text(this.title);
    }

    private __setOptions_title() {

        this.title = this._title;
    }

    private __emitCode_title(code: EmittedCode) {
        code.emitStringValue(this, "title", "окно");
    }


    // ------------------------------ render ------------------------------
    get $titleId(): string {
        return this.$id + "-title";
    }

    get $contentId(): string {
        return this.$id + "-content";
    }

    get $childrenContainer(): JQuery {
        if (this._designer)
            return this.$;
        else
            return $("#" + this.$contentId);
    }


    renderBody() {

        //this._height = this._height || 600;
        //this._width = this._width || 500;
        if (this._designer) {
            this.$ = $("<div id='" + this.$id + "' style='position: relative; padding: 10px'></div>").appendTo(this.parent.$childrenContainer);
            // this.$.on("mousedown", this.designModeOnMouseDown);
            this.$.resizable({
                grid: 1,
            });
        }
        else {
            this.$ = $("<div id='" + this.$id + "'><div id='" + this.$titleId + "'>.</div><div id='" + this.$contentId + "'  style='border-color:red; padding: 0; position: relative'></div></div>").appendTo($("#content"));
            this.$.on("resizing", () => {
                this.doLayout();
            });

        }

    }

    fillJqxWidgetOptions(opt: jqxWidgetOptions) {
        if (!this._designer) {
            opt.minHeight = 100;
            opt.minWidth = 100;
            opt.maxHeight = 5000;
            opt.maxWidth = 5000;
        }
    }

}