import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import PanelOptions = jqwidgets.PanelOptions;
import {isString} from "util";
import {escapeHtml} from "../../utils/escapeHtml";
import {PropertyEditor, Категория_РазмерПозиция} from "../../../designer/PropertyEditor";
import {StringPropertyEditor} from "../../../designer/StringPropertyEditor";

export class Tab extends Component {

    // ------------------------------ padding ------------------------------
    _padding: string | number;
    get padding(): string | number {
        return this._padding;
    }

    set padding(value: string | number) {
        this._padding = value;
        if (this.$) {
            console.log("set padding -cccccccccccccccc",this.padding);
            if (isString(value))
                this.$.css("padding", this.padding);
            else
                this.$.css("padding", this.padding + "px");
        }
    }

    private __emitCode_padding(code: EmittedCode) {
        if (isString(this.padding))
            code.emitStringValue(this, "padding");
        else
            code.emitNumberValue(this, "padding");
    }

    private __setOptions_padding() {
        this.padding = this._padding;
    }

    private __getPropertyEditor_padding(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.propertyName = "padding";
        pe.category = Категория_РазмерПозиция;
        return pe;
    }

    // ------------------------------ title ------------------------------
    private _title: string = "tab";
    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
        if (this.$li)
            this.$li.text(this.title);
    }

    private __setOptions_title() {
        this.title = this._title;
    }

    private __emitCode_title(code: EmittedCode) {
        code.emitStringValue(this, "title", "tab");
    }

    // ------------------------------ onSelect ------------------------------
    _onSelect: IEvent<IEventArgs>;
    get onSelect(): IEvent<IEventArgs> {
        return this._onSelect;
    }

    set onSelect(value: IEvent<IEventArgs>) {
        this._onSelect = value;
        // if (this.$ && this._onSelect) {
        //     this.$.on("click", () => {
        //         let args: IEventArgs = {
        //             sender: this
        //         };
        //         this._onSelect.call(this._owner, args);
        //     })
        // }
    }

    // private __setOptions_onSelect() {
    //     this.onSelect = this._onSelect;
    // }

    private __emitCode_onSelect(code: EmittedCode) {
        code.emitEventValue(this, "onSelect");
    }

    // ------------------------------ render ------------------------------
    $li: JQuery;
    render() {
        if (!this.initialized)
            this.init();
        this.$ = $("<div style='border: none; padding: 0px; position: relative'></div>").appendTo(this.parent.$childrenContainer);
        this.$li = $("<li>" + escapeHtml(this.title) + "</li>").appendTo(this.parent.$childrenContainer.find("ul").first());
        this.__setOptions_padding();
        this.renderChildren();
    }

}