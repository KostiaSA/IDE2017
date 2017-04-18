import {Component} from "../platform/components/Component";

export class PropertyEditor {
    component: Component;
    propertyName: string;
    category: string;
    title: string;
    help: string;

    render(parent: JQuery) {
        throw "PropertyEditor.render(): abstract error";
    }
}