import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
import Tabs = jqwidgets.jqxTabs;
import {Tab} from "./Tab";

import jqxWidgetOptions = jqwidgets.TabsOptions;
import {PanelDock} from "./SplitPanel";

export type TabsPosition = "top" | "bottom";

export class TabsPanel extends Component {

    constructor() {
        super();
        this.renderJqxWidgetAfterChildren = true;
    }

    jqxWidget(...args: any[]): Function {
        return this.$.jqxTabs(...args);
    };

    // ------------------------------ dock ------------------------------
    _dock: PanelDock = "none";
    get dock(): PanelDock {
        return this._dock;
    }

    set dock(value: PanelDock) {
        let needRefresh = this._dock !== value;
        this._dock = value;
        if (this.$ && needRefresh) {
            this.top = this._top;
            this.left = this._left;
            this.width = this._width;
            this.height = this._height;
        }
    }

    private __emitCode_dock(code: EmittedCode) {
        code.emitStringValue(this, "dock", "none");
    }

    private __setOptions_dock() {
        this.dock = this._dock;
    }

    // ------------------------------ top ------------------------------
    _top: number;
    get top(): number {
        return this._top;
    }

    set top(value: number) {
        this._top = value;
        if (this.$ && value) {
            if (this.dock === "fill") {
                this.$.css("top", "0px");
            }
            else {
                this.$.css("top", value + "px");
                this.$.css("position", "absolute");
            }
        }
    }

    private __emitCode_top(code: EmittedCode) {
        code.emitNumberValue(this, "top");
    }

    private __setOptions_top() {
        this.top = this._top;
    }


    // ------------------------------ left ------------------------------
    _left: number;
    get left(): number {
        return this._left;
    }

    set left(value: number) {
        this._left = value;
        if (this.$ && value) {
            if (this.dock === "fill") {
                this.$.css("left", "0px");
            }
            else {
                this.$.css("left", value + "px");
                this.$.css("position", "absolute");
            }
        }
    }

    private __emitCode_left(code: EmittedCode) {
        code.emitNumberValue(this, "left");
    }

    private __setOptions_left() {
        this.left = this._left;
    }

    // ------------------------------ height ------------------------------
    _height: number;
    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        if (this.$ && value)
            if (this.dock === "fill") {
                this.jqxWidget({height: "100%"} as jqxWidgetOptions);
            }
            else {
                this.jqxWidget({height: value} as jqxWidgetOptions);
            }
    }

    private __emitCode_height(code: EmittedCode) {
        code.emitNumberValue(this, "height");
    }

    private __fillOptions_height(opt: jqxWidgetOptions) {
        if (this.dock === "fill")
            opt.height = "100%";
        else
            opt.height = this.height;
    }

    // ------------------------------ width ------------------------------
    _width: number;
    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        if (this.$ && value)
            if (this.dock === "fill") {
                this.jqxWidget({width: "100%"} as jqxWidgetOptions);
            }
            else {
                this.jqxWidget({width: value} as jqxWidgetOptions);
            }
    }

    private __emitCode_width(code: EmittedCode) {
        code.emitNumberValue(this, "width");
    }

    private __fillOptions_width(opt: jqxWidgetOptions) {
        if (this.dock === "fill")
            opt.width = "100%";
        else
            opt.width = this.width;
    }

    // ------------------------------ tabsPosition ------------------------------
    _tabsPosition: TabsPosition = "top";
    get tabsPosition(): TabsPosition {
        return this._tabsPosition;
    }

    set tabsPosition(value: TabsPosition) {
        this._tabsPosition = value;
        if (this.$) {
            this.jqxWidget({position: this.tabsPosition} as jqxWidgetOptions);
        }
    }

    private __emitCode_tabsPosition(code: EmittedCode) {
        code.emitStringValue(this, "tabsPosition", "top");
    }

    private __fillOptions_tabsPosition(opt: jqxWidgetOptions) {
        opt.position = this.tabsPosition;
    }


    // ------------------------------ renderBody ------------------------------
    renderBody() {
        this.$ = $("<div style='border: 0px solid orange' id='" + this.$id + "'><ul id='" + this.$id + "-ul'></ul></div>").appendTo(this.parent.$childrenContainer);
    }

    afterRender() {
        this.$.on("selected", (event: any) => {
            var selectedTab = event.args.item;
            let title = this.jqxWidget("getTitleAt", selectedTab).toString();
            let tab = this.getTabByTitle(title);
            if (tab.onSelect) {
                tab.onSelect.call(tab, tab);
            }
            //console.log("selectedTab", selectedTab, title);
        });
    };

    getTabByTitle(title: string): Tab {
        for (let child of this.children) {
            if ((child as Tab).title === title)
                return child as Tab;
        }
        throw "TabPanel.getTabByTitle(): не найден Tab '" + title + "'";
    }

    fillJqxWidgetOptions(opt: jqxWidgetOptions) {
        //opt.panels = this.getPanelsLayout();
        //opt.TabsBarSize = 3;
    }

}