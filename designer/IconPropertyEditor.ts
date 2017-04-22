import {Component} from "../platform/components/Component";
import {PropertyEditor} from "./PropertyEditor";
import {Input, InputComboType} from "../platform/components/gui/Input";

export class IconPropertyEditor extends PropertyEditor {

    render(parent: JQuery) {
        let input = new Input();
        input.valueType="string";
        input.width="97%";
        input.bindObject=this.component;
        input.bindProperty=this.propertyName;
        input.parent = {} as Component;
        input.parent.$childrenContainer = parent;
        input.render();
    }
}