import {Window} from "../platform/components/gui/Window";
import {Button} from "../platform/components/gui/Button";
import {SplitPanel} from "../platform/components/gui/SplitPanel";
import {SplitPanelItem} from "../platform/components/gui/SplitPaneltem";
import {TabsPanel} from "../platform/components/gui/TabPanel";
import {Tab} from "../platform/components/gui/Tab";
import {FormDesigner_Panel} from "./FormDesigner_Panel";
import {Component} from "../platform/components/Component";
import {IDesigner} from "../platform/designer/IDesigner";
import {ToolButton} from "../platform/components/gui/toolbar/ToolButton";
import {appState} from "../platform/AppState";
import {CodeEditor} from "../platform/components/gui/CodeEditor";

export class FormDesigner_Window extends Window implements IDesigner {

    // ------------------------------ designedFormPath ------------------------------
    _designedFormPath: string;
    get designedFormPath(): string {
        return this._designedFormPath;
    }

    set designedFormPath(value: string) {
        this._designedFormPath = value;
    }

    // ------------------------------ designedForm ------------------------------
    _designedForm: Component;
    get designedForm(): Component {
        return this._designedForm;
    }

    set designedForm(value: Component) {
        this._designedForm = value;
    }

    // ------------------------------ activeComponent ------------------------------
    _activeComponent: Component;
    get activeComponent(): Component {
        return this._activeComponent;
    }

    set activeComponent(value: Component) {
        if (this._activeComponent === value)
            return;
        for (let func of this.onBeforeActiveComponentChanged) {
            if (!func(value, this._activeComponent))
                return;
        }

        if (this._activeComponent && this._activeComponent.$) {
            let frame = this._activeComponent.$;
            frame.css("outline", frame.$$savedBorder);
            frame.resizable("destroy");
        }
        let savedOld = this._activeComponent;
        this._activeComponent = value;

        let frame = this._activeComponent.$;
        frame.$$savedBorder = frame.css("outline");
        frame.css("outline", "solid 2px deepskyblue");
        frame.resizable({
            grid: 5,
        });

        appState.activeComponent=this.activeComponent;

        for (let func of this.onAfterActiveComponentChanged) {
            func(value, savedOld);
        }


        //console.log("new active", value);
    }

    // ------------------------------ onClick ------------------------------

    onBeforeActiveComponentChanged: ((newActiveComponent: Component, oldActiveComponent: Component) => boolean)[] = [];
    onAfterActiveComponentChanged: ((newActiveComponent: Component, oldActiveComponent: Component) => void)[] = [];

    splitPanel1: SplitPanel = new SplitPanel();
    splitPanelLeft: SplitPanelItem = new SplitPanelItem();
    splitPanelRight: SplitPanelItem = new SplitPanelItem();

    leftTabsPanel: TabsPanel = new TabsPanel();
    formTab: Tab = new Tab();
    codeTab: Tab = new Tab();
    formDesignerPanel: FormDesigner_Panel = new FormDesigner_Panel();
    codeEditor: CodeEditor = new CodeEditor();

    rightTabsPanel: TabsPanel = new TabsPanel();
    propertyEditorTab: Tab = new Tab();
    formExplorerTab: Tab = new Tab();

//    кнопка123: Button = new Button();
//    кнопкаPanel123: Button = new Button();
//    кнопкаPanel1232: Button = new Button();

    init() {
        super.init();

        //=== код дизайнера (конструктор начало) ===//
        this.top = 100;
        this.left = 10;
        this.height = 800;
        this.width = 1000;

        this.splitPanel1.dock = "fill";
        this.splitPanel1.orientation = "vertical";
        this.childrenAdd(this.splitPanel1);

        this.splitPanelLeft.size = "70%";
        this.splitPanel1.childrenAdd(this.splitPanelLeft);

        this.splitPanelRight.size = "30%";
        this.splitPanel1.childrenAdd(this.splitPanelRight);
        this.splitPanelLeft.childrenAdd(this.leftTabsPanel);


        this.leftTabsPanel.dock = "fill";

        this.leftTabsPanel.childrenAdd(this.formTab);
        this.formTab.title = "Форма";
        this.formTab.childrenAdd(this.formDesignerPanel);

        this.codeTab.title = "Код";
        this.codeTab.onSelect=()=>{
            this.codeEditor.initMonacoEditor();
        };
        this.leftTabsPanel.childrenAdd(this.codeTab);
        this.codeEditor.dock="fill";
        this.codeTab.childrenAdd(this.codeEditor);




        this.rightTabsPanel.tabsPosition = "bottom";
        this.rightTabsPanel.dock = "fill";
        this.propertyEditorTab.title = "Свойства";
        this.formExplorerTab.title = "Структура";

        this.splitPanelRight.childrenAdd(this.rightTabsPanel);
        this.rightTabsPanel.childrenAdd(this.propertyEditorTab);
        this.rightTabsPanel.childrenAdd(this.formExplorerTab);

    }

    // кнопка123456_Click(args: IEventArgs) {
    //     this.tabs.tabsPosition="bottom";
    // }

    createAppToolBar(){
        let saveButton: ToolButton = new ToolButton();
        saveButton.group="form-designer";
        saveButton.image="vendor/fugue/icons/disk.png";
        appState.toolbar.childrenAdd(saveButton);

        let runButton: ToolButton = new ToolButton();
        runButton.group="form-designer";
        runButton.image="vendor/fugue/icons/control.png";
        runButton.onClick=(sender)=>{
            this.testRun();
        };
        appState.toolbar.childrenAdd(runButton);

    }

    testRun(){

    }

}
