
import {Component} from "../platform/components/Component";
import {ComponentDesigner_Window} from "./ComponentDesigner_Window";
import {IDesigner} from "../platform/designer/IDesigner";
import {BaseDesigner_Panel} from "./BaseDesigner_Panel";

export class FormDesigner_Panel extends BaseDesigner_Panel {

    // get designer():ComponentDesigner_Window{
    //     return this.owner as ComponentDesigner_Window;
    // }
    //
    // _designedForm:Component;
    // get designedForm(): Component {
    //     return this.designer.designedForm;
    // }
    //
    // _activeComponent:Component;
    // get activeComponent(): Component {
    //     return this.designer.activeComponent;
    // }
    //
    // set activeComponent(value: Component) {
    //     this.designer.activeComponent = value;
    // }

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

    reRender() {// this._parentId = parentId;

        this.$.empty();

        //console.log(this.designer);
        //console.log(this.designedForm);
        if (this.designedForm) {
            this.designedForm.parent=this;
            //console.log(this.designedForm);
            this.designedForm.render(this.designer);
        }

    }

}


