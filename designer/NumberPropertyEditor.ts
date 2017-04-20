import {Component} from "../platform/components/Component";
import {PropertyEditor} from "./PropertyEditor";
import {Input} from "../platform/components/gui/Input";

export class NumberPropertyEditor extends PropertyEditor {

    render(parent: JQuery) {
        let input = new Input();
        input.valueType="number";
        input.width="97%";
        input.bindObject=this.component;
        input.bindProperty=this.propertyName;
        input.parent = {} as Component;
        input.parent.$childrenContainer = parent;
        input.render();
    }
}