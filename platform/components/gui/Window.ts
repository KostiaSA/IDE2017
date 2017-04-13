import {Component} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {IDesigner} from "../../designer/IDesigner";
import WindowOptions = jqwidgets.WindowOptions;

export class Window extends Control {

    // --- title ---
    private _title: string;
    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
        if (this.$)
            $("#" + this.$titleId).text(this.title);
    }

    emitCode(code: EmittedCode, level: number) {
        super.emitCode(code, level);

        code.emitStringValue(this, "title", level);

    }

    get $titleId(): string {
        return this.$id + "-title";
    }

    get $contentId(): string {
        return this.$id + "-content";
    }

    renderBody() {
        super.renderBody();

        this._height = this._height || 600;
        this._width = this._width || 500;

        let parent = $("#" + this._parentId);
        this.$ = $("<div id='" + this.$id + "'><div id='" + this.$titleId + "'>.</div><div id='" + this.$contentId + "'></div></div>").appendTo(parent);

        let opt: WindowOptions = {
            //opt.theme=appState.theme;
            position: {y: this.top, x: this.left},
            height: this.height,
            width: this.width,
        };

        this.$.jqxWindow(opt);

        this.title = this._title;


        // for (let c of this.controls) {
        //     c.$designer = this.$designer;
        //     c.show(this.$id + "content");
        // }
        //
        // this.$autoRunDisposer.push(autorunAsync(() => {
        //     $("#" + this.$id + "title").text(this.title);
        //     //this.width += 10;
        // }, 10));
        //
        // this.$autoRunDisposer.push(autorunAsync(() => {
        //     this.$native.jqxWindow({width: this.width});
        //     this.$native.jqxWindow({height: this.height});
        //     this.$native.jqxWindow({position: {y: this.top, x: this.left}});
        // }, 10));

    }
}