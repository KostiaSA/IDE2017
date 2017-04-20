import {Window} from "../../platform/components/gui/Window";
import {Button} from "../../platform/components/gui/Button";
import {Input} from "../../platform/components/gui/Input";
import {IEventArgs} from "../../platform/components/Component";
import {ListBox} from "../../platform/components/gui/ListBox";

export class ТестоваяФормаДляДизайнера extends Window {

    //=== BEGIN-DESIGNER-DECLARE-CODE ===//
    кнопка123:Button = new Button();
    кнопка2:Button = new Button();
    edit1:Input = new Input();
    Button0:Button = new Button();
    Button2:Button = new Button();
    Button3:Button = new Button();
    ListBox0:ListBox = new ListBox();
    //=== END-DESIGNER-DECLARE-CODE ===//

    init() {
        super.init();

        //=== BEGIN-DESIGNER-INIT-CODE ===//
        this.top=15;
        this.left=20;
        this.height=580;
        this.width=560;
        this.кнопка123.text="это кноп";
        this.кнопка123.top=255;
        this.кнопка123.left=35;
        this.кнопка123.height=86;
        this.кнопка123.width=89;
        this.childrenAdd(this.кнопка123);
        this.кнопка2.text="это кнопка 288800";
        this.кнопка2.top=50;
        this.кнопка2.left=335;
        this.кнопка2.height=26;
        this.кнопка2.width=95;
        this.childrenAdd(this.кнопка2);
        this.edit1.bindProperty="text";
        this.edit1.top=100;
        this.edit1.left=35;
        this.edit1.height=98;
        this.edit1.width=265;
        this.childrenAdd(this.edit1);
        this.Button0.text="Новая кнопка old";
        this.Button0.top=25;
        this.Button0.left=210;
        this.childrenAdd(this.Button0);
        this.Button2.text="Новая кнопка 33333333";
        this.Button2.top=190;
        this.Button2.left=375;
        this.childrenAdd(this.Button2);
        this.Button3.text="Новая кнопка";
        this.Button3.top=50;
        this.Button3.left=75;
        this.childrenAdd(this.Button3);
        this.ListBox0.top=250;
        this.ListBox0.left=170;
        this.ListBox0.height=45;
        this.ListBox0.width=345;
        this.childrenAdd(this.ListBox0);
        //=== END-DESIGNER-INIT-CODE ===//
    }

    кнопка123456_Click(args: IEventArgs) {
        alert("222222222222");
        //sss223=qq.qq();
        ///  this.tabs.tabsPosition="bottom"; костя23
    }
}



