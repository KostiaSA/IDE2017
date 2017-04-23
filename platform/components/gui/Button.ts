import {Component, IComponentRegistration, IEvent, IEventArgs, Компоненты_Кнопки} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";

import jqxWidgetOptions = jqwidgets.ButtonOptions;
import {ToolButton} from "./toolbar/ToolButton";
import {getRandomId} from "../../../app/utils/getRandomId";
import {
    PropertyEditor, Категория_DragDrop, Категория_РазмерПозиция,
    Категория_Содержимое
} from "../../../designer/PropertyEditor";
import {NumberPropertyEditor} from "../../../designer/NumberPropertyEditor";
import {StringPropertyEditor} from "../../../designer/StringPropertyEditor";
import {BooleanPropertyEditor} from "../../../designer/BooleanPropertyEditor";
import {IconPropertyEditor} from "../../../designer/IconPropertyEditor";
import {isString} from "util";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";


export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Кнопки,
        componentClass: Button,
        image: "vendor/fugue/icons/ui-button.png",
        title: "кнопка"
    }
}


export class Button extends EnabledMixin(
    OnClickMixin(
        TopLeftMixin(
            HeightWidthMixin(
                Component
            )))) {


    constructor() {
        super();
    }

    get allowChildren(): boolean {
        return false;
    }

    jqxWidget(...args: any[]): Function {
        return this.$.jqxButton(...args);
    };

    designModeInitializeNew() {
        this._text = "Новая кнопка";
    }

    get height_default(): number | string {
        return 28;
    }


    // ------------------------------ text ------------------------------
    _text: string;
    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
        if (this.$) {
            this.jqxWidget("value", this.text);
        }
    }

    private __emitCode_text(code: EmittedCode) {
        code.emitStringValue(this, "text");
    }

    private __setOptions_text() {
        this.text = this._text;
    }

    private __fillOptions_text(opt: jqxWidgetOptions) {
        opt.value = this.text;
    }

    private __getPropertyEditor_text(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.propertyName = "text";
        pe.category = Категория_Содержимое;
        return pe;
    }

    // ------------------------------ icon ------------------------------
    _icon: string;
    get icon(): string {
        return this._icon;
    }

    set icon(value: string) {
        this._icon = value;
        if (this.$ && this._icon)
            this.jqxWidget({imgSrc: this._icon, imgPosition: "left", textImageRelation: "imageBeforeText"});
    }

    private __emitCode_icon(code: EmittedCode) {
        code.emitStringValue(this, "icon");
    }

    private __setOptions_icon() {
        this.icon = this._icon;
    }

    private __fillOptions_icon(opt: jqxWidgetOptions) {
        if (this.icon) {
            opt.imgSrc = this.icon;
            opt.imgPosition = "left";
            opt.textImageRelation = "imageBeforeText";
        }
    }

    private __getPropertyEditor_icon(): PropertyEditor {
        let pe = new IconPropertyEditor();
        pe.propertyName = "icon";
        pe.category = Категория_Содержимое;
        return pe;
    }


    // ------------------------------ render ------------------------------
    renderBody() {
        this.$ = $("<div style='display: inline-block' data-component='" + this.constructor.name + "' id='" + this._$id + "'></div>").appendTo(this.parent.$childrenContainer);
    }

    createAppToolBar() {
        let saveButton: ToolButton = new ToolButton();
        saveButton.group = "form-designer";
        saveButton.text = getRandomId();
        appState.toolbar.childrenAdd(saveButton);

    }


}