import { JsonUtil } from "../../framework/util/JsonUtil";
import { B3BehaviorTree } from "../../framework/libs/behavior3ts/core/B3BehaviorTree";
import { B3Blackboard } from "../../framework/libs/behavior3ts/core/B3Blackboard";
import BaseComponent from "../../framework/BaseComponent";
import { UILayerProperty } from "./UILayerProperty";
const { ccclass, property } = cc._decorator;
@ccclass
export default class BehaviorTreeTicker extends BaseComponent {
    static Instance: BehaviorTreeTicker = null;
    TestSystemTree: B3BehaviorTree;
    blackboard: B3Blackboard = new B3Blackboard();
    public Awake(): void {
        BehaviorTreeTicker.Instance = this;
        this.TestSystemTree = JsonUtil.getBehaviorTree("TestSystem");
        this.blackboard.set("_blackboard", UILayerProperty.Instance._blackboard);
    }
    public OnDestory(): void {
        BehaviorTreeTicker.Instance = null;
    }
    public Start(): void {
    }
    protected onDestroy(): void {
    }
    update(dt) {
        if (this.TestSystemTree) {
            this.TestSystemTree.tick({}, this.blackboard);
        }
    }
}
