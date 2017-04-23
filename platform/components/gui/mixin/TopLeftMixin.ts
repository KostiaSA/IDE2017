import {MixinConstructor} from "./BasePropertyMixin";
import {Component} from "../../Component";
import {EmittedCode} from "../../code-emitter/EmittedCode";
import {PropertyEditor, Категория_РазмерПозиция} from "../../../../designer/PropertyEditor";
import {NumberPropertyEditor} from "../../../../designer/NumberPropertyEditor";

export function TopLeftMixin<T extends MixinConstructor<Component>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }

        // ------------------------------ top ------------------------------
        protected get top_default(): number {
            return undefined as any;
        }

        _top: number = this.top_default;
        get top(): number {
            return this._top;
        }

        set top(value: number) {
            this._top = value;
            if (this.$ && value) {
                $("#" + this._$id).css("top", value + "px");
                $("#" + this._$id).css("position", "absolute");
            }
        }

        protected __emitCode_top(code: EmittedCode) {
            code.emitNumberValue(this, "top", this.top_default);
        }

        protected  __setOptions_top() {
            this.top = this._top;
        }

        protected  __getPropertyEditor_top(): PropertyEditor {
            let pe = new NumberPropertyEditor();
            pe.default = this.top_default;
            pe.propertyName = "top";
            pe.category = Категория_РазмерПозиция;
            return pe;
        }

        // ------------------------------ left ------------------------------
        get left_default(): number {
            return undefined as any;
        }

        _left: number = this.left_default;
        get left(): number {
            return this._left;
        }

        set left(value: number) {
            this._left = value;
            if (this.$ && value) {
                $("#" + this._$id).css("left", value + "px");
                $("#" + this._$id).css("position", "absolute");
            }
        }

        protected  __emitCode_left(code: EmittedCode) {
            code.emitNumberValue(this, "left", this.left_default);
        }

        protected  __setOptions_left() {
            this.left = this._left;
        }

        protected  __getPropertyEditor_left(): PropertyEditor {
            let pe = new NumberPropertyEditor();
            pe.default = this.left_default;
            pe.propertyName = "left";
            pe.category = Категория_РазмерПозиция;
            return pe;
        }
    }
}
