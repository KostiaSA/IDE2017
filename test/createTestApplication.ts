import {appState} from "../platform/AppState";
import {Window} from "../app/components/Window";
import {Button} from "../app/components/Button";
import {getRandomString} from "../app/utils/getRandomString";
import {ComponentDesignerWindow} from "../app/designer/ComponentDesignerWindow";
import {IProxyExecuteSqlRequest, IProxyExecuteSqlAnswer, executeSql} from "../app/sql/executeSql";

export function createTestApplication() {

    let w = new Window();
    w.top = 100;
    w.left = 300;
    w.title = "win1";
    let b = new Button();
    b.text = "это кнопка123";
    b.top = 100;
    b.left = 100;
    b.onClick = (b) => {
        b.text = b.text + "Жопа1";
        //b.width = 400;
        b.cssStyle.border = "1px solid red";
        let x = new ComponentDesignerWindow();
        x.openDesignerWindow(w);
    };
    w.controls.push(b);

    b = new Button();
    b.text = "test sql";
    b.top = 200;
    b.left = 200;
    b.onClick = (b) => {
        let req: IProxyExecuteSqlRequest = {
            driverName: "mssql",
            user: "sa",
            password: "",
            server: "dark\\sql2012",
            database: "БалтийскийТекстильWMS",
            sql: ["SELECT TOP 15000 Номер,Название FROM ТМЦ"]
        }

        executeSql(req).then((ans:IProxyExecuteSqlAnswer)=>{
            console.log(ans)
        });

    };
    w.controls.push(b);

    //appState.application.windows.push(w);

    // setInterval(()=>{
    //     b.text=getRandomString();
    //     w.title = getRandomString();
    // },1000);

}
