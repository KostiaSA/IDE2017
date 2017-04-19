import {Component} from "../platform/components/Component";
import {PropertyEditor} from "./PropertyEditor";
import {Input} from "../platform/components/gui/Input";

export class StringPropertyEditor extends PropertyEditor {
    component: Component;
    propertyName: string;
    category: string;
    title: string;
    help: string;

    render(parent: JQuery) {
        let input = new Input();
        input.width="97%";
        input.bindObject=this.component;
        input.bindProperty=this.propertyName;
        input.parent = {} as Component;
        input.parent.$childrenContainer = parent;
        input.render();
    }
}