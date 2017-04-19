import * as fs from "fs";
import * as path from "path";
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
import {EmittedCode} from "../platform/components/code-emitter/EmittedCode";
import {CompilerOptions, DiagnosticCategory, JsxEmit, ScriptTarget} from "typescript";
import {replaceAll} from "../platform/utils/replaceAll";
import {PropertiesEditor} from "./PropertiesEditor";
import {IListBoxItem, ListBox} from "../platform/components/gui/ListBox";
import {getRegisteredComponents} from "./utils/getRegisteredComponents";

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


        appState.activeComponent = this.activeComponent;
        this.propertyEditor.editedObject = this.activeComponent;

        for (let func of this.onAfterActiveComponentChanged) {
            func(value, savedOld);
        }

        let frame = this._activeComponent.$;
        frame.$$savedBorder = frame.css("outline");
        frame.css("outline", "solid 2px deepskyblue");
        frame.resizable({
            grid: 5,
        });
        frame.on("resize", (event: any, ui: any) => {
            (this._activeComponent as any).width = ui.size.width;
            (this._activeComponent as any).height = ui.size.height;
        });

        //console.log("new active", value);
    }

    // ------------------------------ onClick ------------------------------

    onBeforeActiveComponentChanged: ((newActiveComponent: Component, oldActiveComponent: Component) => boolean)[] = [];
    onAfterActiveComponentChanged: ((newActiveComponent: Component, oldActiveComponent: Component) => void)[] = [];

    //=== BEGIN-DESIGNER-DECLARE-CODE ===//
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
    propertyEditor: PropertiesEditor = new PropertiesEditor();

    componentsTab: Tab = new Tab();
    componentsListBox: ListBox = new ListBox();

    formExplorerTab: Tab = new Tab();

    //=== END-DESIGNER-DECLARE-CODE ===//


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
        this.formTab.title = "Форма";
        this.formTab.childrenAdd(this.formDesignerPanel);

        this.codeTab.title = "Код";
        this.codeTab.onSelect = () => {
            this.codeEditor.initMonacoEditor();
        };
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
        this.rightTabsPanel.childrenAdd(this.componentsTab);

        this.componentsListBox.dock="fill";
        this.componentsListBox.allowDrag=true;
        this.componentsTab.childrenAdd(this.componentsListBox);


        this.formExplorerTab.title = "Структура";
        this.rightTabsPanel.childrenAdd(this.formExplorerTab);
        //=== END-DESIGNER-INIT-CODE ===//


        this.codeEditor.code = fs.readFileSync(this._designedFormPath, "utf8");

        let formModule = require("../" + this.designedFormPath.replace(".ts", ".js"));
        let formClassName = path.basename(this.designedFormPath, ".ts");
        this.designedForm = new formModule[formClassName]();

        this.loadRegisteredComponents();
    }

    loadRegisteredComponents() {
        let items: IListBoxItem[] = [];

        for (let regComp of getRegisteredComponents()){
            items.push({
                label: regComp.title+"  (" +regComp.componentClass.name+")",
                group:regComp.category

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
        let formModule = require("../" + this.designedFormPath.replace(".ts", ".js"));
        let formClassName = path.basename(this.designedFormPath, ".ts");
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

        let p = path.parse(this.designedFormPath);
        let bakFileName = p.dir + "/" + p.name + ".bak";
        let jsFileName = p.dir + "/" + p.name + ".js";

        console.log(this.designedFormPath, bakFileName);
        fs.renameSync(this.designedFormPath, bakFileName);
        fs.writeFileSync(this.designedFormPath, code);

        console.log(code);

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
            fileName: this.designedFormPath
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

        console.log(res.outputText);

        // reload module
        Object.keys(require.cache).forEach(module => {
            if (replaceAll(module, "\\", "/").indexOf(jsFileName) >= 0) {
                delete require.cache[module];
                console.log("module reloaded-> " + module);
            }
        });


    }
}
