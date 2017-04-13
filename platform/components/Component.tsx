import {EmittedCode} from "./code-emitter/EmittedCode";
import {getObjectConstructorName} from "../utils/getObjectConstructorName";
import {IDesigner} from "../designer/IDesigner";

export interface IEventArgs {
    sender: Component;
}

export interface IEvent<TArgs extends IEventArgs> {
    (args: TArgs): void;
}

export class Component {
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

        throw "ошибка платформы Component.get name()"
    }

    // --- top ---
    protected _top: number;
    get top(): number {
        return this._top;
    }

    set top(value: number) {
        this._top = value;
    }

    // --- left ---
    protected _left: number;
    get left(): number {
        return this._left;
    }

    set left(value: number) {
        this._left = value;
    }

    // --- height ---
    protected _height: number;
    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        this.height_change();
    }

    height_change() {

    }

    // --- width ---
    protected _width: number;
    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        this.width_change();
    }

    width_change() {

    }

    private _codePath: string;

    children: Component[] = [];

    childrenAdd(child: Component) {
        child.owner = this.owner;
        child.parent = this;
        this.children.push(child);
    }


    emitCode(code: EmittedCode) {

        code.emitNumberValue(this, "top");
        code.emitNumberValue(this, "left");
        code.emitNumberValue(this, "width");
        code.emitNumberValue(this, "height");

        this.children.forEach((child: Component, index: number) => {
            console.log(child.constructor.name);
            code.emitDeclaration(child.name, child.constructor.name);
            child.emitCode(code);
            if (this === this.owner)
                code.inits.push("    " + "this.childrenAdd(this." + child.name + ");");
            else
                code.inits.push("    " + "this." + this.name + ".childrenAdd(this." + child.name + ");");
        });
    }

    protected _designer?: IDesigner;
    //protected _parentId: string;


    render(designer?: IDesigner) {
        // this._parentId = parentId;
        this._designer = designer;
        this._$id = "a" + Math.random().toString(36).slice(2, 21);
        this.init();
        this.renderBody();
        this.renderProperties();
        this.renderChildren();
    }

    init() {
    }

    renderBody() {
    }

    renderProperties() {
        if (this.left || this.top) {
            this.$.css("position", "absolute");
            this.$.css("left", this.left + "px");
            this.$.css("top", this.top + "px");
        }
        else
            this.$.css("position", "relative");
        this.height_change();
        this.width_change();
    }

    renderChildren() {
        for (let child of this.children) {
            child.render(this._designer);
        }
    }

}