import jqxWidgetOptions = jqwidgets.ButtonOptions;
import {IDesigner} from "../../../designer/IDesigner";
import {Component, IEvent, IEventArgs} from "../../Component";
import {EmittedCode} from "../../code-emitter/EmittedCode";
import {IToolBarItem} from "./ToolBar";


export class ToolButton extends Component implements IToolBarItem {

    constructor() {
        super();
    }

    jqxWidget(...args: any[]): Function {

        return this.$.jqxButton(...args);
    };

    // ------------------------------ text ------------------------------
    _text: string;
    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
        //if (this.$)
          //  this.$.text(this.text);
    }

    private __emitCode_text(code: EmittedCode) {
        code.emitStringValue(this, "text");
    }

    private __setOptions_text() {
        this.text = this._text;
    }

    // ------------------------------ image ------------------------------
    _image: string;
    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
        //if (this.$)
          //  this.jqxWidget({imgSrc: this.image});
    }

    private __emitCode_image(code: EmittedCode) {
        code.emitStringValue(this, "image");
    }

    private __setOptions_image() {
        this.image = this._image;
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

    // ------------------------------ renderItem ------------------------------
    renderItem() {
        this.parent.jqxWidget("addTool", "button", "last", true, (type: string, $tool: any, menuToolIninitialization: boolean) => {
            this.$=$tool;
            // var width: number | string = 100;
            // if (menuToolIninitialization === true) {
            //     width = "100%";
            // }
            $tool.text(this.text);
            //$tool.jqxButton({ width: width , imgSrc:(child as Button).image});
        });

    }

    render(designer?: IDesigner) {
    }


}