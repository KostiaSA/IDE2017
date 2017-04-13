import {Component} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";

export class Control extends Component {

    // --- visible ---
    private _visible: boolean = true;
    get visible(): boolean {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
    }


    emitCode(code: EmittedCode, level: number) {
        super.emitCode(code, level);
        code.emitBooleanValue(this, "visible", true);
    }

}