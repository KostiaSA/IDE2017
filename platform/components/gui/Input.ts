import {
    Component, IComponentRegistration, IEvent, IEventArgs, Компоненты_Редакторы,
    Компоненты_Списки
} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";

import jqxWidgetOptions = jqwidgets.InputOptions;
import {
    PropertyEditor, Категория_ComboBox, Категория_ПривязкаДанных, Категория_РазмерПозиция,
    Категория_Содержимое
} from "../../../designer/PropertyEditor";
import {StringPropertyEditor} from "../../../designer/StringPropertyEditor";
import {NumberPropertyEditor} from "../../../designer/NumberPropertyEditor";
import {isArray, isBoolean, isNumber, isString} from "util";
import {escapeHtml} from "../../utils/escapeHtml";
import {jqxEnabledMixin} from "./mixin/jqxEnabledMixin";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";

export type InputValueType = "auto" | "string" | "number" | "boolean";
export type InputComboType = "none" | "array" | "sql" | "function" | "system";

export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Редакторы,
        componentClass: Input,
        image: "vendor/fugue/icons/ui-text-field.png",
        title: "поле ввода"
    }
}

export interface IComboBoxItem {
    label?: string;
    value?: any;
    checked?: boolean;
    disabled?: boolean;
    group?: string;
    hasThreeStates?: boolean;
    html?: string;
    image?: string;
}

export class Input extends jqxEnabledMixin(
    TopLeftMixin(
        HeightWidthMixin(
            Component
        ))) {

    constructor() {
        super();
    }

    get height_default(): number | string {
        return 18;
    }

    jqxWidget(...args: any[]): Function {
        if (this._designer)
            return this.$.jqxButton(...args);
        else {
            if (this.comboType !== "none")
                return this.$.jqxComboBox(...args);
            else if (this.actualValueType === "string")
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
        pe.comboType = "array";
        pe.comboItemsArray = ["auto", "string", "number", "boolean"];
        pe.category = Категория_ПривязкаДанных;
        return pe;
    }

    // ------------------------------ comboType ------------------------------
    _comboType: InputComboType = "none";
    get comboType(): InputComboType {
        return this._comboType;
    }

    set comboType(value: InputComboType) {
        let needReloadPropertyEditor = this._comboType !== value;
        this._comboType = value;

        if (this.$ && needReloadPropertyEditor) {
            if (this.comboType === "array")
                this.comboItemsArray = this._comboItemsArray;
        }

        if (this.$ && needReloadPropertyEditor && this._designer) {
            this._designer.reloadPropertyEditor();
        }
    }

    private __emitCode_comboType(code: EmittedCode) {
        code.emitStringValue(this, "comboType", "none");
    }

    private __setOptions_comboType() {
        this.comboType = this._comboType;
    }

    private __getPropertyEditor_comboType(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.comboType = "array";
        pe.comboItemsArray = ["none", "array", "sql", "function", "system"];
        pe.propertyName = "comboType";
        pe.category = Категория_ComboBox;
        return pe;
    }

    // ------------------------------ comboItemsArray ------------------------------
    _comboItemsArray: any[];
    get comboItemsArray(): any[] {
        return this._comboItemsArray;
    }

    set comboItemsArray(value: any[]) {
        this._comboItemsArray = value;
        if (this.$ && this.comboType === "array" && isArray(value)) {
            let comboSource = [];
            for (let item of value) {
                if (isString(item)) {   // массив строк
                    comboSource.push(item);
                }
                else if (isArray(item)) {   // [35,"ООО Удача"] - value,label
                    let comboItem: IComboBoxItem = {
                        value: item[0],
                        label: item[1],
                    };
                    comboSource.push(comboItem);
                }
                else
                    comboSource.push(item);  // объект в формате IComboBoxItem
            }
            this.jqxWidget({source: comboSource} as jqwidgets.ComboBoxOptions);
        }
    }

    // private __emitCode_comboItemsArray(code: EmittedCode) {
    //     code.emitStringValue(this, "comboItemsArray", "none");
    // }

    private __setOptions_comboItemsArray() {
        this.comboItemsArray = this._comboItemsArray;
    }

    // private __getPropertyEditor_comboItemsArray(): PropertyEditor {
    //     let pe = new StringPropertyEditor();
    //     pe.propertyName = "comboItemsArray";
    //     pe.category = Категория_ПривязкаДанных;
    //     return pe;
    // }


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



    // ------------------------------ render ------------------------------
    $lastPropValue: any;

    renderBody() {

        if (this._designer) {
            this.$ = $("<div id='" + this.$id + "' data-component='" + this.constructor.name + "'></div>").appendTo(this.parent.$childrenContainer);
            this.$.on("mousedown", this.designModeOnMouseDown);
        }
        else {
            if (this.comboType !== "none") {
                this.$ = $("<div id='" + this.$id + "' data-component='" + this.constructor.name + "'></div>").appendTo(this.parent.$childrenContainer);
                this.jqxWidget({animationType: "none", autoDropDownHeight: true});
                this.comboItemsArray = this._comboItemsArray;
            }
            else if (this.actualValueType === "string") {
                this.$ = $("<input  id='" + this.$id + "'  data-component='" + this.constructor.name + "'></input>").appendTo(this.parent.$childrenContainer);
            }
            else if (this.actualValueType === "number") {
                this.$ = $("<input  id='" + this.$id + "'  data-component='" + this.constructor.name + "'></input>").appendTo(this.parent.$childrenContainer);
            }
            else if (this.actualValueType === "boolean") {
                this.$ = $("<div data-component='" + this.constructor.name + "'><span style='margin-left: 5px'>" + escapeHtml(this.title || this.bindProperty) + "</span></div>").appendTo(this.parent.$childrenContainer);
                this.jqxWidget({animationShowDelay: 0, animationHideDelay: 0});
                this.$.children().first().css("margin-left", 0);
            }
            else
                throw "Input.renderBody(): неизвестный тип переменной '" + this.actualValueType + "' для '" + this.bindProperty + "'";

            if (this.bindObject)
                this.jqxWidget("val", this.bindObject[this.bindProperty]);

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


}