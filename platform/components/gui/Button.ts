import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";


export class Button extends Control {

    // --- text ---
    protected _text: string;
    get text(): string {
        return this._text;
    }
    set text(value: string) {
        this._text = value;
        if (this.$)
            this.$.text(this.text);
    }

    // --- text ---
    protected _onClick: IEvent<IEventArgs>;
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

    renderBody() {
        super.renderBody();
        this.$ = $("<div id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);
        this.$.jqxButton({theme: appState.theme});
    }

    renderProperties() {
        super.renderProperties();
        this.onClick=this._onClick;
        this.text=this._text;
    }

    emitCode(code: EmittedCode) {
        super.emitCode(code);
        code.emitStringValue(this, "text");
        code.emitEventValue(this, "onClick");
    }

}