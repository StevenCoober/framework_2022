// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { $BaseModule, $BaseView } from "../../framework/ModuleUtil";
const {ccclass, property} = cc._decorator;

@ccclass
export abstract class AbstractHelloWorldView extends $BaseView {

    ////////////////////////////////////////
    @property({ type: cc.Node, tooltip: "" })
    label: cc.Node = null;

    @property({ type: cc.Node, tooltip: "" })
    MainCamera: cc.Node = null;

    @property({ type: cc.Node, tooltip: "" })
    HelloWorld: cc.Node = null;

    @property({ type: cc.Node, tooltip: "" })
    background: cc.Node = null;

    @property({ type: cc.Node, tooltip: "" })
    cocos: cc.Node = null;

    ////////////////////////////////////////
    public _initUI():void {
    }

}
export abstract class AbstractHelloWorldModule extends $BaseModule {}
