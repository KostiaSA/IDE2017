
import {Component} from "../platform/components/Component";
import {ComponentDesigner_Window} from "./ComponentDesigner_Window";
import {IDesigner} from "../platform/designer/IDesigner";
import {Panel} from "../platform/components/gui/Panel";

export class BaseDesigner_Panel extends Panel {

    get designer():ComponentDesigner_Window{
        return this.owner as ComponentDesigner_Window;
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

    reRender(){

    }
}


