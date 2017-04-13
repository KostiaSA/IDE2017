import {Component} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {IDesigner} from "../../designer/IDesigner";
import WindowOptions = jqwidgets.WindowOptions;

export class Window extends Control {

    // --- title ---
    private _title: string = "окно";
    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
        if (this.$)
            $("#" + this.$titleId).text(this.title);
    }

    emitCode(code: EmittedCode) {
        super.emitCode(code);

        code.emitStringValue(this, "title", "окно");

    }

    get $titleId(): string {
        return this.$id + "-title";
    }

    get $contentId(): string {
        return this.$id + "-content";
    }

    get $childrenContainer(): JQuery {
        return $("#"+this.$contentId);
    }


    renderBody() {
        super.renderBody();

        this._height = this._height || 600;
        this._width = this._width || 500;

        this.$ = $("<div id='" + this.$id + "'><div id='" + this.$titleId + "'>.</div><div id='" + this.$contentId + "' style='position: relative'></div></div>").appendTo($("#content"));

        let opt: WindowOptions = {
            //opt.theme=appState.theme;
            position: {y: this.top, x: this.left},
            height: this.height,
            width: this.width,
        };

        this.$.jqxWindow(opt);

        this.title = this._title;

    }
}