import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";

import jqxWidgetOptions = jqwidgets.ButtonOptions;


export class Button extends Component {

    constructor() {
        super();
        this.jqxWidgetFunc = "jqxButton";
    }

    // ------------------------------ text ------------------------------
    _text: string;
    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
        if (this.$)
            this.$.text(this.text);
    }

    private __emitCode_text(code: EmittedCode) {
        code.emitStringValue(this, "text");
    }

    private __setOptions_text() {
        this.text = this._text;
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

    // ------------------------------ onClick ------------------------------
    _onClick: IEvent<IEventArgs>;
    get onClick(): IEvent<IEventArgs> {
        return this._onClick;
    }

    set onClick(value: IEvent<IEventArgs>) {
        this._onClick = value;
        if (this.$ && this._onClick) {
            this.$.on("click", () => {
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