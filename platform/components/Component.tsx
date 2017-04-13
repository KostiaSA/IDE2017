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
        if (this._$)
            return this._$.attr("id");
        else
            return this._$id;
    }

    // --- name ---
    protected _name: string;
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }


    // --- top ---
    protected _top: number = 0;
    get top(): number {
        return this._top;
    }

    set top(value: number) {
        this._top = value;
    }

    // --- left ---
    protected _left: number = 0;
    get left(): number {
        return this._left;
    }

    set left(value: number) {
        this._left = value;
    }

    // --- height ---
    protected _height: number = 0;
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
    protected _width: number = 0;
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


    emitCode(code: EmittedCode, level: number) {

        code.emitNumberValue(this, "top", level);
        code.emitNumberValue(this, "left", level);

        this.children.forEach((child: Component, index: number) => {
            console.log(child.constructor.name);
            code.emitDeclaration(child.name, child.constructor.name);
            child.emitCode(code, level + 1);
            if (level === 0)
                code.inits.push("    " + "this.children.push(this." + child.name + ");");
            else
                code.inits.push("    " + "this." + this.name + ".children.push(this." + child.name + ");");
        });
    }

    protected _designer?: IDesigner;
    protected _parentId: string;
    protected _owner: Component;

    render(owner: Component, parentId: string, designer?: IDesigner) {
        this._owner = owner;
        this._parentId = parentId;
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
        this.$.css("position", "absolute");
        this.$.css("left", this.left + "px");
        this.$.css("top", this.top + "px");
        this.height_change();
        this.width_change();
    }

    renderChildren() {
        for (let child of this.children) {
            child.render(this._owner, this.$id, this._designer);
        }
    }

}