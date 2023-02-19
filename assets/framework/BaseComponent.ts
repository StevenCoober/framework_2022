import { B3BehaviorTree } from "./libs/behavior3ts/core/B3BehaviorTree";
import { JsonUtil } from "./util/JsonUtil";
import { v4 } from "./util/uuid";

const { ccclass, property } = cc._decorator;

var ccidMap: {} = {};

@ccclass
export default abstract class BaseComponent extends cc.Component {
    protected ccid: string;

    public _init() {
        this._initUI();
        this.ccid = v4();
        ccidMap[this.ccid] = this;
    }
    public _loadUI(node: cc.Node, comp, filterCb = null) {
        let root = node;
        let rootList = [root];
        comp[root.name] = root;
        while (rootList.length != 0) {
            let root = rootList.shift();
            let children = root.children;
            for (let i = 0; i < children.length; i++) {
                let oneChild = children[i];
                let name = oneChild.name;
                if (!comp[name]) {
                    if ((filterCb && filterCb(oneChild)) || !filterCb) {
                        comp[name] = oneChild;
                    }
                }
                else {
                    // cc.error(` repeated!!`);
                }
                rootList.push(oneChild);
            }
        }
    }
    public _initUI(): void { };

    protected onLoad(): void {
        this.Awake();
    }

    protected onDestroy(): void {
        if (this.ccid) {
            delete ccidMap[this.ccid];
        }
        this.OnDestory();
    }

    protected start(): void {
        this.Start();
    }

    protected update(dt: number): void {
        this.Update(dt);
    }


    public abstract Awake(): void;
    public abstract OnDestory(): void;
    public abstract Start(): void;
    protected Update(dt: number): void {};
    public serialize(): any { };
    public deserialize(obj: any): void { };
}

window["ccidMap"] = ccidMap;