import {ToolBar} from "./toolbar/ToolBar";
import {ToolButton} from "./toolbar/ToolButton";

export class AppToolBar extends ToolBar {
    saveButton: ToolButton = new ToolButton();
    openButton: ToolButton = new ToolButton();

    init() {
        super.init();
        this.saveButton.text="сохр";
        this.saveButton.image="vendor/fugue/icons/disc.png";
        this.childrenAdd(this.saveButton);

        this.openButton.text="опен";
        this.saveButton.image="vendor/fugue/icons/folder-horizontal-open.png";
        this.childrenAdd(this.openButton);
    }

}