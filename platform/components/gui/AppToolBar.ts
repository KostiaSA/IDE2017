import {ToolBar} from "./toolbar/ToolBar";
import {ToolButton} from "./toolbar/ToolButton";
import {appState} from "../../AppState";

export class AppToolBar extends ToolBar {
    // saveButton: ToolButton = new ToolButton();
    // openButton: ToolButton = new ToolButton();
    //
    // selectAllButton: ToolButton = new ToolButton();

    init() {
        super.init();

        this.groups = ["window","form-designer", "grid"];

        // this.saveButton.text = "сохр";
        // this.saveButton.group = "window";
        // this.saveButton.image = "vendor/fugue/icons/disk.png";
        // this.childrenAdd(this.saveButton);
        //
        // this.openButton.text = "опен";
        // this.openButton.image = "vendor/fugue/icons/folder-horizontal-open.png";
        // this.openButton.group = "window";
        // this.childrenAdd(this.openButton);
        //
        // this.selectAllButton.text = "select";
        // this.selectAllButton.image = "vendor/fugue/icons/node-select-next.png";
        // this.selectAllButton.group = "grid";
        // this.childrenAdd(this.selectAllButton);
    }

    refresh() {
        this.children.forEach((item, index) => {
            this.jqxWidget("destroyTool", 0);
        });
        this.children = [];
        let parent = appState.activeComponent;
        while (parent) {
            parent.createAppToolBar();
            parent = parent.parent;
        }
        this.renderChildren();
    }

}