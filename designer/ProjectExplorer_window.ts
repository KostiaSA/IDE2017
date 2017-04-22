import {getAppHomePath} from "../platform/utils/getAppHomePath";
import {Button} from "../platform/components/gui/Button";
import {Window} from "../platform/components/gui/Window";
import {HorzFlexPanel} from "../platform/components/gui/HorzFlexPanel";
import {HorzFlexPanelItem} from "../platform/components/gui/HorzFlexPaneltem";
import {ITreeListEventArgs, ITreeListItem, TreeList} from "../platform/components/gui/TreeList";
import * as fs from "fs";
import * as path from "path";
import {ComponentDesigner_Window} from "./ComponentDesigner_Window";
import {appState} from "../platform/AppState";
import {replaceAll} from "../platform/utils/replaceAll";


export interface ITreeListProjectItem extends ITreeListItem {
    parentItem?: ITreeListItem;
    isFolder: boolean;
    fileName: string;
    filePath: string;
}

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
        this.width = 800;
        this.height = 600;

        this.dockPanel1.dock = "fill";
        this.childrenAdd(this.dockPanel1);

        this.dockPanelTop.dock = "top";
        this.dockPanelTop.size = 100;
        this.dockPanelTop.sizeToContent = true;
        this.dockPanelTop.padding = "5px";
        this.dockPanel1.childrenAdd(this.dockPanelTop);

        this.dockPanelCenter.dock = "fill";
        this.dockPanelCenter.padding = "5px";
        this.dockPanel1.childrenAdd(this.dockPanelCenter);


        this.dockPanelBottom.dock = "bottom";
        this.dockPanelBottom.size = 100;
        this.dockPanelBottom.padding = "5px";
        this.dockPanel1.childrenAdd(this.dockPanelBottom);

        this.treeList.dock = "fill";
        this.treeList._onDblClick = (event: ITreeListEventArgs) => {
            console.log(event);
            this.openComponentDesigner(event.item as ITreeListProjectItem);
        };
        this.dockPanelCenter.childrenAdd(this.treeList);


        this.addColumnButton.text = "добавить ?";
        this.dockPanelBottom.childrenAdd(this.addColumnButton);

        this.addIndexButton.text = "добавить ??";
        this.dockPanelBottom.childrenAdd(this.addIndexButton);

        this.searchButton.text = "искать";
        this.dockPanelTop.childrenAdd(this.searchButton);

        //=== END-DESIGNER-INIT-CODE ===//

        this.treeList.dataSource = this.createDataSource();

    }

    openComponentDesigner(item: ITreeListProjectItem) {
        let w = new ComponentDesigner_Window();
        //console.log(getAppHomePath());
        //console.log(item.filePath);
        w.designedComponentPath = path.join(item.filePath.replace(getAppHomePath(), ""), item.fileName);
        appState.desktop.openWindow(w);

    }

    //getAppHomePath()+"/application"

    private walkDir = (fullDir: string, parentItem: ITreeListProjectItem) => {

        let items: ITreeListProjectItem[] = [];
        parentItem.items = items;
        let homeDir = fullDir;
        fs.readdirSync(homeDir).forEach((fileName: string) => {

            let fileInfo = fs.statSync(path.join(homeDir, fileName));
            if (fileInfo.isDirectory()) {
                let item: ITreeListProjectItem = {
                    parentItem: parentItem,
                    isFolder: true,
                    fileName: fileName,
                    filePath: replaceAll(homeDir, "\\", "/"),
                    label: fileName,
                    expanded: true,
                    icon: "vendor/fugue/icons/folder-horizontal.png",
                    iconSize: 16
                };
                item.value = item;
                items.push(item);
                this.walkDir(path.join(homeDir, fileName), item);
            }
            else {
                if (fileName.endsWith(".ts")) {
                    let item: ITreeListProjectItem = {
                        parentItem: parentItem,
                        isFolder: false,
                        fileName: fileName,
                        filePath: replaceAll(homeDir, "\\", "/"),
                        label: fileName,
                        //icon: "vendor/fugue/icons/folder-horizontal.png",
                        //iconSize:16
                    };
                    item.value = item;
                    items.push(item);
                }
            }
        });

    };

    createDataSource(): ITreeListProjectItem[] {
        let items: ITreeListProjectItem[] = [];
        let homeDir = getAppHomePath();
        fs.readdirSync(homeDir).forEach((fileName: string) => {

            let fileInfo = fs.statSync(path.join(homeDir, fileName));
            if (fileInfo.isDirectory()) {
                if (fileName.indexOf("application") === 0 ||
                    fileName.indexOf("designer") === 0) {
                    let item: ITreeListProjectItem = {
                        isFolder: true,
                        fileName: fileName,
                        filePath: replaceAll(homeDir, "\\", "/"),
                        expanded: true,
                        label: fileName,
                        icon: "vendor/fugue/icons/folder-horizontal.png",
                        iconSize: 16
                    };
                    item.value = item;
                    items.push(item);
                    this.walkDir(path.join(homeDir, fileName), item);
                }
            }
            else {
                if (fileName.endsWith(".ts")) {
                    let item: ITreeListProjectItem = {
                        isFolder: false,
                        fileName: fileName,
                        filePath: replaceAll(homeDir, "\\", "/"),
                        label: fileName,
                        //icon: "vendor/fugue/icons/folder-horizontal.png",
                        //iconSize:16
                    };
                    item.value = item;
                    items.push(item);
                }
            }
        });
        return items;
    }


    afterRender() {
        //this.splitPanel1.refresh();
        //this.splitPanel2.refresh();
    }


}


