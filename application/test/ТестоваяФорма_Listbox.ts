import {Window} from "../../platform/components/gui/Window";
import {Button} from "../../platform/components/gui/Button";
import {Input} from "../../platform/components/gui/Input";
import {IEventArgs} from "../../platform/components/Component";
import {ListBox} from "../../platform/components/gui/ListBox";

export class ТестоваяФорма_Listbox extends Window {

    //=== BEGIN-DESIGNER-DECLARE-CODE ===//
    ListBox0:ListBox = new ListBox();
    //=== END-DESIGNER-DECLARE-CODE ===//

    init() {
        super.init();

        //=== BEGIN-DESIGNER-INIT-CODE ===//
        this.top=10;
        this.left=10;
        this.height=580;
        this.width=560;
        this.ListBox0.top=10;
        this.ListBox0.left=10;
        this.ListBox0.height=500;
        this.ListBox0.width=400;
        this.ListBox0.dataSource=[{"label":"22222","group":"ffffffff","value":22},{"label":"2224442222","group":"ffffffff"},{"label":"22ggg222","group":"ffff444ffff"}];
        this.childrenAdd(this.ListBox0);
        //=== END-DESIGNER-INIT-CODE ===//

        this.ListBox0.dataSource=[{label:"22222",group:"ffffffff",value:22},{label:"2224442222",group:"ffffffff"},{label:"22ggg222",group:"ffff444ffff"}];
    }

    кнопка123456_Click(args: IEventArgs) {
        alert("222222222222");
        //sss223=qq.qq();
        ///  this.tabs.tabsPosition="bottom"; костя23
    }
}








