// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { openModule, registerModule } from "../framework/ModuleUtil";
import { registerAllB3Custom } from "./Behavior/Register/B3CustomClsRegister";
import { UILayerProperty } from "./Entity/UILayerProperty";
import { AbstractMainView } from "./UI/AbstractMainView";
import { ModuleID, RegisterModule } from "./UI/RegisterModule";

const { ccclass, property } = cc._decorator;

@ccclass
export default class main extends AbstractMainView {
    public Awake(): void {
        let BACKGROUND = this.BACKGROUND; //背景层
        let CONTENT = this.CONTENT; //内容层
        let DIALOG = this.DIALOG; //弹出框层
        let NETWORK = this.NETWORK; //网络层
        let BLOCKER = this.BLOCKER; //阻塞层

        let UILayerProperty_comp = UILayerProperty.Instance;
        UILayerProperty_comp.BACKGROUND = BACKGROUND; //背景层
        UILayerProperty_comp.CONTENT = CONTENT; //内容层
        UILayerProperty_comp.DIALOG = DIALOG; //弹出框层
        UILayerProperty_comp.NETWORK = NETWORK; //网络层
        UILayerProperty_comp.BLOCKER = BLOCKER; //阻塞层
        // UILayerProperty_comp._blackboard = _blackboard; //123
        this.addComponent(RegisterModule);
        registerAllB3Custom();
    }
    public OnDestory(): void {
        
    }
    public Start(): void {
        openModule(ModuleID.HelloWorld);
    }

    onLoad() {
        this._loadUI(this.node, this);
        super.onLoad();
    }



    // update (dt) {}
}
