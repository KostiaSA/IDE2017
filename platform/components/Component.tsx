import {EmittedCode} from "./code-emitter/EmittedCode";
import {getObjectConstructorName} from "../utils/getObjectConstructorName";
import {IDesigner} from "../designer/IDesigner";
import {appState} from "../AppState";
import {getAllObjectProps} from "../utils/getAllObjectProps";

export interface IEventArgs {
    sender: Component;
}

export interface IEvent<TArgs extends IEventArgs> {
    (args: TArgs): void;
}

export class Component {

    constructor() {
    }

    protected renderJqxWidgetAfterChildren: boolean = false;

    jqxWidget(...args: any[]): Function {
        throw "abstract error Component.jqxWidget() for " + this.constructor.name;
    };


    // --- parent ---
    protected _parent: Component;
    get parent(): Component {
        return this._parent;
    }

    set parent(value: Component) {
        this._parent = value;
    }

    // для рендеринга children
    get $childrenContainer(): JQuery {
        return this.$;
    }


    // --- owner ---
    protected _owner: Component;
    get owner(): Component {
        return this._owner || this;
    }

    set owner(value: Component) {
        this._owner = value;
    }

    // --- $ ---
    protected _$: JQuery;
    get $(): JQuery {
        return this._$;
    }

    set $(value: JQuery) {
        this._$ = value;
    }

    protected _$id: string;
    get $id(): string {
        return this._$id;
    }

    // --- name ---
    get name(): string {
        for (let propName of Object.keys(this.owner)) {
            if ((this.owner as any)[propName] === this)
                return propName;
        }

        if (this.owner === this)
            return this.constructor.name;

        console.error("ошибка платформы Component.get name() for " + this.constructor.name);
        return "ошибка_" + this.constructor.name;
    }

    private _codePath: string;

    children: Component[] = [];

    childrenAdd(child: Component) {
        child.owner = this.owner;
        child.parent = this;
        this.children.push(child);
    }


    emitCode(code: EmittedCode) {

        for (let propName of getAllObjectProps(this)) {
            if (propName.startsWith("__emitCode_")) {
                ((this as any)[propName]).call(this, code);
            }
        }

        this.children.forEach((child: Component, index: number) => {
            //console.log(child.constructor.name);
            code.emitDeclaration(child.name, child.constructor.name);
            child.emitCode(code);
            if (this === this.owner)
                code.inits.push("    " + "this.childrenAdd(this." + child.name + ");");
            else
                code.inits.push("    " + "this." + this.name + ".childrenAdd(this." + child.name + ");");
        });
    }

    protected _designer?: IDesigner;


    render(designer?: IDesigner) {// this._parentId = parentId;
        this._designer = designer;
        this._$id = "a" + Math.random().toString(36).slice(2, 21);
        this.init();
        this.renderBody();
        if (this.renderJqxWidgetAfterChildren) {
            this.renderChildren();
            this.createJqxWidget();
            this.setJqxWidgetOptions();
        }
        else {
            this.createJqxWidget();
            this.setJqxWidgetOptions();
            this.renderChildren();
        }
        this.afterRender();
    }


    init() {
        //throw "Component.init(): abstract error";
    }

    renderBody() {
        this.$ = $("<div data-component='" + this.constructor.name + "'></div>").appendTo(this.parent.$childrenContainer);
        if (this._designer) {
            this.$.on("mousedown", this.designModeOnMouseDown);
        }

    }

    designModeOnMouseDown = () => {
        this._designer!.activeComponent = this;
    };

    createJqxWidget() {
        let opt: any = {};
        for (let propName of getAllObjectProps(this)) {
            if (propName.startsWith("__fillOptions_")) {
                ((this as any)[propName]).call(this, opt);
            }
        }
        this.fillJqxWidgetOptions(opt);
        this.jqxWidget(opt);
         if (this._designer) {
        //     this.$.css("outline", "solid 2px deepskyblue");
        //
             this.$.draggable({
                grid: [5, 5],
                drag: () => {
                    (this._designer!.activeComponent as any).left = this.$.position().left;
                    (this._designer!.activeComponent as any).top = this.$.position().top;
                },
             });
        //     this.$.resizable({
        //         grid: 5,
        //     });
        //
         }
    }

    fillJqxWidgetOptions(opt: any) {
    }

    setJqxWidgetOptions() {
        for (let propName of getAllObjectProps(this)) {
            if (propName.startsWith("__setOptions_")) {
                ((this as any)[propName]).call(this);
            }
        }
    }

    renderChildren() {
        for (let child of this.children) {
            child.render(this._designer);
        }
    }

    afterRender(){

    }

    createAppToolBar(){

    }

}