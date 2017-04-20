import {Component} from "../platform/components/Component";
import {ComponentDesigner_Window} from "./ComponentDesigner_Window";
import {IDesigner} from "../platform/designer/IDesigner";
import {SplitPanel} from "../platform/components/gui/SplitPanel";
import {SplitPanelItem} from "../platform/components/gui/SplitPaneltem";
import {ListBox} from "../platform/components/gui/ListBox";
import {BaseDesigner_Panel} from "./BaseDesigner_Panel";

export class SqlTableDesigner_Panel extends BaseDesigner_Panel {

    splitPanel1: SplitPanel = new SplitPanel();
    splitPanelTop: SplitPanelItem = new SplitPanelItem();
    splitPanelBottom: SplitPanelItem = new SplitPanelItem();

    columnsListBox: ListBox = new ListBox();

    init() {
        super.init();

        //=== BEGIN-DESIGNER-INIT-CODE ===//
        this.dock = "fill";

        this.splitPanel1.dock = "fill";
        this.splitPanel1.orientation = "horizontal";
        this.childrenAdd(this.splitPanel1);

        this.splitPanelTop.size = "80%";
        this.splitPanel1.childrenAdd(this.splitPanelTop);

        this.splitPanelBottom.size = "20%";
        this.splitPanel1.childrenAdd(this.splitPanelBottom);

        this.columnsListBox.dock="fill";
        this.splitPanelTop.childrenAdd(this.columnsListBox);


        //=== END-DESIGNER-INIT-CODE ===//

    }


}


