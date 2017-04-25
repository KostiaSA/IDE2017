import * as fs from "fs";
import * as path from "path";
import {Window} from "../platform/components/gui/Window";
import {Button} from "../platform/components/gui/Button";
import {SplitPanel} from "../platform/components/gui/SplitPanel";
import {SplitPanelItem} from "../platform/components/gui/SplitPaneltem";
import {TabsPanel} from "../platform/components/gui/TabPanel";
import {TabPanelItem} from "../platform/components/gui/TabPanelItem";
import {BaseDesigner_Panel} from "./BaseDesigner_Panel";
import {Component, IComponentRegistration} from "../platform/components/Component";
import {IDesigner} from "../platform/designer/IDesigner";
import {ToolButton} from "../platform/components/gui/toolbar/ToolButton";
import {appState} from "../platform/AppState";
import {CodeEditor} from "../platform/components/gui/CodeEditor";
import {EmittedCode} from "../platform/components/code-emitter/EmittedCode";
import {CompilerOptions, DiagnosticCategory, JsxEmit, ScriptTarget} from "typescript";
import {replaceAll} from "../platform/utils/replaceAll";
import {PropertiesEditor} from "./PropertiesEditor";
import {IListBoxEventArgs, IListBoxItem, ListBox} from "../platform/components/gui/ListBox";
import {getRegisteredComponents} from "./utils/getRegisteredComponents";
import {FormDesigner_Panel} from "./FormDesigner_Panel";

export class ComponentDesigner_Window extends Window implements IDesigner {

    // ------------------------------ designedComponentPath ------------------------------
    _designedComponentPath: string;
    get designedComponentPath(): string {
        return this._designedComponentPath;
    }

    set designedComponentPath(value: string) {
        this._designedComponentPath = replaceAll(value, "\\", "/");
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
            let frame = $("#" + this._activeComponent.$id);
            frame.css("outline", "");
            if (frame.is('.ui-resizable'))
                frame.resizable("destroy");
        }
        let savedOld = this._activeComponent;
        this._activeComponent = value;


        appState.activeComponent = this.activeComponent;
        this.propertyEditor.editedObject = this.activeComponent;

        for (let func of this.onAfterActiveComponentChanged) {
            func(value, savedOld);
        }

        let frame = $("#" + this._activeComponent.$id);
        frame.css("outline", "solid 2px deepskyblue");
        frame.resizable({
            grid: 5,
        });
        frame.on("resize", (event: any, ui: any) => {
            (this._activeComponent as any).width = ui.size.width;
            (this._activeComponent as any).height = ui.size.height;
        });
    }

    // ------------------------------ onClick ------------------------------

    onBeforeActiveComponentChanged: ((newActiveComponent: Component, oldActiveComponent: Component) => boolean)[] = [];
    onAfterActiveComponentChanged: ((newActiveComponent: Component, oldActiveComponent: Component) => void)[] = [];

    //=== BEGIN-DESIGNER-DECLARE-CODE ===//
    splitPanel1: SplitPanel = new SplitPanel();
    splitPanelLeft: SplitPanelItem = new SplitPanelItem();
    splitPanelRight: SplitPanelItem = new SplitPanelItem();

    leftTabsPanel: TabsPanel = new TabsPanel();
    formTab: TabPanelItem = new TabPanelItem();
    codeTab: TabPanelItem = new TabPanelItem();
    codeEditor: CodeEditor = new CodeEditor();

    rightTabsPanel: TabsPanel = new TabsPanel();

    propertyEditorTab: TabPanelItem = new TabPanelItem();
    propertyEditor: PropertiesEditor = new PropertiesEditor();

    componentsTab: TabPanelItem = new TabPanelItem();
    componentsListBox: ListBox = new ListBox();

    formExplorerTab: TabPanelItem = new TabPanelItem();

    //=== END-DESIGNER-DECLARE-CODE ===//

    designerPanel: BaseDesigner_Panel;

    init() {
        super.init();

        //=== BEGIN-DESIGNER-INIT-CODE ===//
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
        this.formTab.title = "Дизайнер";
        this.formTab.padding = "5px";


        this.codeTab.title = "Код";
        this.leftTabsPanel.childrenAdd(this.codeTab);
        this.codeEditor.dock = "fill";
        this.codeTab.childrenAdd(this.codeEditor);


        this.rightTabsPanel.tabsPosition = "bottom";
        this.rightTabsPanel.dock = "fill";

        this.propertyEditorTab.title = "Свойства";
        this.rightTabsPanel.childrenAdd(this.propertyEditorTab);

        this.propertyEditor.dock = "fill";
        this.propertyEditorTab.childrenAdd(this.propertyEditor);

        this.splitPanelRight.childrenAdd(this.rightTabsPanel);

        this.componentsTab.title = "Компоненты";
        this.componentsTab.padding = "5px";
        this.rightTabsPanel.childrenAdd(this.componentsTab);

        this.componentsListBox.dock = "fill";
        this.componentsListBox.noBorder = true;
        this.componentsListBox.onDblClick = this.componentsListBox_DblClick;
        this.componentsTab.childrenAdd(this.componentsListBox);


        this.formExplorerTab.title = "Структура";
        this.rightTabsPanel.childrenAdd(this.formExplorerTab);
        //=== END-DESIGNER-INIT-CODE ===//


        this.codeEditor.code = fs.readFileSync(this.designedComponentPath, "utf8");

        let formModule = require("../" + this.designedComponentPath.replace(".ts", ".js"));


        let formClassName: string = "";
        // ищем объект дизайнера - это первый class, который наследован от Component
        for (let moduleClass of Object.keys(formModule)) {
            if (Component.isPrototypeOf(formModule[moduleClass])) {
                formClassName = moduleClass;
            }
        }
        if (formClassName === "") {
            throw  "Не найден объект для дизайна в файле '" + this.designedComponentPath + "'";
        }

        // let ccc = new Component();
        // (window as any).ccc = Component;
        // (window as any).formModule = formModule;
        // console.log("formModule", formModule);
        //
        //
        // //let formClassName = path.basename(this.designedComponentPath, ".ts");
        // console.log("prot", formModule[formClassName].isPrototypeOf(Component));
        // console.log("prot2", Component.isPrototypeOf(formModule[formClassName]));

        this.designedForm = new formModule[formClassName]() as Component;
        this.designedForm.init();

        this.designerPanel = this.designedForm.getDesignerPanel();
        this.formTab.childrenAdd(this.designerPanel);


        this.loadRegisteredComponents();
    }

    reloadPropertyEditor() {
        if (this.propertyEditor)
            this.propertyEditor.renderEditors();
    }

    componentsListBox_DblClick(eventArgs: IListBoxEventArgs) {
        console.log(eventArgs.item.value);
        let compRegInfo = eventArgs.item.value as IComponentRegistration;
        let newComponent = new (compRegInfo.componentClass as any)();
        this.addNewComponent(newComponent);
    }

    getComponentNewName(component: Component): string {
        let compClassName = component.constructor.name;
        for (let i = 0; i < 10000; i++) {
            let newName = compClassName + i.toString();
            if (!(this.designedForm as any)[newName]) {
                return newName;
            }
        }
        throw "ошибка getComponentNewName()";
    }


    addNewComponent(component: Component) {
        let parent = this.designedForm;
        if (this.activeComponent && this.activeComponent.allowChildren)
            parent = this.activeComponent;
        let compName = this.getComponentNewName(component);
        (component as any)._left = 10;
        (component as any)._top = 10;
        component.designModeInitializeNew();
        (this.designedForm as any)[compName] = component;
        parent.childrenAdd(component);
        console.log(compName, component);
        this.designerPanel.reRender();
    }

    loadRegisteredComponents() {
        let items: IListBoxItem[] = [];

        for (let regComp of getRegisteredComponents()) {
            items.push({
                label: regComp.componentClass.name + "  (" + regComp.title + ")",
                group: regComp.category,
                value: regComp,
                image: regComp.image
            });
        }

        this.componentsListBox.dataSource = items;

    }

    createAppToolBar() {
        let saveButton: ToolButton = new ToolButton();
        saveButton.group = "form-designer";
        saveButton.image = "vendor/fugue/icons/disk.png";
        saveButton.onClick = (sender) => {
            this.save();
        };
        appState.toolbar.childrenAdd(saveButton);

        let runButton: ToolButton = new ToolButton();
        runButton.group = "form-designer";
        runButton.image = "vendor/fugue/icons/control.png";
        runButton.onClick = (sender) => {
            this.testRun();
        };
        appState.toolbar.childrenAdd(runButton);

        let compileButton: ToolButton = new ToolButton();
        compileButton.group = "form-designer";
        compileButton.image = "vendor/fugue/icons/compile.png";
        compileButton.onClick = (sender) => {
            this.compile();
        };
        appState.toolbar.childrenAdd(compileButton);
    }

    testRun() {
        this.save();

        let formModuleName="../" + this.designedComponentPath.replace(".ts", ".js");
        console.log("testRun",formModuleName);
        let formModule = require(formModuleName);

        //formModule = replaceAll(formModule, "\\", "/");

        let formClassName = path.basename(this.designedComponentPath, ".ts");
        let testform = new formModule[formClassName]() as Window;
        testform.render();

    }

    compile() {

    }

    save() {
        if (!this.designedForm) {
            console.log(this.constructor.name + ".save(): нет designedForm");
            return;
        }
        let e = new EmittedCode();
        this.designedForm.emitCode(e);

        let codeLines: string[];
        codeLines = this.codeEditor.code.split("\n");

        let empty: string[] = [];
        let beforeDecl: string[] = [];
        let afterDeclBeforeInit: string[] = [];
        let afterInit: string[] = [];

        let newCode = beforeDecl;
        for (let line of codeLines) {
            if (line.indexOf("//=== BEGIN-DESIGNER-DECLARE-CODE ===//") > 0) {
                newCode.push(line);
                newCode.push(e.getDeclaresCode());
                newCode = empty;
                continue;
            }
            if (line.indexOf("//=== END-DESIGNER-DECLARE-CODE ===//") > 0) {
                newCode = afterDeclBeforeInit;
            }
            if (line.indexOf("//=== BEGIN-DESIGNER-INIT-CODE ===//") > 0) {
                newCode.push(line);
                newCode.push(e.getInitsCode());
                newCode = empty;
                continue;
            }
            if (line.indexOf("//=== END-DESIGNER-INIT-CODE ===//") > 0) {
                newCode = afterInit;
            }
            newCode.push(line);

        }

        let code = beforeDecl.join("\n") + "\n" + afterDeclBeforeInit.join("\n") + "\n" + afterInit.join("\n") + "\n";
        this.codeEditor.code = code;

        let p = path.parse(this.designedComponentPath);
        let bakFileName = p.dir + "/" + p.name + ".bak";
        let jsFileName = p.dir + "/" + p.name + ".js";

        console.log(this.designedComponentPath, bakFileName);
        fs.renameSync(this.designedComponentPath, bakFileName);
        fs.writeFileSync(this.designedComponentPath, code);

        //console.log(code);

        let ts = require("typescript");

        let compilerOptions: CompilerOptions = {
            module: ts.ModuleKind.CommonJS,
            noEmitOnError: true,
            sourceMap: false,
            removeComments: true,
            target: ScriptTarget.ES2017,
            jsx: JsxEmit.React,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            noImplicitThis: true,
            strictNullChecks: true,
            lib: [
                "es2017",
                "dom"
            ],
            skipLibCheck: true
        };

        let res = ts.transpileModule(code, {
            reportDiagnostics: true,
            compilerOptions: compilerOptions,
            fileName: this.designedComponentPath
        });

        // let xxx=eval(res.outputText);
        // console.log("xxx",xxx);
        //
        //console.log(res.diagnostics);
        let errors: string[] = [];
        for (let diag of res.diagnostics) {
            if (diag.category === DiagnosticCategory.Error) {
                errors.push("ошибка!  " + diag.messageText);
            }
        }
        if (errors.length > 0) {
            alert(errors.join("\n"));
        }
        else
            fs.writeFileSync(jsFileName, res.outputText);

        //console.log(res.outputText);

        // reload module
        //console.log("jsFileName" ,jsFileName);
        Object.keys(require.cache).forEach(module => {
            //console.log("cached module" ,module);
            if (replaceAll(module, "\\", "/").indexOf(jsFileName) >= 0) {
                delete require.cache[module];
                console.log("module reloaded-> " + module);
            }
        });


    }
}
