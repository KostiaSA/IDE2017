import {Button} from "../platform/components/gui/Button";
import {Window} from "../platform/components/gui/Window";
import {HorzFlexPanel} from "../platform/components/gui/HorzFlexPanel";
import {HorzFlexPanelItem} from "../platform/components/gui/HorzFlexPaneltem";
import {TreeList} from "../platform/components/gui/TreeList";

export class ProjectExplorer_window extends Window {

    dockPanel1: HorzFlexPanel = new HorzFlexPanel();

    dockPanelTop: HorzFlexPanelItem = new HorzFlexPanelItem();
    dockPanelCenter: HorzFlexPanelItem = new HorzFlexPanelItem();
    dockPanelBottom: HorzFlexPanelItem = new HorzFlexPanelItem();

    treeList: TreeList = new TreeList();
    addColumnButton: Button = new Button();
    addIndexButton: Button = new Button();

    searchButton: Button = new Button();

    init() {
        super.init();

        //=== BEGIN-DESIGNER-INIT-CODE ===//
        this.top = 20;
        this.left = 20;
        this.width=800;
        this.height=600;

        this.dockPanel1.dock = "fill";
        this.childrenAdd(this.dockPanel1);

        this.dockPanelTop.dock = "top";
        this.dockPanelTop.size = 100;
        this.dockPanelTop.sizeToContent = true;
        this.dockPanelTop.padding = "5px";
        this.dockPanel1.childrenAdd(this.dockPanelTop);

        this.dockPanelCenter.dock="fill";
        this.dockPanelCenter.padding = "5px";
        this.dockPanel1.childrenAdd(this.dockPanelCenter);


        this.dockPanelBottom.dock="bottom";
        this.dockPanelBottom.size = 100;
        this.dockPanelBottom.padding = "5px";
        this.dockPanel1.childrenAdd(this.dockPanelBottom);

        this.treeList.dock = "fill";
        this.dockPanelCenter.childrenAdd(this.treeList);


        this.addColumnButton.text="добавить ?";
        this.dockPanelBottom.childrenAdd(this.addColumnButton);

        this.addIndexButton.text="добавить ??";
        this.dockPanelBottom.childrenAdd(this.addIndexButton);

        this.searchButton.text="искать";
        this.dockPanelTop.childrenAdd(this.searchButton);

        //=== END-DESIGNER-INIT-CODE ===//

        let x=[];
        for (let i=1000000; i<1000200; i++)
            x.push(i.toString());

        this.treeList.dataSource=x;

    }

    afterRender(){
        //this.splitPanel1.refresh();
        //this.splitPanel2.refresh();
    }

//     beforeRender() {
//         super.beforeRender();
// //        this.columnsListBox.dataSource=new $.jqx.dataAdapter(["1","2"]);
//         if (this.designedForm) {
//             console.log(this.designedForm);
//
//             let dataSource: IListBoxItem[] = [];
//
//             let table = this.designedForm as SqlTableColumn;
//             let item: IListBoxItem = {};
//             item.value = table;
//             item.label = table.getDesignerLabel();
//             item.group = table.getDesignerCategory();
//             item.image = table.getDesignerImage();
//             dataSource.push(item);
//
//             for (let child of this.designedForm.children) {
//                 let item: IListBoxItem = {};
//                 item.value = child;
//                 item.label = child.getDesignerLabel();
//                 item.group = child.getDesignerCategory();
//                 item.image = child.getDesignerImage();
//                 dataSource.push(item);
//             }
//             this.columnsListBox.dataSource = dataSource;
//
//             this.columnsListBox.onChange = (args: IListBoxEventArgs) => {
//                 this.designer.activeComponent = args.item.value;
//             };
//         }
//     }

}


