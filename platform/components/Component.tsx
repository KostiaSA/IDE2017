import {EmittedCode} from "./code-emitter/EmittedCode";
import {getObjectConstructorName} from "../utils/getObjectConstructorName";
import {IDesigner} from "../designer/IDesigner";
import {appState} from "../AppState";
import {getAllObjectProps} from "../utils/getAllObjectProps";
import {getRandomId} from "../../app/utils/getRandomId";
import {BaseDesigner_Panel} from "../../designer/BaseDesigner_Panel";

export interface IEventArgs {
    sender: Component;
}

export interface IEvent<TArgs extends IEventArgs> {
    (args: TArgs): void;
}

export const Компоненты_Кнопки = "Кнопки";
export const Компоненты_Данные = "Данные";
export const Компоненты_Панели = "Панели";
export const Компоненты_Списки = "Списки";
export const Компоненты_Редакторы = "Редакторы";

export const ComponentCategories = [
    Компоненты_Кнопки,
    Компоненты_Данные,
    Компоненты_Панели,
    Компоненты_Списки,
    Компоненты_Редакторы,

];

export interface IComponentRegistration {
    category: string;
    componentClass: Function;
    image?: string;
    title?: string;
}

export class Component {

    constructor() {
    }

    protected renderJqxWidgetAfterChildren: boolean = false;

    // jqxWidget(...args: any[]): Function {
    //     throw "abstract error Component.jqxWidget() for " + this.constructor.name;
    // };

    //[opt: string]: any;

    get allowChildren(): boolean {
        return true;
    }

    getDesignerPanel(): BaseDesigner_Panel {
        throw "дизайнер не определен для компонента " + this.constructor.name;
    }

    getDesignerLabel(): string {
        return this.constructor.name;
    }

    getDesignerImage(): string {
        return "vendor/fugue/icons/puzzle.png";
    }

    getDesignerCategory(): string {
        return "КОМПОНЕНТЫ";
    }


    designModeInitializeNew() {

    }

    // --- parent ---
    _parent: Component;
    get parent(): Component {
        return this._parent;
    }

    set parent(value: Component) {
        this._parent = value;
    }

    // для рендеринга children
    _$childrenContainer: JQuery;
    get $childrenContainer(): JQuery {
        return this._$childrenContainer || this.$;
    }

    set $childrenContainer(value: JQuery) {
        this._$childrenContainer = value;
    }


    // --- owner ---
    get owner(): Component {
        if (!this.parent)
            return this;
        else {
            if (this.parent.constructor.name === "FormDesigner_Panel")
                return this;
            else
                return this.parent.owner;
        }
    }


    // --- $ ---
    //protected _$: JQuery;
    get $(): JQuery {
        let ret = $("#" + this.$id);
        if (ret.length > 0)
            return ret;
        else
            return null as any;
    }

    // set $(value: JQuery) {
    //     this._$ = value;
    // }

    private _$id: string;
    get $id(): string {
        if (!this._$id)
            this._$id = getRandomId();
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

        console.error("ошибка платформы Component.get name() for " + this.constructor.name, this, this.owner);
        return "ошибка_" + this.constructor.name;
    }

    private _codePath: string;

    children: Component[] = [];

    childrenAdd(child: Component) {
        if (this.children.indexOf(child) > -1)
            throw "ошибка childrenAdd: двойное добавление";
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
                code.inits.push("        " + "this.childrenAdd(this." + child.name + ");");
            else
                code.inits.push("        " + "this." + this.name + ".childrenAdd(this." + child.name + ");");
        });
    }

    protected _designer?: IDesigner;


    render(designer?: IDesigner) {// this._parentId = parentId;
        this._designer = designer;
        if (!this.initialized)
            this.init();
        this.beforeRender();
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

    reRender() {

    }

    initialized: boolean;

    init() {
        this.initialized = true;
        //throw "Component.init(): abstract error";
    }

    renderBody() {
        $("<div data-component='" + this.constructor.name + "' id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);
    }

    designModeOnMouseDown = (e: any) => {
        this._designer!.activeComponent = this;
        e.stopPropagation();
    };

    createJqxWidget() {
        let opt: any = {};
        for (let propName of getAllObjectProps(this)) {
            if (propName.startsWith("__fillOptions_")) {
                ((this as any)[propName]).call(this, opt);
            }
        }
        this.fillJqxWidgetOptions(opt);
        (this as any).jqxWidget(opt);
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

    afterRender() {
        if (this._designer) {

            this.$.on("mousedown", this.designModeOnMouseDown);
            if (!this.allowChildren) {
                //this.$.droppable({disabled: true});
            }
            else {
                //console.log("dropped", this.$);
                this.$.droppable({
                    greedy: true,
                    hoverClass: "form-designer-drop-hover",
                    drop: function () {
                        //alert("dropped");
                    }
                });
            }
            this.$.draggable({
                grid: [5, 5],
                drag: () => {
                    (this._designer!.activeComponent as any).left = this.$.position().left;
                    (this._designer!.activeComponent as any).top = this.$.position().top;
                },
            });
        }
    }

    beforeRender() {

    }

    createAppToolBar() {

    }

    doLayout() {
        console.log("doLayout " + this.constructor.name);
        for (let child of this.children) {
            child.doLayout();
        }
    }
}