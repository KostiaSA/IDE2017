import {MixinConstructor} from "./BasePropertyMixin";
import {Component, IEvent, IEventArgs} from "../../Component";
import {EmittedCode} from "../../code-emitter/EmittedCode";
import {PropertyEditor, Категория_РазмерПозиция} from "../../../../designer/PropertyEditor";
import {NumberPropertyEditor} from "../../../../designer/NumberPropertyEditor";

export function OnClickMixin<T extends MixinConstructor<Component>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }

        // ------------------------------ onClick ------------------------------
        _onClick: IEvent<IEventArgs>;
        get onClick(): IEvent<IEventArgs> {
            return this._onClick;
        }

        set onClick(value: IEvent<IEventArgs>) {
            this._onClick = value;
            if (this.$ && this._onClick) {
                $("#" + this._$id).on("click", () => {
                    let args: IEventArgs = {
                        sender: this
                    };
                    this._onClick.call(this._owner, args);
                })
            }
        }


        private __setOptions_onClick() {
            this.onClick = this._onClick;
        }

        private __emitCode_onClick(code: EmittedCode) {
            code.emitEventValue(this, "onClick");
        }

    }
}
