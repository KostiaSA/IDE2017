import {appState} from "../platform/AppState";
import {ComponentDesignerWindow} from "../app/designer/ComponentDesignerWindow";
import {IProxyExecuteSqlRequest, IProxyExecuteSqlAnswer, executeSql} from "../app/sql/executeSql";
import {Window} from "../platform/components/gui/Window";
import {Button} from "../platform/components/gui/Button";
import {EmittedCode} from "../platform/components/code-emitter/EmittedCode";
import {IEventArgs} from "../platform/components/Component";
import {Panel} from "../platform/components/gui/Panel";
import {Layout} from "../platform/components/gui/Layout";
import {LayoutPanel} from "../platform/components/gui/LayoutPanel";
import {SplitPanel} from "../platform/components/gui/SplitPanel";
import {SplitPanelItem} from "../platform/components/gui/SplitPaneltem";
import {TabsPanel} from "../platform/components/gui/TabPanel";
import {Tab} from "../platform/components/gui/Tab";
import {ComponentDesigner_Window} from "../designer/ComponentDesigner_Window";
import {Input} from "../platform/components/gui/Input";

export class TestWindow0 extends Window {
    кнопка123: Button = new Button();
    tabs: TabsPanel = new TabsPanel();
    tab1: Tab = new Tab();
    кнопкаPanel123: Button = new Button();
    tab2: Tab = new Tab();
    кнопкаPanel1232: Button = new Button();

    init() {
        super.init();

        //=== код дизайнера (конструктор начало) ===//
        this.top = 100;
        this.left = 100;
        this.height = 800;
        this.width = 600;

        this.tabs.top = 10;
        this.tabs.left = 10;
        this.tabs.width = 150;
        this.tabs.height = 150;
        this.tabs.tabsPosition="bottom";
        this.childrenAdd(this.tabs);

        this.tab1.title = "tab N1";
        this.tabs.childrenAdd(this.tab1);

        this.кнопкаPanel123.top = 10;
        this.кнопкаPanel123.left = 30;
        this.кнопкаPanel123.text = "это кнопка на панели";
        this.tab1.childrenAdd(this.кнопкаPanel123);

        this.tab2.title = "tab N2";
        this.tabs.childrenAdd(this.tab2);

        this.кнопкаPanel1232.top = 10;
        this.кнопкаPanel1232.left = 10;
        this.кнопкаPanel1232.text = "это кнопка 2";
        this.кнопкаPanel1232.onClick=this.кнопка123456_Click;
        this.tab2.childrenAdd(this.кнопкаPanel1232);
    }

    кнопка123456_Click(args: IEventArgs) {
        this.tabs.tabsPosition="bottom";
    }
}

export class TestWindow extends Window {
    //=== код дизайнера (объявление свойств начало) ===//
    кнопка123: Button = new Button();
    кнопкаPanel123: Button = new Button();
    testSql: Button = new Button();
    panel1: Panel = new Panel();
    layout1: Layout = new Layout();
    laypanel: LayoutPanel = new LayoutPanel();
    laypanel2: LayoutPanel = new LayoutPanel();

    splitPanel1: SplitPanel = new SplitPanel();
    panelA: SplitPanelItem = new SplitPanelItem();
    panelB: SplitPanelItem = new SplitPanelItem();
    кнопкаA: Button = new Button();
    кнопкаB: Button = new Button();

    //=== код дизайнера (объявление свойств конец) ===//
    init() {
        super.init();

        //=== код дизайнера (конструктор начало) ===//
        this.top = 100;
        this.left = 100;
        this.height = 800;
        this.width = 600;
        this.кнопка123.top = 100;
        this.кнопка123.left = 100;
        this.кнопка123.text = "это кнопка123456";
        this.кнопка123.onClick = this.кнопка123456_Click;
        this.childrenAdd(this.кнопка123);
        this.testSql.top = 200;
        this.testSql.left = 200;
        this.testSql.text = "test sql 456";
        this.childrenAdd(this.testSql);
        this.title = "win1122---";

        this.panel1.top = 10;
        this.panel1.left = 10;
        this.panel1.width = 150;
        this.panel1.height = 150;
        this.childrenAdd(this.panel1);

        this.кнопкаPanel123.top = 10;
        this.кнопкаPanel123.left = 10;
        this.кнопкаPanel123.text = "это кнопка на панели";
        this.panel1.childrenAdd(this.кнопкаPanel123);
        //
        // // this.layout1.top = 120;
        // // this.layout1.left = 10;
        // // this.layout1.width = 410;
        // // this.layout1.height = 410;
        // // //this.layout1.autoSize = true;
        // // this.childrenAdd(this.layout1);
        // //
        // // this.laypanel.width=100;
        // // this.laypanel.height=100;
        // // this.layout1.childrenAdd(this.laypanel);
        // //
        // // this.laypanel2.title="laypanel2";
        // // this.laypanel2.width=100;
        // // this.laypanel2.height=100;
        // // this.layout1.childrenAdd(this.laypanel2);
        //


        this.splitPanel1.top = 120;
        this.splitPanel1.left = 10;
        this.splitPanel1.width = 410;
        this.splitPanel1.height = 410;
        //this.splitPanel1.dock = "fill";
        this.splitPanel1.orientation = "vertical";
        this.childrenAdd(this.splitPanel1);


        this.panelA.size = "30%";
        this.splitPanel1.childrenAdd(this.panelA);

        this.panelB.size = "70%";
        this.splitPanel1.childrenAdd(this.panelB);

        this.кнопкаA.top = 10;
        this.кнопкаA.left = 10;
        this.кнопкаA.text = "кнопкаA";
        this.panelA.childrenAdd(this.кнопкаA);

        this.кнопкаB.top = 10;
        this.кнопкаB.left = 10;
        this.кнопкаB.text = "кнопкаB";
        this.panelB.childrenAdd(this.кнопкаB);
        //=== код дизайнера (конструктор конец) ===//
    }

    кнопка123_Click = (args: IEventArgs) => {
        //this.кнопка123.text = "жопа1";
        //alert("12")
    }

    кнопка123456_Click(args: IEventArgs) {
        this.кнопка123.text = "жопа456";
        console.log("set dock 0");
        this.splitPanel1.orientation = "horizontal";
        //this.splitPanel1.dock = "fill";
        //this.panel1.dock = "fill";
        // this.panel1.autoSize = true;
        //this.panel1.height = 100;
//        this.кнопка123.onClick = this.кнопка123_Click;
        //alert("12")
    }
}

export class TestWindow111 extends Window {
    кнопка123: Button = new Button();
    кнопка2: Button = new Button();
    edit1: Input = new Input();

    init() {
        super.init();

        //=== код дизайнера (конструктор начало) ===//
        this.top = 10;
        this.left = 10;
        this.height = 400;
        this.width = 300;


        this.кнопка123.top = 10;
        this.кнопка123.left = 30;
        this.кнопка123.text = "это кнопка 1";
        this.childrenAdd(this.кнопка123);

        this.кнопка2.top = 10;
        this.кнопка2.left = 130;
        this.кнопка2.text = "это кнопка 2";
        this.childrenAdd(this.кнопка2);

        this.edit1.top = 50;
        this.edit1.left = 30;
        this.edit1.bindObject = this.кнопка123;
        this.edit1.bindProperty = "text";
        this.childrenAdd(this.edit1);
    }

    кнопка123456_Click(args: IEventArgs) {
      ///  this.tabs.tabsPosition="bottom";
    }
}

export function createTestApplication2() {

    let w = new ComponentDesigner_Window();
    //w.designedComponentPath="application/test/ТестоваяФормаДляДизайнера.ts";
    w.designedComponentPath="application/test/Организация_SqlTable.ts";
    //w.designedForm=new TestWindow111();
    //w.designedForm.init();

    appState.desktop.windows.push(w);

    // setTimeout(() => {
    //     console.log("time");
    //     let code: string[] = [];
    //     code.push("export class " + w.name + " extends Window {");
    //
    //     let e = new EmittedCode();
    //     w.emitCode(e);
    //     code.push(e.getDeclaresCode());
    //     code.push("  init(){");
    //     code.push(e.getInitsCode());
    //     code.push("  }");
    //     code.push("}");
    //     console.log(code.join("\n"));
    //
    // }, 1000);
    //

    return;

    // let w = new Window();
    // w.top = 100;
    // w.left = 300;
    // w.name = "ПервоеОкноБухта";
    // w.title = `win1122---`;
    // let b = new Button();
    // b.text = "это кнопка123";
    // b.name = "кнопка123";
    // b.top = 100;
    // b.left = 100;
    //  b.onClick = (b:IEventArgs) => {
    //      alert("click"+b.sender.top);
    // //     b.text = b.text + "Жопа1";
    // //     //b.width = 400;
    // //     b.cssStyle.border = "1px solid red";
    // //     let x = new ComponentDesignerWindow();
    // //     x.openDesignerWindow(w);
    //  };
    // w.children.push(b);
    //
    // b = new Button();
    // b.text = "test sql";
    // b.name = "testSql";
    // b.top = 200;
    // b.left = 200;
    // // b.onClick = (b) => {
    // //     let req: IProxyExecuteSqlRequest = {
    // //         driverName: "mssql",
    // //         user: "sa",
    // //         password: "",
    // //         server: "dark\\sql2012",
    // //         database: "БалтийскийТекстильWMS",
    // //         sql: ["SELECT TOP 15000 Номер,Название FROM ТМЦ"]
    // //     }
    // //
    // //     executeSql(req).then((ans:IProxyExecuteSqlAnswer)=>{
    // //         console.log(ans)
    // //     });
    // //
    // // };
    // w.children.push(b);
    //
    //
    // let code: string[] = [];
    // code.push("export class " + w.name + " extends Window {");
    //
    // let e = new EmittedCode();
    // w.emitCode(e, 0);
    // code.push(e.getDeclaresCode());
    // code.push("  init(){");
    // code.push(e.getInitsCode());
    // code.push("  }");
    // code.push("}");
    // console.log(code.join("\n"));
    //
    //
    // appState.desktop.windows.push(w);

    // setInterval(()=>{
    //     b.text=getRandomString();
    //     w.title = getRandomString();
    // },1000);

}
