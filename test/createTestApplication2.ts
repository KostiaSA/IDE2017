import {appState} from "../platform/AppState";
import {ComponentDesignerWindow} from "../app/designer/ComponentDesignerWindow";
import {IProxyExecuteSqlRequest, IProxyExecuteSqlAnswer, executeSql} from "../app/sql/executeSql";
import {Window} from "../platform/components/gui/Window";
import {Button} from "../platform/components/gui/Button";
import {EmittedCode} from "../platform/components/code-emitter/EmittedCode";
import {IEventArgs} from "../platform/components/Component";


export class TestWindow extends Window {
    //=== код дизайнера (объявление свойств начало) ===//
    кнопка123: Button = new Button();
    testSql: Button = new Button();
    //=== код дизайнера (объявление свойств конец) ===//
    init() {
        super.init();
        //=== код дизайнера (конструктор начало) ===//
        this.top = 100;
        this.left = 300;
        this.кнопка123.name = "кнопка123";
        this.кнопка123.top = 100;
        this.кнопка123.left = 100;
        this.кнопка123.text = "это кнопка123456";
        this.кнопка123.onClick = this.кнопка123456_Click;
        this.children.push(this.кнопка123);
        this.testSql.name = "testSql";
        this.testSql.top = 200;
        this.testSql.left = 200;
        this.testSql.text = "test sql 456";
        this.children.push(this.testSql);
        this.title = "win1122---";
        //=== код дизайнера (конструктор конец) ===//
    }

    кнопка123_Click = (args: IEventArgs) => {
        this.кнопка123.text = "жопа1";
        //alert("12")
    }

    кнопка123456_Click (args: IEventArgs) {
        this.кнопка123.text = "жопа456";
        this.кнопка123.onClick = this.кнопка123_Click;
        //alert("12")
    }
}


export function createTestApplication2() {

    let w=new TestWindow();
    appState.desktop.windows.push(w);

    setTimeout(()=>{
        console.log("time");
        let code: string[] = [];
        code.push("export class " + w.name + " extends Window {");

        let e = new EmittedCode();
        w.emitCode(e, 0);
        code.push(e.getDeclaresCode());
        code.push("  init(){");
        code.push(e.getInitsCode());
        code.push("  }");
        code.push("}");
        console.log(code.join("\n"));

    },1000);


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
