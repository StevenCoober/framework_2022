import { find } from "lodash";
import { UILayerProperty } from "../scripts/Entity/UILayerProperty";
import { ModuleID } from "../scripts/UI/RegisterModule";
import BaseComponent from "./BaseComponent";
import { resLoader } from "./ResLoader";
import { JsonUtil } from "./util/JsonUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export abstract class $BaseView extends BaseComponent {
    _module_: $BaseModule;
}

export enum UIType {
    None,
    // 多界面
    UI_MULTY, // 多界面
    // 背景层
    UI_BACKGROUND, // 背景层
    // 内容层
    UI_CONTENT, // 内容层
    // 弹出框层
    UI_DIALOG, // 弹出框层
    // 网络层
    UI_NETWORK, // 网络层
    // 
    UI_BLOCKER, // 
};

export abstract class $BaseModule {
    static uIType: UIType = UIType.UI_CONTENT;
    static cachedJsonFiles: string[] = [];
    static cachedEffects: string[] = [];
    _moduleID_: ModuleID;
    _view_: $BaseView;
    abstract onRegister(...args): void;
    abstract onOpen(...args): void;
    public onReOpen(...args): void { };
    abstract onClose(...args): void;
}

/*
 * 模块实例
*/
export class GModuleInstance {
    // <$BaseModule><BaseModule>模块实例
    public moduleClassInstance: $BaseModule = null;
    // <$BaseView>视图类实例
    public viewClassInstance: $BaseView = null;
}

export class GModuleInfo {
    // <ModuleID>模块id
    public moduleID: ModuleID = null;
    // <UIType>ui类型
    public uIType: UIType = null;
    // <moduleConstructor<$BaseModule>>模块
    public moduleClass: moduleConstructor<$BaseModule> = null;
    // <viewConstructor<$BaseView>>视图类
    public viewClass: viewConstructor<$BaseView> = null;
    // <cc.Prefab>预制体
    public prefab: cc.Prefab = null;
    // <GModuleInstance[]>模块所有实例
    public gModuleInstances: GModuleInstance[] = [];
    // <string[]>json文件
    public cachedJsonFiles: string[] = [];
    // <string[]>
    public cachedEffects: string[] = [];
}

export class GModuleData {
    // <GModuleInfo[]>所有模块
    public moduleInfos: GModuleInfo[] = [];
    // <GModuleInfo[]>显示的模块
    public showModules: GModuleInfo[] = [];
}

let _gModuleData: GModuleData;
type moduleConstructor<T> = { new(): T; uIType?: UIType; cachedJsonFiles?: string[]; cachedEffects?: string[] };
type viewConstructor<T> = { new(): T };
type UIArgsCallFunc = (prefabNode: cc.Node, moduleClassInstance?: any, viewClassInstance?: any) => void;
type UIArgsCallFunc2 = (prefabNode: cc.Node, index: number, moduleClassInstance?: any, viewClassInstance?: any) => void;

type UIArgsCallFunc3Args = {
    prefabNode: cc.Node,
    moduleClassInstance: $BaseModule,
    viewClassInstance: $BaseView,
};
type UIArgsCallFunc3 = (uIArgsCallFunc3Args: UIArgsCallFunc3Args[]) => void;

interface UIArgs {
    // <cc.Node>父亲节点
    parent?: cc.Node;
    // <Function>回调
    cb?: UIArgsCallFunc;
    icb?: UIArgsCallFunc2;
    ficb?: UIArgsCallFunc3;
    // <cc.Vec2>位置
    pos?: cc.Vec3;
}





///////////////////////////////////////////////////////////////////////////////////

// TODO 通用的
export function openModule(moduleID: ModuleID, _uIArgs: UIArgs = null, ...args): boolean {
    let parent = _uIArgs?.parent;
    let cb = _uIArgs?.cb; // <Function>回调
    let moduleInfos = _gModuleData.moduleInfos; // <GModuleInfo[]>所有模块
    let showModules = _gModuleData.showModules; // <GModuleInfo[]>显示的模块
    if (UILayerProperty.Instance.BLOCKER) { UILayerProperty.Instance.BLOCKER.active = true; }
    let _gModuleInfo = moduleInfos.find((item) => { return item.moduleID == moduleID });

    if (_gModuleInfo) {
        let moduleID = _gModuleInfo.moduleID; // <ModuleID>模块id
        let uIType = _gModuleInfo.uIType; // <UIType>ui类型
        let moduleClass = _gModuleInfo.moduleClass; // <newConstructor<BaseModule>>模块
        let viewClass = _gModuleInfo.viewClass; // <newConstructor<BaseView>>视图类
        let prefab = _gModuleInfo.prefab; // <cc.Prefab>预制体
        let gModuleInstances = _gModuleInfo.gModuleInstances; // <GModuleInstance[]>模块所有实例

        let cachedJsonFiles = moduleClass.cachedJsonFiles;
        let cachedEffects = moduleClass.cachedEffects;

        let _gModuleInstanceFirst = gModuleInstances[0];
        let moduleClassInstance = _gModuleInstanceFirst?.moduleClassInstance; // <$BaseModule><BaseModule>模块实例
        let viewClassInstance = _gModuleInstanceFirst?.viewClassInstance; // <$BaseView>视图类实例

        if (viewClassInstance && uIType != UIType.UI_MULTY) {
            moduleClassInstance.onReOpen(...args);
        }
        else if (typeof (moduleID) == "string") {
            let onComplete = (error: Error, prefab: cc.Prefab) => {
                if (error != null) {
                    console.error(error);
                    return
                }
                let prefabNode = cc.instantiate(prefab);

                // Global.getInstance().mainGame.mainLayerManager.node.addChild(prefabNode);
                if (parent == null) {
                    let xxx = {
                        // 多界面-
                        // [UIType.UI_MULTY]: UILayerProperty.Instance.CONTENT,
                        // 背景层-
                        [UIType.UI_BACKGROUND]: UILayerProperty.Instance.BACKGROUND,
                        // 内容层-
                        [UIType.UI_CONTENT]: UILayerProperty.Instance.CONTENT,
                        // 弹出框层-
                        [UIType.UI_DIALOG]: UILayerProperty.Instance.DIALOG,
                        // 网络层-
                        [UIType.UI_NETWORK]: UILayerProperty.Instance.NETWORK,
                        // 触摸层-
                        // [UIType.UI_BLOCKER]: UILayerProperty.Instance.BLOCKER,
                    };
                    parent = xxx[uIType];
                }

                if (uIType != UIType.UI_MULTY) {
                    closeAllModule(moduleID);
                }

                let viewClassInstance = prefabNode.addComponent(viewClass);
                viewClassInstance._loadUI(prefabNode, viewClassInstance);
                viewClassInstance._init();

                _gModuleInfo.prefab = prefab; // <cc.Prefab>预制体
                let _gModuleInstance: GModuleInstance = _gModuleInstanceFirst;
                if (uIType == UIType.UI_MULTY) {
                    _gModuleInstance = new GModuleInstance(); // 模块实例
                    _gModuleInstance.viewClassInstance = viewClassInstance; // <$BaseView>视图类实例

                    let moduleClassInstance = new moduleClass(); // <BaseModule>模块实例
                    moduleClassInstance._view_ = viewClassInstance;
                    viewClassInstance._module_ = moduleClassInstance;

                    _gModuleInstance.moduleClassInstance = moduleClassInstance; // <$BaseModule><BaseModule>模块实例
                    gModuleInstances.push(_gModuleInstance);
                }
                else {
                    _gModuleInstanceFirst.viewClassInstance = viewClassInstance; // <$BaseView>视图类实例
                    if (moduleClassInstance) {
                        moduleClassInstance.onOpen(...args);
                    }
                    else {
                        throw new Error("未发现--" + moduleID + "-instance");
                    }
                }

                if (parent) {
                    parent.addChild(prefabNode);
                }

                if (cb) {
                    cb(prefabNode, _gModuleInstance.moduleClassInstance, _gModuleInstance.viewClassInstance);
                }
            }

            if (prefab != null) {
                onComplete(null, prefab);
            }
            else {
                let cachedJsonFilesCopy = cachedJsonFiles.concat();
                if (cachedJsonFilesCopy.length > 0) {
                    cachedJsonFilesCopy.forEach((jsonPath, idx) => {
                        JsonUtil.load(jsonPath, (jsonStr) => {
                            if (idx == cachedJsonFilesCopy.length - 1) {
                                resLoader.load("prefabs", moduleID, cc.Prefab, onComplete);
                            }
                        });
                    });
                }
                else {
                    resLoader.load("prefabs", moduleID, cc.Prefab, onComplete);
                }

            }
        }


        let showModuleInfo = showModules.find((item) => { return item.moduleID == moduleID });
        if (!showModuleInfo) {
            showModules.push(_gModuleInfo);
        }
    }
    else {
        throw new Error("未发现--" + moduleID);
    }
    if (UILayerProperty.Instance.BLOCKER) { UILayerProperty.Instance.BLOCKER.active = false; }

    return true;
}
export function closeAllModule(exceptModuleID?: ModuleID) {
    let moduleInfos = _gModuleData.moduleInfos; // <GModuleInfo[]>所有模块
    let showModules = _gModuleData.showModules; // <GModuleInfo[]>显示的模块
    showModules.forEach((_gModuleInfo) => {
        let moduleID = _gModuleInfo.moduleID; // <ModuleID>模块id
        if (exceptModuleID != moduleID) {
            if (_gModuleInfo.uIType != UIType.UI_MULTY) {
                closeModule(moduleID);
            }
        }
    });
}

export function closeModule(moduleID_Or_node_Or_module_Or_View: ModuleID | $BaseModule | cc.Node, ...args): boolean {
    let moduleInfos = _gModuleData.moduleInfos; // <GModuleInfo[]>所有模块
    let showModules = _gModuleData.showModules; // <GModuleInfo[]>显示的模块
    let notice = (_gModuleInstance: GModuleInstance, _gModuleInfo: GModuleInfo) => {
        let moduleClass = _gModuleInfo.moduleClass; // <moduleConstructor<$BaseModule>>模块
        let cachedEffects = moduleClass.cachedEffects;
        let moduleClassInstance = _gModuleInstance?.moduleClassInstance; // <$BaseModule><BaseModule>模块实例
        let viewClassInstance = _gModuleInstance?.viewClassInstance; // <$BaseView>视图类实例
        if (viewClassInstance) {
            viewClassInstance.node.destroy();
            moduleClassInstance._view_ = null;
            _gModuleInstance.viewClassInstance = null;

        }
        if (moduleClassInstance) {
            moduleClassInstance.onClose(...args);
        }
        else {
            throw new Error("未发现--" + `${moduleID_Or_node_Or_module_Or_View}` + "-instance");
        }
    }
    if (typeof (moduleID_Or_node_Or_module_Or_View) == "string") {
        let showModuleInfoIdx = showModules.findIndex((item) => { return item.moduleID == `${moduleID_Or_node_Or_module_Or_View}`; });
        if (showModuleInfoIdx >= 0) {
            let _gModuleInfo = showModules[showModuleInfoIdx];
            if (_gModuleInfo.uIType == UIType.UI_MULTY) {
                cc.error("非单模块数据");
            }
            let moduleID = _gModuleInfo.moduleID; // <ModuleID>模块id
            let uIType = _gModuleInfo.uIType; // <UIType>ui类型
            let moduleClass = _gModuleInfo.moduleClass; // <newConstructor<BaseModule>>模块
            let viewClass = _gModuleInfo.viewClass; // <newConstructor<BaseView>>视图类
            let prefab = _gModuleInfo.prefab; // <cc.Prefab>预制体

            let jsonFiles = moduleClass.cachedJsonFiles;
            let gModuleInstances = _gModuleInfo.gModuleInstances; // <GModuleInstance[]>模块所有实例
            let _gModuleInstanceFirst = gModuleInstances[0];
            notice(_gModuleInstanceFirst, _gModuleInfo);
            showModules.splice(showModuleInfoIdx, 1);

            jsonFiles.forEach((jsonPath) => {
                JsonUtil.release(jsonPath);
            });
            _gModuleInfo.cachedJsonFiles = [];
            _gModuleInfo.prefab = null;
            resLoader.release("prefabs", `${moduleID_Or_node_Or_module_Or_View}`);
        }
        else {
            throw new Error("未发现<closeModule>--" + `${moduleID_Or_node_Or_module_Or_View}`);
        }
    }
    else {
        let obj = moduleID_Or_node_Or_module_Or_View as $BaseModule;

        for (let sidx in showModules) {
            let _gModuleInfo = showModules[sidx];
            let moduleID = _gModuleInfo.moduleID; // <ModuleID>模块id
            let uIType = _gModuleInfo.uIType; // <UIType>ui类型
            let moduleClass = _gModuleInfo.moduleClass; // <newConstructor<$BaseModule>>模块
            let viewClass = _gModuleInfo.viewClass; // <newConstructor<$BaseView>>视图类
            let prefab = _gModuleInfo.prefab; // <cc.Prefab>预制体
            let gModuleInstances = _gModuleInfo.gModuleInstances; // <GModuleInstance[]>模块所有实例
            if (uIType != UIType.UI_MULTY) {
                cc.error("非多模块数据");
            }

            let gidx = -1;
            if (moduleID_Or_node_Or_module_Or_View instanceof $BaseModule) {
                gidx = gModuleInstances.findIndex((item) => { return item.moduleClassInstance == moduleID_Or_node_Or_module_Or_View });
            }
            else if (moduleID_Or_node_Or_module_Or_View instanceof $BaseView) {
                gidx = gModuleInstances.findIndex((item) => { return item.viewClassInstance == moduleID_Or_node_Or_module_Or_View });
            }
            else if (moduleID_Or_node_Or_module_Or_View instanceof cc.Node) {
                gidx = gModuleInstances.findIndex((item) => { return item.viewClassInstance.node == moduleID_Or_node_Or_module_Or_View });
            }

            if (gidx != -1) {
                notice(gModuleInstances[gidx], _gModuleInfo);
                gModuleInstances.splice(+gidx, 1);
            }
            if (gModuleInstances.length == 0) {
                showModules.splice(parseInt(sidx), 1);
                _gModuleInfo.prefab = null;
                resLoader.release("prefabs", `${moduleID}`);
            }
        }


    }

    return true;
}

export function registerModule(moduleID: ModuleID, moduleClass: moduleConstructor<$BaseModule>, viewClass: viewConstructor<$BaseView>) {
    let moduleInfos = _gModuleData.moduleInfos; // <GModuleInfo[]>所有模块
    let showModules = _gModuleData.showModules; // <GModuleInfo[]>显示的模块

    let findModule = moduleInfos.find((item) => { return item.moduleID == moduleID; });
    if (!findModule) {
        let _gModuleInfo: GModuleInfo = new GModuleInfo();
        let gModuleInstances = _gModuleInfo.gModuleInstances; // <GModuleInstance[]>模块所有实例
        moduleInfos.push(_gModuleInfo);

        _gModuleInfo.moduleID = moduleID; // <number>模块id
        _gModuleInfo.uIType = moduleClass.uIType; // <UIType>ui类型
        _gModuleInfo.moduleClass = moduleClass; // <newConstructor<BaseModule>>模块
        _gModuleInfo.viewClass = viewClass; // <newConstructor<BaseView>>视图类

        let _gModuleInstance: GModuleInstance = new GModuleInstance(); // 模块实例
        if (moduleClass.uIType != UIType.UI_MULTY) {
            let moduleClassInstance = new moduleClass(); // <BaseModule>模块实例
            _gModuleInstance.moduleClassInstance = moduleClassInstance; // <$BaseModule><BaseModule>模块实例
            gModuleInstances.push(_gModuleInstance);

            moduleClassInstance.onRegister();
        }

    }
    else {
        throw new Error("注册过了--" + moduleID);
    }
}

_gModuleData = new GModuleData();
window["gModuleData"] = _gModuleData;