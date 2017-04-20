
import {Component} from "../platform/components/Component";
import {ComponentDesigner_Window} from "./ComponentDesigner_Window";
import {IDesigner} from "../platform/designer/IDesigner";
import {BaseDesigner_Panel} from "./BaseDesigner_Panel";

export class FormDesigner_Panel extends BaseDesigner_Panel {


    render(designer?: IDesigner) {// this._parentId = parentId;

        this.$ = $("<div style='background-color: #efefef;height: 100%'></div>").appendTo(this.parent.$childrenContainer);

        if (this.designedForm) {
            this.designedForm.parent=this;
            this.designedForm.render(this.designer);
        }

    }

    reRender() {

        this.$.empty();

        if (this.designedForm) {
            this.designedForm.parent=this;
            this.designedForm.render(this.designer);
        }

    }

}


