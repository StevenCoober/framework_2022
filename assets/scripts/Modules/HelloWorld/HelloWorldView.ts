
import BehaviorTreeTicker from "../../Entity/BehaviorTreeTicker";
import { UILayerProperty } from "../../Entity/UILayerProperty";
import { AbstractHelloWorldView } from "../../UI/AbstractHelloWorldView";
const { ccclass, property } = cc._decorator;

@ccclass
export class HelloWorldView extends AbstractHelloWorldView {
    public Awake(): void {
        let _blackboard = UILayerProperty.Instance._blackboard;
        _blackboard.uiNode = this.cocos;
        _blackboard.wordNode = this.label;
        this.addComponent(BehaviorTreeTicker);
    }

    public OnDestory(): void {
    }
    public Start(): void {
    }
}
