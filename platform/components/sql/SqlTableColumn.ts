import {Component} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {PropertyEditor, Категория_Содержимое} from "../../../designer/PropertyEditor";
import {StringPropertyEditor} from "../../../designer/StringPropertyEditor";

export class SqlTableColumn extends Component {

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

    // ------------------------------ dataType ------------------------------
    _dataType: string;
    get dataType(): string {
        return this._dataType;
    }

    set dataType(value: string) {
        this._dataType = value;
        if (this.$) {
            this.$.dataType(this.dataType);
        }
    }

    private __emitCode_dataType(code: EmittedCode) {
        code.emitStringValue(this, "dataType");
    }

    private __setOptions_dataType() {
        this.dataType = this._dataType;
    }

    private __getPropertyEditor_dataType(): PropertyEditor {
        let pe = new StringPropertyEditor();
        pe.propertyName = "dataType";
        pe.category = Категория_Содержимое;
        return pe;
    }
}