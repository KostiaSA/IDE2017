import {Component, IComponentRegistration, IEvent, IEventArgs, Компоненты_Панели} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
//import SplitterPanel = jqwidgets.SplitterPanel;
import {HorzFlexPanelItem} from "./HorzFlexPaneltem";
import {PanelDock} from "./DockPanel";
import {PropertyEditor, Категория_РазмерПозиция} from "../../../designer/PropertyEditor";
import {StringPropertyEditor} from "../../../designer/StringPropertyEditor";
import {getRandomId} from "../../../app/utils/getRandomId";
import {IDesigner} from "../../designer/IDesigner";
import {DockNoneFillMixin} from "./mixin/DockNoneFillMixin";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";


export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Панели,
        componentClass: HorzFlexPanel,
        image: "vendor/fugue/icons/application-dock-090.png",
        title: "горизонтальная flex-панель"
    }
}

export class HorzFlexPanel extends DockNoneFillMixin(
    TopLeftMixin(
        HeightWidthMixin(Component))) {

    constructor() {
        super();
    }

    // // ------------------------------ dock ------------------------------
    // _dock: PanelDock = "none";
    // get dock(): PanelDock {
    //     return this._dock;
    // }
    //
    // set dock(value: PanelDock) {
    //     let needRefresh = this._dock !== value;
    //     this._dock = value;
    //     if (this.$ && needRefresh) {
    //         this.top = this._top;
    //         this.left = this._left;
    //         this.width = this._width;
    //         this.height = this._height;
    //     }
    // }
    //
    // protected __emitCode_dock(code: EmittedCode) {
    //     code.emitStringValue(this, "dock", "none");
    // }
    //
    // protected __setOptions_dock() {
    //     this.dock = this._dock;
    // }
    //
    // protected __getPropertyEditor__dock(): PropertyEditor {
    //     let pe = new StringPropertyEditor();
    //     pe.comboType = "array";
    //     pe.comboItemsArray = ["none", "fill"];
    //     pe.propertyName = "comboType";
    //     pe.category = Категория_РазмерПозиция;
    //     return pe;
    // }

    // // ------------------------------ top ------------------------------
    // _top: number;
    // get top(): number {
    //     return this._top;
    // }
    //
    // set top(value: number) {
    //     this._top = value;
    //     if (this.$) {
    //         if (this.dock === "fill") {
    //             this.$.css("top", "0px");
    //         }
    //         else if (value) {
    //             this.$.css("top", value + "px");
    //             this.$.css("position", "absolute");
    //
    //         }
    //     }
    // }
    //
    // private __emitCode_top(code: EmittedCode) {
    //     code.emitNumberValue(this, "top");
    // }
    //
    // private __setOptions_top() {
    //     this.top = this._top;
    // }
    //
    //
    // // ------------------------------ left ------------------------------
    // _left: number;
    // get left(): number {
    //     return this._left;
    // }
    //
    // set left(value: number) {
    //     this._left = value;
    //     if (this.$) {
    //         if (this.dock === "fill") {
    //             this.$.css("left", "0px");
    //         }
    //         else if (value) {
    //             this.$.css("left", value + "px");
    //             this.$.css("position", "absolute");
    //         }
    //     }
    // }
    //
    // private __emitCode_left(code: EmittedCode) {
    //     code.emitNumberValue(this, "left");
    // }
    //
    // private __setOptions_left() {
    //     this.left = this._left;
    // }
    //
    // ------------------------------ height ------------------------------
    // _height: number;
    // get height(): number {
    //     return this._height;
    // }
    //
    // set height(value: number) {
    //     this._height = value;
    //     if (this.$)
    //         if (this.dock === "fill") {
    //             this.$.height("100%");
    //         }
    //         else if (value) {
    //             this.$.height(value);
    //         }
    // }
    //
    // protected __emitCode_height(code: EmittedCode) {
    //     code.emitNumberValue(this, "height");
    // }
    //
    // protected  __setOptions_height() {
    //     this.height = this._height;
    // }

    // // ------------------------------ width ------------------------------
    // _width: number;
    // get width(): number {
    //     return this._width;
    // }
    //
    // set width(value: number) {
    //     this._width = value;
    //     if (this.$)
    //         if (this.dock === "fill") {
    //             this.$.width("100%");
    //         }
    //         else if (value) {
    //             this.$.width(value);
    //         }
    // }
    //
    // private __emitCode_width(code: EmittedCode) {
    //     code.emitNumberValue(this, "width");
    // }
    //
    // private __setOptions__width() {
    //     this.width = this._width;
    // }
    //

    // ------------------------------ renderBody ------------------------------
    renderBody() {

    }

    render(designer?: IDesigner) {
        this._designer = designer;
        if (!this.initialized)
            this.init();

        //this._$id = getRandomId();
        this.beforeRender();

        $("<div style='border: 1px solid green; display: flex; flex-direction: column;' id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);

        this.setJqxWidgetOptions();

        for (let child of this.children) {
            let item = child as HorzFlexPanelItem;
            if (item.dock === "top") {
                child.render(this._designer);
            }
        }
        for (let child of this.children) {
            let item = child as HorzFlexPanelItem;
            if (item.dock === "fill") {
                child.render(this._designer);
            }
        }

        for (let child of this.children) {
            let item = child as HorzFlexPanelItem;
            if (item.dock === "bottom") {
                child.render(this._designer);
            }
        }


        this.afterRender();

    }

    reRender() {

        this.$.empty();

        for (let child of this.children) {
            let item = child as HorzFlexPanelItem;
            if (item.dock === "top")
                child.render(this._designer);
        }

        for (let child of this.children) {
            let item = child as HorzFlexPanelItem;
            if (item.dock === "fill")
                child.render(this._designer);
        }

        for (let child of this.children) {
            let item = child as HorzFlexPanelItem;
            if (item.dock === "bottom")
                child.render(this._designer);
        }
        console.log("reRender-flex-parent");
        this.afterRender();

    }

}