import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import {Control} from "./Control";
import {appState} from "../../AppState";
import jqxLayoutOptions = jqwidgets.LayoutOptions;
import jqxLayoutLayout = jqwidgets.LayoutLayout;
import {IDesigner} from "../../designer/IDesigner";


export interface ILayoutItem {
    getLayoutLayout(): jqxLayoutLayout;
}

export class Layout extends Control {


    // height_change() {
    //     super.height_change();
    //     if (this.$)
    //         this.$.jqxLayout({height: this.height} as jqxLayoutOptions);
    // }
    //
    // width_change() {
    //     super.width_change();
    //     if (this.$)
    //         this.$.jqxLayout({width: this.width} as jqxLayoutOptions);
    // }

    getLayout(): Array<jqxLayoutLayout> {
        let layout: Array<jqxLayoutLayout> = [];
        layout.push({
            type: 'layoutGroup',
            //orientation: 'horizo222ntal',
            items: this.children.map((child: Component) => {
                if (!(child as any as ILayoutItem).getLayoutLayout)
                    throw  "internal error Layout.getLayout()";
                return (child as any as ILayoutItem).getLayoutLayout();
            })
        } as jqxLayoutLayout);
        console.log(layout);
        return layout;
    }

    render(designer?: IDesigner) {
        // this._parentId = parentId;
        this._designer = designer;
        this._$id = "a" + Math.random().toString(36).slice(2, 21);
        if (!this.initialized)
            this.init();
//        this.$ = $("<div style='border: 1px solid red' id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);
        this.$ = $("<div style='border: 1px solid red' id='" + this.$id + "'></div>").appendTo($("body"));
        for (let child of this.children) {
            child.render(this._designer);
        }
        let layoutOptions: jqxLayoutOptions = {
            theme: appState.theme,
            height: 300,
            width: 400,
            layout: this.getLayout()

        };

        //this.$.jqxLayout(layoutOptions);
        //this.setJqxWidgetOptions();


    }


    // renderChildren() {
    //     super.renderChildren();
    //     //this.$.jqxLayout("refresh");
    //     this.$.jqxLayout("loadLayout",this.getLayout());
    // }

    renderProperties() {
        super.setJqxWidgetOptions();
    }

    emitCode(code: EmittedCode) {
        super.emitCode(code);
    }

}