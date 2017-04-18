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

    // ------------------------------ separator ------------------------------
    _separator: boolean;
    get separator(): boolean {
        return this._separator;
    }

    set separator(value:  boolean) {
        this._separator = value;
        //if (this.$)
        //  this.$.separator(this.separator);
    }

    private __emitCode_separator(code: EmittedCode) {
        code.emitStringValue(this, "separator");
    }

    private __setOptions_separator() {
        this.separator = this._separator;
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

    // ------------------------------ group ------------------------------
    _group: string;
    get group(): string {
        return this._group;
    }

    set group(value: string) {
        this._group = value;
        //if (this.$)
        //  this.$.group(this.group);
    }

    private __emitCode_group(code: EmittedCode) {
        code.emitStringValue(this, "group");
    }

    private __setOptions_group() {
        this.group = this._group;
    }

    // ------------------------------ renderItem ------------------------------
    renderItem() {
        this.parent.jqxWidget("addTool", "button", "last", this.separator, (type: string, $tool: any) => {
            this.$ = $tool;
            if (this.image) {
                let button = $("<div>" + "<img src='" + this.image + "'/>" + "</div>");
                $tool.append(button);
            }
            else {
                $tool.text(this.text);
            }
            this.__setOptions_onClick();
            //$tool.jqxButton();
        });

    }

    render(designer?: IDesigner) {
    }


}