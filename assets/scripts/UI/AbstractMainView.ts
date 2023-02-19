// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { $BaseModule, $BaseView } from "../../framework/ModuleUtil";
const {ccclass, property} = cc._decorator;

@ccclass
export abstract class AbstractMainView extends $BaseView {

    ////////////////////////////////////////
    @property({ type: cc.Node, tooltip: "" })
    MainCamera: cc.Node = null;

    @property({ type: cc.Node, tooltip: "" })
    NETWORK: cc.Node = null;

    @property({ type: cc.Node, tooltip: "" })
    UILayerProperty: cc.Node = null;

    @property({ type: cc.Node, tooltip: "" })
    DIALOG: cc.Node = null;

    @property({ type: cc.Node, tooltip: "" })
    Canvas: cc.Node = null;

    @property({ type: cc.Node, tooltip: "" })
    BACKGROUND: cc.Node = null;

    @property({ type: cc.Node, tooltip: "" })
    BLOCKER: cc.Node = null;

    @property({ type: cc.Node, tooltip: "" })
    CONTENT: cc.Node = null;

    ////////////////////////////////////////
    public _initUI():void {
    }

}
export abstract class AbstractMainModule extends $BaseModule {}
