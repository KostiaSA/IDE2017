import {ToolBar} from "./toolbar/ToolBar";
import {ToolButton} from "./toolbar/ToolButton";

export class AppToolBar extends ToolBar {
    saveButton: ToolButton = new ToolButton();
    openButton: ToolButton = new ToolButton();

    selectAllButton: ToolButton = new ToolButton();

    init() {
        super.init();

        this.groups=["window","grid"];

        this.saveButton.text="сохр";
        this.saveButton.group="window";
        this.saveButton.image="vendor/fugue/icons/disk.png";
        this.childrenAdd(this.saveButton);

        this.openButton.text="опен";
        this.openButton.image="vendor/fugue/icons/folder-horizontal-open.png";
        this.openButton.group="window";
        this.childrenAdd(this.openButton);

        this.selectAllButton.text="select";
        this.selectAllButton.image="vendor/fugue/icons/node-select-next.png";
        this.selectAllButton.group="grid";
        this.childrenAdd(this.selectAllButton);
    }

}