import * as fs from "fs";
import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";

import {getRandomId} from "../../../app/utils/getRandomId";
import {IDesigner} from "../../designer/IDesigner";
import {PanelDock} from "./SplitPanel";
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import IEditorOptions = monaco.editor.IEditorOptions;
import IEditorConstructionOptions = monaco.editor.IEditorConstructionOptions;


export class CodeEditor extends Component {

    constructor() {
        super();
    }

    // ------------------------------ code ------------------------------
    _code: string;
    get code(): string {
        return this._code;
    }

    set code(value: string) {
        this._code = value;
        //if (this.$)
        //  this.$.code(this.code);
    }

    // private __emitCode_code(code: EmittedCode) {
    //     code.emitStringValue(this, "code");
    // }

    private __setOptions_code() {
        this.code = this._code;
    }

    // ------------------------------ dock ------------------------------
    _dock: PanelDock = "none";
    get dock(): PanelDock {
        return this._dock;
    }

    set dock(value: PanelDock) {
        let needRefresh = this._dock !== value;
        this._dock = value;
        if (this.$ && needRefresh) {
            this.top = this._top;
            this.left = this._left;
            this.width = this._width;
            this.height = this._height;
        }
    }

    private __emitCode_dock(code: EmittedCode) {
        code.emitStringValue(this, "dock", "none");
    }

    private __setOptions_dock() {
        this.dock = this._dock;
    }

    // ------------------------------ top ------------------------------
    _top: number;
    get top(): number {
        return this._top;
    }

    set top(value: number) {
        this._top = value;
        if (this.$ && value) {
            if (this.dock === "fill") {
                this.$.css("top", "0px");
            }
            else {
                this.$.css("top", value + "px");
                this.$.css("position", "absolute");
            }
        }
    }

    private __emitCode_top(code: EmittedCode) {
        code.emitNumberValue(this, "top");
    }

    private __setOptions_top() {
        this.top = this._top;
    }


    // ------------------------------ left ------------------------------
    _left: number;
    get left(): number {
        return this._left;
    }

    set left(value: number) {
        this._left = value;
        if (this.$ && value) {
            if (this.dock === "fill") {
                this.$.css("left", "0px");
            }
            else {
                this.$.css("left", value + "px");
                this.$.css("position", "absolute");
            }
        }
    }

    private __emitCode_left(code: EmittedCode) {
        code.emitNumberValue(this, "left");
    }

    private __setOptions_left() {
        this.left = this._left;
    }

    // ------------------------------ height ------------------------------
    _height: number;
    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        if (this.$ && value)
            if (this.dock === "fill") {
                this.$.css({height: "100%"});
            }
            else {
                this.$.css({height: value + "px"});
            }
    }

    private __emitCode_height(code: EmittedCode) {
        code.emitNumberValue(this, "height");
    }

    private __setOptions_height() {
        this.height = this._height;
    }


    // ------------------------------ width ------------------------------
    _width: number;
    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        if (this.$ && value)
            if (this.dock === "fill") {
                this.$.css({width: "100%"});
            }
            else {
                this.$.css({width: value + "px"});
            }
    }

    private __emitCode_width(code: EmittedCode) {
        code.emitNumberValue(this, "width");
    }

    private __setOptions_width() {
        this.width = this._width;
    }


    // // ------------------------------ onClick ------------------------------
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

    // private __setOptions_onClick() {
    //     this.onClick = this._onClick;
    // }
    //
    // private __emitCode_onClick(code: EmittedCode) {
    //     code.emitEventValue(this, "onClick");
    // }

    createAppToolBar() {
        // let saveCodeEditor: ToolCodeEditor = new ToolCodeEditor();
        // saveCodeEditor.group="form-designer";
        // saveCodeEditor.text=getRandomId();
        // appState.toolbar.childrenAdd(saveCodeEditor);

    }

    // ------------------------------ render ------------------------------
    render(designer?: IDesigner) {
        this._designer = designer;
        this._$id = getRandomId();
        this.init();
        //this.renderBody();
//        this.$ = $("<div data-component='" + this.constructor.name + "' style='border: 0px solid red; height: 100%;width: 100%'></div>").appendTo(this.parent.$childrenContainer);
        this.$ = this.parent.$childrenContainer;
        this.$.css("overflow","hidden");


    }


    getMonacoEditorOptions(): IEditorConstructionOptions {
        return {
            value: fs.readFileSync("application/test/ТестоваяФормаДляДизайнера.ts", "utf8"),
            fontSize:13,
            automaticLayout:true,
            folding:true,
            language: 'typescript'

        }
    }

    monacoEditor: IStandaloneCodeEditor;

    initMonacoEditor() {
        // monaco editor не инициализируется в невидимый div, поэтому мы его рендерим, только после открытия tab-а "code"
        if (this.monacoEditor)
            return;

        // workaround monaco-css not understanding the environment
        (self as any).module = undefined;
        // workaround monaco-typescript not understanding the environment
        (self as any).process.browser = true;

        let __this = this;

        (window as any).amdRequire(["vs/editor/editor.main"], function () {

            __this.monacoEditor = (window as any).monaco.editor.create(__this.$[0], __this.getMonacoEditorOptions());

        });

    }

    // renderBody() {
    //     super.renderBody();
    //     this.$ = $("<div id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);
    //     this.$.jqxCodeEditor({theme: appState.theme} as jqxWidgetOptions);
    // }
    //
    // setJqxWidgetOptions() {
    //     super.setJqxWidgetOptions();
    //     this.onClick = this._onClick;
    //     this.text = this._text;
    // }
    //
    // emitCode(code: EmittedCode) {
    //     super.emitCode(code);
    //     code.emitStringValue(this, "text");
    //     code.emitEventValue(this, "onClick");
    // }

}