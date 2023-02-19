import { Blackboard } from "./UIProperty";

const { ccclass, property } = cc._decorator;
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    if (obj instanceof Array) {
        let copy = [];
        for (let i = 0, len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    if (obj instanceof Object) {
        let copy = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};
@ccclass
export class UILayerProperty extends cc.Component{
    @property({
        tooltip: '全局么☻',
    })

    global_mode: boolean = false;
    static Instance:UILayerProperty = null;
    @property({
        type: cc.Node,
        tooltip: "背景层"
    })
    BACKGROUND: cc.Node = null;
    @property({
        type: cc.Node,
        tooltip: "内容层"
    })
    CONTENT: cc.Node = null;
    @property({
        type: cc.Node,
        tooltip: "弹出框层"
    })
    DIALOG: cc.Node = null;
    @property({
        type: cc.Node,
        tooltip: "网络层"
    })
    NETWORK: cc.Node = null;
    @property({
        type: cc.Node,
        tooltip: "阻塞层"
    })
    BLOCKER: cc.Node = null;
    _blackboard: Blackboard = new Blackboard;

    constructor() {
        super();
    }

    _initComp() {
        if (UILayerProperty.Instance == null && this.global_mode) {
            UILayerProperty.Instance = this;
        }
    }

    onLoad() {
        this._initComp();
    }

    onDestroy() {
        if (this.global_mode && UILayerProperty.Instance) {
            UILayerProperty.Instance = null;
        }
    }

    
    reInit() {
        this.BACKGROUND = null;
        this.CONTENT = null;
        this.DIALOG = null;
        this.NETWORK = null;
        this.BLOCKER = null;
        this._blackboard = null;
    }

    
    clear() {
        this.BACKGROUND = null;
        this.CONTENT = null;
        this.DIALOG = null;
        this.NETWORK = null;
        this.BLOCKER = null;
        this._blackboard = null;
    }
    loadProperty(property: any) {
        this.BACKGROUND = clone(property.BACKGROUND); //背景层
        this.CONTENT = clone(property.CONTENT); //内容层
        this.DIALOG = clone(property.DIALOG); //弹出框层
        this.NETWORK = clone(property.NETWORK); //网络层
        this.BLOCKER = clone(property.BLOCKER); //阻塞层
        this._blackboard = clone(property._blackboard); //123
    }
} 
