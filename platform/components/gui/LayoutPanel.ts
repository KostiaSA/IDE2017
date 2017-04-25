// import {Component, IEvent, IEventArgs} from "../Component";
// import {EmittedCode} from "../code-emitter/EmittedCode";
// import {Control} from "./Control";
// import {appState} from "../../AppState";
// import jqxLayoutLayout = jqwidgets.LayoutLayout;
// import {Layout, ILayoutItem} from "./Layout";
//
// export class LayoutPanel extends Control implements ILayoutItem {
//
//     // --- title ---
//     private _title: string;
//     get title(): string {
//         return this._title;
//     }
//
//     set title(value: string) {
//         this._title = value;
//         //if (this.$)
//         //  $("#" + this.$titleId).text(this.title);
//     }
//
//     // height_change() {
//     //     super.height_change();
//     //     if (this.$)
//     //         this.$.jqxPanel({height: this.height + "px"} as PanelOptions);
//     // }
//     //
//     // width_change() {
//     //     super.width_change();
//     //     if (this.$)
//     //         this.$.jqxPanel({width: this.width + "px"} as PanelOptions);
//     // }
//
//     getRootLayout(): Layout {
//         let parent = this.parent;
//         while (!(parent instanceof Layout)) {
//             parent = parent.parent;
//         }
//         return parent;
//     }
//
//     getLayoutLayout(): jqxLayoutLayout {
//         console.log("contentContainer2", this.$id,this);
//         let ret: jqxLayoutLayout = {
//             type: "layoutPanel",
//             contentContainer: this.$id,
//             title: this.title,
//             minHeight: 200,
//             minWidth: 200,
//             //width: this._width,
//             //height: this._height
//         };
//         return ret;
//     }
//
//     renderBody() {
//         super.renderBody();
//         console.log("getRootLayout", this.getRootLayout().$);
//         console.log("contentContainer1", this.$id,this);
//         this.$ = $("<div style='border: 1px solid blue' data-container='" + this.$id + "'>LayoutPanel!!!</div>").appendTo(this.getRootLayout().$);
//
//         //this.$.jqxPanel(panelOptions);
//     }
//
//     renderProperties() {
//         super.setJqxWidgetOptions();
//     }
//
//     emitCode(code: EmittedCode) {
//         super.emitCode(code);
//         //code.emitBooleanValue(this, "autoSize", false);
//         code.emitStringValue(this, "title");
//     }
//
// }