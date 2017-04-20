import {Component} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {PropertyEditor, Категория_Содержимое} from "../../../designer/PropertyEditor";
import {StringPropertyEditor} from "../../../designer/StringPropertyEditor";
import {SqlTableDesigner_Panel} from "../../../designer/SqlTableDesigner_Panel";
import {BaseDesigner_Panel} from "../../../designer/BaseDesigner_Panel";

export class SqlTable extends Component {

    getDesignerPanel(): BaseDesigner_Panel {
        return new SqlTableDesigner_Panel();
    }


    // ------------------------------ name ------------------------------
    _name: string;
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
        if (this.$) {
            this.$.name(this.name);
        }
    }

    private __emitCode_name(code: EmittedCode) {
        code.emitStringValue(this, "name");
    }

    private __setOptions_name() {
        this.name = this._name;
    }

    private __getPropertyEditor_name(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.propertyName = "name";
        pe.category = Категория_Содержимое;
        return pe;
    }

}