import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";

import jqxWidgetOptions = jqwidgets.InputOptions;
import {
    PropertyEditor, Категория_ПривязкаДанных, Категория_РазмерПозиция,
    Категория_Содержимое
} from "../../../designer/PropertyEditor";
import {StringPropertyEditor} from "../../../designer/StringPropertyEditor";
import {NumberPropertyEditor} from "../../../designer/NumberPropertyEditor";
import {isBoolean, isNumber, isString} from "util";
import {escapeHtml} from "../../utils/escapeHtml";

export type InputValueType = "auto" | "string" | "number" | "boolean";

export class Input extends Component {

    constructor() {
        super();
    }

    jqxWidget(...args: any[]): Function {
        if (this._designer)
            return this.$.jqxButton(...args);
        else {
            if (this.actualValueType === "string")
                return this.$.jqxInput(...args);
            else if (this.actualValueType === "number")
                return this.$.jqxInput(...args);
            else if (this.actualValueType === "boolean") {
                return this.$.jqxCheckBox(...args);
            }
            else
                throw "Input.jqxWidget(): actualValueType '" + this.actualValueType + "'  для '" + this.bindProperty + "'";

        }
    };

    get actualValueType(): InputValueType {
        if (this.valueType === "auto") {
            if (this.bindObject && this.bindObject[this.bindProperty] !== undefined) {
                let value = this.bindObject[this.bindProperty];
                if (isString(value))
                    return "string";
                else if (isNumber(value))
                    return "number";
                else if (isBoolean(value))
                    return "boolean";
                else
                    throw "Input.actualValueType(): неизвестный тип переменной '" + this.bindProperty + "'";
            }
            else
                return "string";
        }
        else
            return this.valueType;
    }

    // ------------------------------ valueType ------------------------------
    _valueType: InputValueType = "auto";
    get valueType(): InputValueType {
        return this._valueType;
    }

    set valueType(value: InputValueType) {
        let needReloadPropertyEditor = this._valueType !== value;
        this._valueType = value;
        if (this.$ && needReloadPropertyEditor && this._designer) {
            this._designer.reloadPropertyEditor();
        }
    }

    private __emitCode_valueType(code: EmittedCode) {
        code.emitStringValue(this, "valueType", "auto");
    }

    private __setOptions_valueType() {
        this.valueType = this._valueType;
    }

    private __getPropertyEditor_valueType(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.propertyName = "valueType";
        pe.category = Категория_ПривязкаДанных;
        return pe;
    }


    // ------------------------------ bindObject ------------------------------
    _bindObject: any;
    get bindObject(): any {
        return this._bindObject;
    }

    set bindObject(value: any) {
        this._bindObject = value;
        if (this.$) {
            if (this._designer) {
                this.$.text("[" + this._bindProperty + "]:" + this.valueType);
            }
            else {
                if (this.bindObject && this.$.val() !== this.bindObject[this.bindProperty])
                    this.$.val(this.bindObject[this.bindProperty]);
            }
        }

    }

    private __emitCode_bindObject(code: EmittedCode) {
        //code.emitobjectValue(this, "bindObject");
    }

    private __setOptions_bindObject() {
        this.bindObject = this._bindObject;
    }

    // ------------------------------ bindProperty ------------------------------
    _bindProperty: string;
    get bindProperty(): string {
        return this._bindProperty;
    }

    set bindProperty(value: string) {
        this._bindProperty = value;
        if (this.$) {
            if (this._designer) {
                this.$.text("[" + this._bindProperty + "]:" + this.valueType);
            }
            else {
                if (this.bindObject && this.$.val() !== this.bindObject[this.bindProperty])
                    this.$.val(this.bindObject[this.bindProperty]);
            }
        }
    }

    private __emitCode_bindProperty(code: EmittedCode) {
        code.emitStringValue(this, "bindProperty");
    }

    private __setOptions_bindProperty() {
        this.bindProperty = this._bindProperty;
    }

    private __getPropertyEditor_bindProperty(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.propertyName = "bindProperty";
        pe.category = Категория_ПривязкаДанных;
        return pe;
    }

    // ------------------------------ title ------------------------------
    _title: string;
    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    private __emitCode_title(code: EmittedCode) {
        code.emitStringValue(this, "title");
    }

    private __setOptions_title() {
        this.title = this._title;
    }

    private __getPropertyEditor_title(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.propertyName = "title";
        pe.category = Категория_ПривязкаДанных;
        return pe;
    }

    // ------------------------------ top ------------------------------
    _top: number;
    get top(): number {
        return this._top;
    }

    set top(value: number) {
        this._top = value;
        if (this.$ && value) {
            this.$.css("top", value + "px");
            this.$.css("position", "absolute");
        }
    }

    private __emitCode_top(code: EmittedCode) {
        code.emitNumberValue(this, "top");
    }

    private __setOptions_top() {
        this.top = this._top;
    }

    private __getPropertyEditor_top(): PropertyEditor {
        let pe = new NumberPropertyEditor();
        pe.propertyName = "top";
        pe.category = Категория_РазмерПозиция;
        // pe.visible = () => pe.component.valueType === "auto";
        return pe;
    }


    // ------------------------------ left ------------------------------
    _left: number;
    get left(): number {
        return this._left;
    }

    set left(value: number) {
        this._left = value;
        if (this.$ && value) {
            this.$.css("left", value + "px");
            this.$.css("position", "absolute");
        }
    }

    private __emitCode_left(code: EmittedCode) {
        code.emitNumberValue(this, "left");
    }

    private __setOptions_left() {
        this.left = this._left;
    }

    private __getPropertyEditor_left(): PropertyEditor {
        let pe = new NumberPropertyEditor();
        pe.propertyName = "left";
        pe.category = Категория_РазмерПозиция;
        return pe;
    }

    // ------------------------------ height ------------------------------
    _height: number = 18;
    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        if (this.$ && value)
            this.jqxWidget({height: value} as jqxWidgetOptions);
    }

    private __emitCode_height(code: EmittedCode) {
        code.emitNumberValue(this, "height", 18);
    }

    private __fillOptions_height(opt: jqxWidgetOptions) {
        opt.height = this.height;
    }

    // ------------------------------ width ------------------------------
    _width: number | string = 200;
    get width(): number | string {
        return this._width;
    }

    set width(value: number | string) {
        this._width = value;
        if (this.$ && value)
            this.jqxWidget({width: value} as jqxWidgetOptions);
    }

    private __emitCode_width(code: EmittedCode) {
        code.emitNumberValue(this, "width", 200);
    }

    private __fillOptions_width(opt: jqxWidgetOptions) {
        opt.width = this.width;
    }

    // // ------------------------------ onClick ------------------------------
    // _onClick: IEvent<IEventArgs>;
    // get onClick(): IEvent<IEventArgs> {
    //     return this._onClick;
    // }
    //
    // set onClick(value: IEvent<IEventArgs>) {
    //     this._onClick = value;
    //     if (this.$ && this._onClick) {
    //         this.$.on("click", () => {
    //             let args: IEventArgs = {
    //                 sender: this
    //             };
    //             this._onClick.call(this._owner, args);
    //         })
    //     }
    // }
    //
    // private __setOptions_onClick() {
    //     this.onClick = this._onClick;
    // }
    //
    // private __emitCode_onClick(code: EmittedCode) {
    //     code.emitEventValue(this, "onClick");
    // }


    // ------------------------------ render ------------------------------
    $lastPropValue: any;

    renderBody() {

        if (this._designer) {
            this.$ = $("<div data-component='" + this.constructor.name + "'></div>").appendTo(this.parent.$childrenContainer);
            this.$.on("mousedown", this.designModeOnMouseDown);
        }
        else {

            if (this.actualValueType === "string") {
                this.$ = $("<input data-component='" + this.constructor.name + "'></input>").appendTo(this.parent.$childrenContainer);
            }
            else if (this.actualValueType === "number") {
                this.$ = $("<input data-component='" + this.constructor.name + "'></input>").appendTo(this.parent.$childrenContainer);
            }
            else if (this.actualValueType === "boolean") {
                this.$ = $("<div data-component='" + this.constructor.name + "'><span style='margin-left: 5px'>" + escapeHtml(this.title || this.bindProperty) + "</span></div>").appendTo(this.parent.$childrenContainer);
                this.jqxWidget({animationShowDelay: 0, animationHideDelay: 0});
                this.$.children().first().css("margin-left",0);
            }
            else
                throw "Input.renderBody(): неизвестный тип переменной '" + this.actualValueType + "' для '" + this.bindProperty + "'";

            if (this.bindObject)
                this.jqxWidget("val", this.$lastPropValue);

            this.$.on('change', (event: any) => {
                var value = this.$.val();
                this.bindObject[this.bindProperty] = value;
            });


            setInterval(() => {
                if (!this._designer && this.$ && this.bindObject && this.$lastPropValue !== this.bindObject[this.bindProperty]) {
                    this.$lastPropValue = this.bindObject[this.bindProperty];
                    if (this.$lastPropValue !== this.$.jqxInput("val")) {
                        this.jqxWidget("val", this.$lastPropValue);
                    }
                }
            }, 50);
        }
    }

    //
    // setJqxWidgetOptions() {
    //     super.setJqxWidgetOptions();
    //     this.onClick = this._onClick;
    //     this.text = this._text;
    // }
    //
    // emitCode(code: EmittedCode) {
    //     super.emitCode(code);
    //     code.emitStringValue(this, "text");
    //     code.emitEventValue(this, "onClick");
    // }

}