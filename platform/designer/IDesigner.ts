import {Component} from "../components/Component";

export interface IDesigner {
    designedForm: Component;
    activeComponent: Component;
    reloadPropertyEditor(): void;
}