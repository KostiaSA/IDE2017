import {Component, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {IDesigner} from "../../designer/IDesigner";
import jqxWidgetOptions = jqwidgets.WindowOptions;
import {BaseDesigner_Panel} from "../../../designer/BaseDesigner_Panel";
import {FormDesigner_Panel} from "../../../designer/FormDesigner_Panel";
import {appState} from "../../AppState";
import {Button} from "./Button";
import {PropertyEditor, Категория_Содержимое} from "../../../designer/PropertyEditor";
import {IconPropertyEditor} from "../../../designer/IconPropertyEditor";


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
        if (this.$ && !this._designer) {
            $("#" + this.$titleId).text(this.title);
            this.taskbarButtton.text = this.title;
        }
        // if (this.$ && !this._designer)
        //     this.jqxWidget({title: value} as jqxWidgetOptions);
    }

    private __setOptions_title() {

        this.title = this._title;
    }

    private __emitCode_title(code: EmittedCode) {
        code.emitStringValue(this, "title", "окно");
    }

    // ------------------------------ icon ------------------------------
    _icon: string = "vendor/fugue/icons/application-blue.png";
    get icon(): string {
        return this._icon;
    }

    set icon(value: string) {
        this._icon = value;
        if (this.$ && this._icon) {
            $("#" + this.$iconId).attr("src", this.icon);
            this.taskbarButtton.icon = this.icon;

        }
    }

    private __emitCode_icon(code: EmittedCode) {
        code.emitStringValue(this, "icon", "vendor/fugue/icons/application-blue.png");
    }

    private __setOptions_icon() {
        this.icon = this._icon;
    }

    private __getPropertyEditor_icon(): PropertyEditor {
        let pe = new IconPropertyEditor();
        pe.propertyName = "icon";
        pe.category = Категория_Содержимое;
        return pe;
    }

    // ------------------------------ render ------------------------------
    get $titleId(): string {
        return this.$id + "-title";
    }

    get $contentId(): string {
        return this.$id + "-content";
    }

    get $iconId(): string {
        return this.$id + "-title-icon";
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
            $("<div id='" + this.$id + "' style='position: relative; padding: 10px'></div>").appendTo(this.parent.$childrenContainer);
            // this.$.on("mousedown", this.designModeOnMouseDown);
            this.$.resizable({
                grid: 1,
            });
        }
        else {
            //this.$ = $("<div id='" + this.$id + "'><div id='" + this.$titleId + "'><span><img id='" + this.$titleId + "' src='vendor/fugue/icons/application-blue.png' style='vertical-align: middle; margin-right: 5px' />XXX</span></div><div id='" + this.$contentId + "'  style='padding: 0; position: relative'></div></div>").appendTo($("#content"));

            let html = `
                <div id='` + this.$id + `'>
                  <div >
                    <span>
                       <img id='` + this.$iconId + `' src='${this.icon}' style='vertical-align: middle; margin-right: 5px'/>
                       <span id='` + this.$titleId + `'>XXXXXX</span>  
                    </span>
                  </div>
                  <div id='` + this.$contentId + `'  style='padding: 0; position: relative'></div>
                </div>
                `;

            $(html).appendTo($(`#content`));
            this.$.on("resizing", () => {
                this.doLayout();
            });
            this.$.on("close", () => {
                this.jqxWidget("destroy");
                appState.desktop.removeWindowAfterClose(this);
            });
            this.$.on("click", () => {
                this.bringToFront();
            });

        }

    }

    fillJqxWidgetOptions(opt: jqxWidgetOptions) {
        if (!this._designer) {
            opt.minHeight = 100;
            opt.minWidth = 100;
            opt.maxHeight = 5000;
            opt.maxWidth = 5000;
            opt.showCloseButton = true;
            opt.animationType = "none";
            opt.keyboardCloseKey = 0;
        }
    }

    private _taskbarButtton: Button;
    get taskbarButtton(): Button {
        if (!this._taskbarButtton) {
            this._taskbarButtton = new Button();
            this._taskbarButtton.text = this.title;
            this._taskbarButtton.icon = this.icon;
            this._taskbarButtton.onClick = (args: IEventArgs) => {
                this.bringToFront();
            };
        }
        return this._taskbarButtton;
    }

    bringToFront() {
        if (this.$)
            this.jqxWidget("bringToFront");
    }

}