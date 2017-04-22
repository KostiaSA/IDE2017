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


export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Кнопки,
        componentClass: Button,
        image: "vendor/fugue/icons/ui-button.png",
        title: "кнопка"
    }
}


export class Button extends Component {


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
        //if (this.$ && this._icon)
          //  this.jqxWidget({imgSrc: this._icon});
    }

    private __emitCode_icon(code: EmittedCode) {
        code.emitStringValue(this, "icon");
    }

    private __setOptions_icon() {
        this.icon = this._icon;
    }

    private __fillOptions_icon(opt: jqxWidgetOptions) {
        //opt.imgSrc = this.icon;
    }

    private __getPropertyEditor_icon(): PropertyEditor {
        let pe = new IconPropertyEditor();
        pe.propertyName = "icon";
        pe.category = Категория_Содержимое;
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
            $("#"+this._$id).css("top", value + "px");
            $("#"+this._$id).css("position", "absolute");
            //this.$.css("top", value + "px");
            //this.$.css("position", "absolute");
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
            $("#"+this._$id).css("left", value + "px");
            $("#"+this._$id).css("position", "absolute");
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
        //opt.height = this.height;
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
        //opt.width = this.width;
    }

    // ------------------------------ enabled ------------------------------
    private _enabled: boolean = true;
    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: boolean) {
        this._enabled = value;
        if (this.$) {
            this.jqxWidget({disabled: !this._enabled});
        }
    }

    emitCode_enabled(code: EmittedCode) {
        code.emitBooleanValue(this, "enabled", true);
    }

    private __setOptions_enabled() {
        this.enabled = this._enabled;
    }

    private __getPropertyEditor_enabled(): PropertyEditor {
        let pe = new BooleanPropertyEditor();
        pe.propertyName = "enabled";
        pe.category = Категория_DragDrop;
        return pe;
    }


    // ------------------------------ onClick ------------------------------
    _onClick: IEvent<IEventArgs>;
    get onClick(): IEvent<IEventArgs> {
        return this._onClick;
    }

    set onClick(value: IEvent<IEventArgs>) {
        this._onClick = value;
        if (this.$ && this._onClick) {
            $("#"+this._$id).on("click", () => {
                let args: IEventArgs = {
                    sender: this
                };
                this._onClick.call(this._owner, args);
            })
        }
    }


    private __setOptions_onClick() {
        this.onClick = this._onClick;
    }

    private __emitCode_onClick(code: EmittedCode) {
        code.emitEventValue(this, "onClick");
    }

    // ------------------------------ render ------------------------------
    renderBody() {
        //this.$ = $("<span><div data-component='" + this.constructor.name + "' id='" + this._$id + "'></div></span>").appendTo(this.parent.$childrenContainer).children().first();
        this.$ = $("<div style='display: inline-block' data-component='" + this.constructor.name + "' id='" + this._$id + "'></div>").appendTo(this.parent.$childrenContainer);
    }

    createAppToolBar() {
        let saveButton: ToolButton = new ToolButton();
        saveButton.group = "form-designer";
        saveButton.text = getRandomId();
        appState.toolbar.childrenAdd(saveButton);

    }

    afterRender() {
        //this.jqxWidget({imgPosition: "left"});
        //$("#"+this._$id).css("display","inline-block");
        //this.$.css("margin-right","5px");
        //this.$.css("margin-bottom","5px");
    }

    // // ------------------------------ render ------------------------------
    // renderBody() {
    //     super.renderBody();
    //     this.$ = $("<div id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);
    //     this.$.jqxButton({theme: appState.theme} as jqxWidgetOptions);
    // }
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