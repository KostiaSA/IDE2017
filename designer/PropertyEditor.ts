import {Component} from "../platform/components/Component";

export const Категория_РазмерПозиция = "размер и позиция";
export const Категория_Содержимое = "содержимое";
export const Категория_Прочее = "прочее";

export const PropertyEditorCategories = [
    Категория_РазмерПозиция,
    Категория_Содержимое,
    Категория_Прочее
];

export class PropertyEditor {
    component: Component;
    propertyName: string;
    category: string;
    title: string;
    help: string;

    render(parent: JQuery) {
        throw "PropertyEditor.render(): abstract error";
    }

    visible: () => boolean = () => true;
}