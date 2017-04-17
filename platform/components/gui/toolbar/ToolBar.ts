import {Component, IEvent, IEventArgs} from "../../Component";
import {EmittedCode} from "../../code-emitter/EmittedCode";
import {appState} from "../../../AppState";

import jqxWidgetOptions = jqwidgets.ToolBarOptions;
import {Button} from "../Button";
import {IDesigner} from "../../../designer/IDesigner";


export interface IToolBarItem {
    renderItem: () => void;
}

export class ToolBar extends Component {

    constructor() {
        super();
    }

    jqxWidget(...args: any[]): Function {
        return this.$.jqxToolBar(...args);
    };

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

    // ------------------------------ render ------------------------------
    renderChildren() {
        for (let child of this.children) {
            (child as any as IToolBarItem).renderItem();
        }
    }



    fillJqxWidgetOptions(opt: any) {
        opt.initTools = () => {
        }; // не удалять, без этой пустышки не работает
    }


    // ------------------------------ onClick ------------------------------
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


}