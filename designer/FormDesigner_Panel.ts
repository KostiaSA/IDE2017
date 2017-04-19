
import {Component} from "../platform/components/Component";
import {FormDesigner_Window} from "./FormDesigner_Window";
import {IDesigner} from "../platform/designer/IDesigner";

export class FormDesigner_Panel extends Component {

    get designer():FormDesigner_Window{
        return this.owner as FormDesigner_Window;
    }

    _designedForm:Component;
    get designedForm(): Component {
        return this.designer.designedForm;
    }

    _activeComponent:Component;
    get activeComponent(): Component {
        return this.designer.activeComponent;
    }

    set activeComponent(value: Component) {
        this.designer.activeComponent = value;
    }

    // get $childrenContainer(): JQuery {
    //     return this.$;
    // }

    render(designer?: IDesigner) {// this._parentId = parentId;

        //this._$id = "a" + Math.random().toString(36).slice(2, 21);
        this.$ = $("<div style='background-color: #efefef;height: 100%'></div>").appendTo(this.parent.$childrenContainer);

        //console.log(this.designer);
        //console.log(this.designedForm);
        if (this.designedForm) {
            this.designedForm.parent=this;
            //console.log(this.designedForm);
            this.designedForm.render(this.designer);
        }

    }
}


