import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import PanelOptions = jqwidgets.PanelOptions;
import {isString} from "util";
import {escapeHtml} from "../../utils/escapeHtml";

export class Tab extends Component {
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
        this.$ = $("<div style='position: relative'></div>").appendTo(this.parent.$childrenContainer);
        this.$li = $("<li>" + escapeHtml(this.title) + "</li>").appendTo(this.parent.$childrenContainer.find("ul").first());
        this.renderChildren();
    }

}