import {Window} from "../../platform/components/gui/Window";
import {Button} from "../../platform/components/gui/Button";
import {Input} from "../../platform/components/gui/Input";
import {IEventArgs} from "../../platform/components/Component";

export class ТестоваяФормаДляДизайнера extends Window {

    //=== BEGIN-DESIGNER-DECLARE-CODE ===//
    кнопка123:Button = new Button();
    кнопка2:Button = new Button();
    edit1:Input = new Input();
    //=== END-DESIGNER-DECLARE-CODE ===//

    init() {
        super.init();

        //=== BEGIN-DESIGNER-INIT-CODE ===//
        this.top=10;
        this.left=10;
        this.height=400;
        this.width=300;
        this.кнопка123.text="это кнопка 1";
        this.кнопка123.top=10;
        this.кнопка123.left=30;
        this.кнопка123.height=316;
        this.кнопка123.width=89;
        this.childrenAdd(this.кнопка123);
        this.кнопка2.text="это кнопка 2";
        this.кнопка2.top=100;
        this.кнопка2.left=145;
        this.childrenAdd(this.кнопка2);
        this.edit1.bindProperty="text";
        this.edit1.top=180;
        this.edit1.left=85;
        this.edit1.height=13;
        this.childrenAdd(this.edit1);
        //=== END-DESIGNER-INIT-CODE ===//
    }

    кнопка123456_Click(args: IEventArgs) {
        ///  this.tabs.tabsPosition="bottom"; костя23
    }
}









