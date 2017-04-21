import {Component} from "../platform/components/Component";
import {ComponentDesigner_Window} from "./ComponentDesigner_Window";
import {IDesigner} from "../platform/designer/IDesigner";
import {SplitPanel} from "../platform/components/gui/SplitPanel";
import {SplitPanelItem} from "../platform/components/gui/SplitPaneltem";
import {IListBoxEventArgs, IListBoxItem, ListBox} from "../platform/components/gui/ListBox";
import {BaseDesigner_Panel} from "./BaseDesigner_Panel";
import {SqlTableColumn} from "../platform/components/sql/SqlTableColumn";

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

        this.splitPanelTop.size = "95%";
        this.splitPanel1.childrenAdd(this.splitPanelTop);

        this.splitPanelBottom.size = "5%";
        this.splitPanelBottom.minSize = "100px";
        this.splitPanel1.childrenAdd(this.splitPanelBottom);

        this.columnsListBox.dock = "fill";
        this.splitPanelTop.childrenAdd(this.columnsListBox);


        //=== END-DESIGNER-INIT-CODE ===//

    }

    beforeRender() {
        super.beforeRender();
//        this.columnsListBox.dataSource=new $.jqx.dataAdapter(["1","2"]);
        if (this.designedForm) {
            console.log(this.designedForm);

            let dataSource: IListBoxItem[] = [];

            let table = this.designedForm as SqlTableColumn;
            let item: IListBoxItem = {};
            item.value = table;
            item.label = table.getDesignerLabel();
            item.group = table.getDesignerCategory();
            item.image = table.getDesignerImage();
            dataSource.push(item);

            for (let child of this.designedForm.children) {
                let item: IListBoxItem = {};
                item.value = child;
                item.label = child.getDesignerLabel();
                item.group = child.getDesignerCategory();
                item.image = child.getDesignerImage();
                dataSource.push(item);
            }
            this.columnsListBox.dataSource = dataSource;

            this.columnsListBox.onChange = (args: IListBoxEventArgs) => {
                this.designer.activeComponent = args.item.value;
            };
        }
    }

}


