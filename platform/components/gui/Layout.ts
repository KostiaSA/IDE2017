import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import jqxLayoutOptions = jqwidgets.LayoutOptions;
import jqxLayoutLayout = jqwidgets.LayoutLayout;


export class Layout extends Control {


    height_change() {
        super.height_change();
        if (this.$)
            this.$.jqxLayout({height: this.height} as jqxLayoutOptions);
    }

    width_change() {
        super.width_change();
        if (this.$)
            this.$.jqxLayout({width: this.width} as jqxLayoutOptions);
    }

    getLayout(): Array<jqxLayoutLayout> {
        let layout: Array<jqxLayoutLayout> = [];
        layout.push({
            type: 'layoutGroup',
            orientation: 'horizontal',
            items: [{
                type: 'layoutPanel',
                title: 'Contacts',
                contentContainer: 'ContactsPanel'}
            ]
        } as jqxLayoutLayout);
        return layout;
    }

    renderBody() {
        super.renderBody();
        this.$ = $("<div style='border: 1px solid red' id='" + this.$id + "'></div>").appendTo(this.parent.$);
        let LayoutOptions: jqxLayoutOptions = {
            theme: appState.theme,
            height: 300,
            width: 300,
            layout: this.getLayout()

        };

        this.$.jqxLayout(LayoutOptions);
    }

    renderProperties() {
        super.renderProperties();
    }

    emitCode(code: EmittedCode) {
        super.emitCode(code);
    }

}