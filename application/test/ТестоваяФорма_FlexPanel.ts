import {Window} from "../../platform/components/gui/Window";
import {Button} from "../../platform/components/gui/Button";
import {Input} from "../../platform/components/gui/Input";
import {IEventArgs} from "../../platform/components/Component";
import {ListBox} from "../../platform/components/gui/ListBox";
import {HorzFlexPanel} from "../../platform/components/gui/HorzFlexPanel";
import {HorzFlexPanelItem} from "../../platform/components/gui/HorzFlexPaneltem";

export class ТестоваяФорма_FlexPanel extends Window {

    //=== BEGIN-DESIGNER-DECLARE-CODE ===//
    panel:HorzFlexPanel = new HorzFlexPanel();
    topPanel:HorzFlexPanelItem = new HorzFlexPanelItem();
    but1:Button=new Button();
    fillPanel:HorzFlexPanelItem = new HorzFlexPanelItem();
    //=== END-DESIGNER-DECLARE-CODE ===//

    init() {
        super.init();

        //=== BEGIN-DESIGNER-INIT-CODE ===//
        this.top=10;
        this.left=10;
        this.height=580;
        this.width=560;
        this.panel.top=10;
        this.panel.left=10;
        this.panel.height=500;
        this.panel.width=400;
        this.childrenAdd(this.panel);

        this.but1.top=5;
        this.but1.left=500;
        this.but1.text="XXX=YYY";
        this.childrenAdd(this.but1);

        this.topPanel.size=100;
        this.topPanel.dock="top";
        this.panel.childrenAdd(this.topPanel);

        //this.fillPanel.size=200;
        this.fillPanel.dock="fill";
        this.panel.childrenAdd(this.fillPanel);
        //=== END-DESIGNER-INIT-CODE ===//

    }

    кнопка123456_Click(args: IEventArgs) {
        alert("222222222222");
        //sss223=qq.qq();
        ///  this.tabs.tabsPosition="bottom"; костя23
    }
}








