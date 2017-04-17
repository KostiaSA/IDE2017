import {Component, IEvent, IEventArgs} from "../../Component";
import {EmittedCode} from "../../code-emitter/EmittedCode";
import {appState} from "../../../AppState";

import jqxWidgetOptions = jqwidgets.ToolBarOptions;
import {Button} from "../Button";
import {IDesigner} from "../../../designer/IDesigner";


export interface IToolBarItem {
    group: string;
    separator: boolean;
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

    // ------------------------------ group ------------------------------
    _groups: string[];
    get groups(): string[] {
        return this._groups;
    }

    set groups(value: string[]) {
        this._groups = value;
        //if (this.$)
        //  this.$.groups(this.groups);
    }

    private __emitCode_groups(code: EmittedCode) {
        code.emitStringValue(this, "groups");
    }

    private __setOptions_groups() {
        this.groups = this._groups;
    }

    // ------------------------------ render ------------------------------
    renderChildren() {

        let items: IToolBarItem[] = [];

        for (let group of this.groups) {

            for (let child of this.children) {
                if ((child as any as IToolBarItem).group === group) {
                    items.push(child as any as IToolBarItem);
                    let last = items.slice(-1)[0];
                    let prev = items.slice(-2, -1)[0];
                    if (last && prev && last.group !== prev.group)
                        prev.separator = true;
                }
            }
        }

        for (let child of this.children) {
            if (items.indexOf(child as any as IToolBarItem) === -1) {
                items.push(child as any as IToolBarItem);
                let last = items.slice(-1)[0];
                let prev = items.slice(-2, -1)[0];
                if (last && prev && last.group !== prev.group)
                    prev.separator = true;
            }
        }

        items.forEach((item) => {
            item.renderItem();
        })
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