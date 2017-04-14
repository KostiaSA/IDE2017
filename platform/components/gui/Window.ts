import {Component} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {IDesigner} from "../../designer/IDesigner";
import jqxWidgetOptions = jqwidgets.WindowOptions;


export class Window extends Component {
    constructor() {
        super();
    }

    jqxWidget(...args: any[]): Function {
        return this.$.jqxWindow(...args);
    };

    // ------------------------------ top ------------------------------
    _top: number;
    get top(): number {
        return this._top;
    }

    set top(value: number) {
        this._top = value;
        if (this.$ && value)
            this.jqxWidget({position: {y: this._top, x: this._left}} as jqxWidgetOptions);
    }

    private __emitCode_top(code: EmittedCode) {
        code.emitNumberValue(this, "top");
    }

    private __fillOptions_top(opt: jqxWidgetOptions) {
        opt.position = {y: this._top, x: this._left}
    }


    // ------------------------------ left ------------------------------
    _left: number;
    get left(): number {
        return this._left;
    }

    set left(value: number) {
        this._left = value;
        if (this.$ && value)
            this.jqxWidget({position: {y: this._top, x: this._left}} as jqxWidgetOptions);
    }

    private __emitCode_left(code: EmittedCode) {
        code.emitNumberValue(this, "left");
    }

    private __fillOptions_left(opt: jqxWidgetOptions) {
        opt.position = {y: this._top, x: this._left}
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
        if (this.$)
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
        return $("#" + this.$contentId);
    }


    renderBody() {

        //this._height = this._height || 600;
        //this._width = this._width || 500;

        this.$ = $("<div id='" + this.$id + "'><div id='" + this.$titleId + "'>.</div><div id='" + this.$contentId + "' style='position: relative'></div></div>").appendTo($("#content"));
    }
}