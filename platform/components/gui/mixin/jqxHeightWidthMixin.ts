import {MixinConstructor} from "./BasePropertyMixin";
import {Component} from "../../Component";
import {EmittedCode} from "../../code-emitter/EmittedCode";
import {PropertyEditor, Категория_РазмерПозиция} from "../../../../designer/PropertyEditor";
import {NumberPropertyEditor} from "../../../../designer/NumberPropertyEditor";
import {isString, isUndefined} from "util";
import {StringPropertyEditor} from "../../../../designer/StringPropertyEditor";

export function jqxHeightWidthMixin<T extends MixinConstructor<Component>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }

        // ------------------------------ height ------------------------------
        _height: number | string = this.height_default;

        get height(): number | string {
            return this._height;
        }

        set height(value: number | string) {
            this._height = value;
            if (this.$ && value) {
                if (value !== "auto")
                    this.jqxWidget({height: value});
            }
        }

        protected get height_default(): number | string {
            return undefined as any;
        }

        protected __emitCode_height(code: EmittedCode) {
            if (isString(this.height))
                code.emitStringValue(this, "height", this.height_default);
            else
                code.emitNumberValue(this, "height", this.height_default);
        }

        protected __fillOptions_height(opt: any) {
            opt.height = this.height;
        }

        protected __getPropertyEditor_height(): PropertyEditor {
            let pe = new StringPropertyEditor();
            pe.default = this.height_default;
            pe.propertyName = "height";
            pe.category = Категория_РазмерПозиция;
            return pe;
        }

        // ------------------------------ width ------------------------------
        _width: number | string = this.width_default;
        get width(): number | string {
            return this._width;
        }

        set width(value: number | string) {
            this._width = value;
            if (this.$ && value)
                this.jqxWidget({width: value});
        }

        protected get width_default(): number | string {
            return undefined as any;
        }

        protected __emitCode_width(code: EmittedCode) {
            if (isString(this.width))
                code.emitStringValue(this, "width", this.width_default);
            else
                code.emitNumberValue(this, "width", this.width_default);
        }

        protected __fillOptions_width(opt: any) {
            opt.width = this.width;
        }

        protected __getPropertyEditor_width(): PropertyEditor {
            let pe = new StringPropertyEditor();
            pe.default = this.width_default;
            pe.propertyName = "width";
            pe.category = Категория_РазмерПозиция;
            return pe;
        }

    }
}
