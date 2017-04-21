import {Component, IComponentRegistration, IEvent, IEventArgs, Компоненты_Панели} from "../Component";
import {EmittedCode} from "../code-emitter/EmittedCode";
//import SplitterPanel = jqwidgets.SplitterPanel;
import {FlexPanelItem} from "./FlexPaneltem";
import {PanelDock} from "./DockPanel";


export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Панели,
        componentClass: FlexPanel,
        image: "vendor/fugue/icons/application-dock-180.png",
        title: "flex-панель"
    }
}

export class FlexPanel extends Component {

    constructor() {
        super();
    }

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
        if (this.$) {
            if (this.dock === "fill") {
                this.$.css("top", "0px");
            }
            else if (value) {
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
        if (this.$) {
            if (this.dock === "fill") {
                this.$.css("left", "0px");
            }
            else if (value) {
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
        if (this.$)
            if (this.dock === "fill") {
                this.$.height("100%");
            }
            else if (value) {
                this.$.height(value);
            }
    }

    private __emitCode_height(code: EmittedCode) {
        code.emitNumberValue(this, "height");
    }

    private __setOptions_height() {
        this.height = this._height;
    }

    // ------------------------------ width ------------------------------
    _width: number;
    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        if (this.$)
            if (this.dock === "fill") {
                this.$.width("100%");
            }
            else if (value) {
                this.$.width(value);
            }
    }

    private __emitCode_width(code: EmittedCode) {
        code.emitNumberValue(this, "width");
    }

    private __setOptions__width() {
        this.width = this._width;
    }


    // ------------------------------ renderBody ------------------------------
    renderBody() {

    }

    render() {
        if (!this.initialized)
            this.init();

        this.beforeRender();

        this.$ = $("<div style='border: 0px solid green; display: flex; flex-direction: column;' id='" + this.$id + "'></div>").appendTo(this.parent.$childrenContainer);

        this.__setOptions_left();
        this.__setOptions_top();
        this.__setOptions_height();
        this.__setOptions__width();
        this.__setOptions_dock();

        for (let child of this.children) {
            let item = child as FlexPanelItem;
            if (item.dock === "top")
                child.render(this._designer);
        }

        for (let child of this.children) {
            let item = child as FlexPanelItem;
            if (item.dock === "fill")
                child.render(this._designer);
        }

        for (let child of this.children) {
            let item = child as FlexPanelItem;
            if (item.dock === "bottom")
                child.render(this._designer);
        }

        this.afterRender();

    }

}