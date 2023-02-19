const { ccclass, property } = cc._decorator;
declare global {
    namespace cc {
        var CCProperty: CCProperty;
    }
}

///////////////////////////////////////////
enum EventType {
    GameLoginSuccess_Msg = "GameLoginSuccess_Msg", //游戏登录成功
    GameStartMsg_Msg = "GameStartMsg_Msg", //游戏开始按下开始按钮
}
///////////////////////////////////////////
@ccclass
export default class CCProperty extends cc.Component {
    static Instance: CCProperty = null;
    public readonly EventType = EventType;
    @property({
        tooltip: CC_DEV && '全局么☻',
    })
    global_mode = true;

    @property({
        tooltip: CC_DEV && '调试么☻',
    })
    debug_mode = false;

    @property({
        type: cc.Component.EventHandler,
        tooltip: CC_DEV && '[游戏登录成功]',
    })
    onGameLoginSuccess_Msg: cc.Component.EventHandler[] = [];

    @property({
        type: cc.Component.EventHandler,
        tooltip: CC_DEV && '[游戏开始按下开始按钮]',
    })
    onGameStartMsg_Msg: cc.Component.EventHandler[] = [];


    private objs = {};

    initComp() {
        if (cc.CCProperty == null && this.global_mode) {
            cc.CCProperty = this;
        }
        this.objs = {};
    }

    onLoad () {
        this.initComp();
    }

    onDestroy() {
        if (this.global_mode && cc.CCProperty) {
            cc.CCProperty = null;
        }
    }

    // 发送消息
    emit(event, data?:null) {
        if (this["on" + event] != null) {
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                if (this.debug_mode) console.log("[DEBUG] [CCProperty] emit event:[" + event + "], data:" + data);
            } else {
                if (this.debug_mode) console.log("[DEBUG] [CCProperty] emit event:[" + event + "], data:", data);
            }
            cc.Component.EventHandler.emitEvents(this["on" + event], data);
        }
        else {
            console.log("[ERROR] [CCProperty] has no event:[" + event + "], data:", data);
        }
    }

    private __GetActions() {
        let actionNames = [
            "onGameLoginSuccess_Msg", //游戏登录成功
            "onGameStartMsg_Msg", //游戏开始按下开始按钮
        ];

        return actionNames;
    }

    private __AddListener(target, evtname) {
        if (this.objs[target.uuid] == null) {
            this.objs[target.uuid] = {};
        }

        if (this.objs[target.uuid][evtname] == null) {
            this.objs[target.uuid][evtname] = [];
        }
        this.objs[target.uuid][evtname].push(evtname);

        if (target[evtname]) {
            let eventHandler = new cc.Component.EventHandler();
            eventHandler.target = target.node;
            eventHandler.component = (target.name).replace("<", "$").replace(">", "$").split("$")[1];
            eventHandler.handler = evtname;
            this[evtname].push(eventHandler);
        }
    }

    private __RemoveListener(target) {
        if (!target) return;
        if (!this._hasTarget(target)) return;
        let comp_name = (target.name).replace("<", "$").replace(">", "$").split("$")[1];
        let actionNames = this.__GetActions();
        for (let i = 0; i < actionNames.length; i++) {
            let actionName = actionNames[i];
            for (let j = 0; j < this[actionName].length;) {
                let oneAction = this[actionName][j];
                if (oneAction.target.component == comp_name) {
                    this[actionName].splice(j, 1);
                } else {
                    j++;
                }
            }
        }
        delete this.objs[target.uuid];
    }

    removeTargetActions(target) {
        this.__RemoveListener(target);
    }

    _hasTarget(target) {
        return this.objs[target.uuid];
    }

    bindTargetActions(target) {
        if (this._hasTarget(target)) return;
        let actionNames = this.__GetActions();
        for (let i = 0; i < actionNames.length; i++) {
            let actionName = actionNames[i];
            this.__AddListener(target, actionName);
        }
    }

    // //                                                   /n
    // //                                                  /i
    // //                                                 /w
    // //                                                /e
    // //                                               /r
    // //                                              /o
    // //                                             /c
    // //                                            /s
    // //          GameWin                         /
    // // 子系统-------------------------ScoreEntity(接受, 过滤, 再次[顺序]转发)
    // //                                        \
    // //                                         \
    // //                                          \scorewin(score)
    // //                                           \
    // //                                            \
    // //                                             \
    // //                                              \
    // //                                              ScoreLayer

    //<<<<<<<<<<<<<<<<<<<CCProperty(system)<<<<<<<<<<<<<<<<<<<
    // initComp() {
    //     cc.CCProperty.bindTargetActions(this);
    // }
    // onDestroy() {
    //     if(cc.CCProperty) cc.CCProperty.removeTargetActions(this);
    // }

    //  let Package:any = {};
    //    Package.a = a; // 我
    //    Package.b = b; // 我
    // cc.CCProperty.emit(cc.CCProperty.EventType.GameLoginSuccess_Msg, Package);// 游戏登录成功

    //// 游戏登录成功
    // onGameLoginSuccess_Msg(data) {
    //    let a = data.a; // 我
    //    let b = data.b; // 我
    // }

    //  let Package:any = {};
    //    Package.c = c; // 
    //    Package.d = d; // 
    // cc.CCProperty.emit(cc.CCProperty.EventType.GameStartMsg_Msg, Package);// 游戏开始按下开始按钮

    //// 游戏开始按下开始按钮
    // onGameStartMsg_Msg(data) {
    //    let c = data.c; // 
    //    let d = data.d; // 
    // }

    //>>>>>>>>>>>>>>>>>>>CCProperty(system)>>>>>>>>>>>>>>>>>>>
}
