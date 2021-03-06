import {MixinConstructor} from "./MixinConstructor";
import {Component} from "../../Component";
import {EmittedCode} from "../../code-emitter/EmittedCode";
import {PropertyEditor, Категория_Прочее} from "../../../../designer/PropertyEditor";
import {BooleanPropertyEditor} from "../../../../designer/BooleanPropertyEditor";

export function EnabledMixin<T extends MixinConstructor<Component>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }

        protected get enabled_default(): boolean {
            return true;
        }

        // ------------------------------ enabled ------------------------------
        protected  _enabled: boolean = true;
        get enabled(): boolean {
            return this._enabled;
        }

        set enabled(value: boolean) {
            this._enabled = value;
            if (this.$) {
                if ((this as any).jqxWidget)
                (this as any).jqxWidget({disabled: !this._enabled});
                else
                    throw "EnabledMixin: jqxWidget error"
            }
        }

        emitCode_enabled(code: EmittedCode) {
            code.emitBooleanValue(this, "enabled", true);
        }

        protected  __setOptions_enabled() {
            this.enabled = this._enabled;
        }

        protected  __getPropertyEditor_enabled(): PropertyEditor {
            let pe = new BooleanPropertyEditor();
            pe.default=this.enabled_default;
            pe.propertyName = "enabled";
            pe.category = Категория_Прочее;
            return pe;
        }

    }
}
