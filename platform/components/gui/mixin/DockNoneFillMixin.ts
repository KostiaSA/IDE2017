import {MixinConstructor} from "./MixinConstructor";
import {Component} from "../../Component";
import {EmittedCode} from "../../code-emitter/EmittedCode";
import {PropertyEditor, Категория_РазмерПозиция} from "../../../../designer/PropertyEditor";
import {StringPropertyEditor} from "../../../../designer/StringPropertyEditor";

export type PanelDock = "none" | "fill";

export function DockNoneFillMixin<T extends MixinConstructor<Component>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }

        // ------------------------------ dock ------------------------------
        _dock: PanelDock = this.dock_default;
        get dock(): PanelDock {
            return this._dock;
        }

        set dock(value: PanelDock) {
            this._dock = value;
            let _this_ = this as any;
            _this_.top = _this_._top;
            _this_.left = _this_._left;
            _this_.width = _this_._width;
            _this_.height = _this_._height;
        }

        protected get dock_default(): PanelDock {
            return "none";
        }

        protected __emitCode_dock(code: EmittedCode) {
            code.emitStringValue(this, "dock", this.dock_default);
        }

        protected __setOptions_dock() {
            this.dock = this._dock;
        }

        protected __getPropertyEditor__dock(): PropertyEditor {
            let pe = new StringPropertyEditor();
            pe.default = this.dock_default;
            pe.comboType = "array";
            pe.comboItemsArray = ["none", "fill"];
            pe.propertyName = "comboType";
            pe.category = Категория_РазмерПозиция;
            return pe;
        }

    }
}
