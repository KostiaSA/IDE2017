import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";

import jqxWidgetOptions = jqwidgets.InputOptions;


export class Input extends Component {

    constructor() {
        super();
    }

    jqxWidget(...args: any[]): Function {
        if (this._designer)
            return this.$.jqxButton(...args);
        else
            return this.$.jqxInput(...args);
    };

    // ------------------------------ bindObject ------------------------------
    _bindObject: any;
    get bindObject(): any {
        return this._bindObject;
    }

    set bindObject(value: any) {
        this._bindObject = value;
        if (this.$) {
            if (this._designer) {
                this.$.text("[" + this._bindProperty + "]");
            }
            else {
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
                this.$.text("[" + this._bindProperty + "]");
            }
            else {
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
            this.$ = $("<input data-component='" + this.constructor.name + "'></input>").appendTo(this.parent.$childrenContainer);

            if (this.bindObject[this.bindProperty])
                this.$.val(this.bindObject[this.bindProperty]);

            this.$.on('change', (event: any) => {
                //var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
                var value = this.$.val();
                this.bindObject[this.bindProperty] = value;
                //console.log(value);

            });


            setInterval(() => {
                if (!this._designer && this.$ && this.bindObject && this.$lastPropValue !== this.bindObject[this.bindProperty]) {
                    this.$lastPropValue = this.bindObject[this.bindProperty];
                    this.$.jqxInput("val", this.$lastPropValue);
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