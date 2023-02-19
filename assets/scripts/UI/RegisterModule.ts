import { registerModule } from "../../framework/ModuleUtil";
import { HelloWorldModule } from "../Modules/HelloWorld/HelloWorldModule";
import { HelloWorldView } from "../Modules/HelloWorld/HelloWorldView";
const { ccclass } = cc._decorator;

export enum ModuleID {
    HelloWorld = "HelloWorld",
}
@ccclass
export class RegisterModule extends cc.Component {

    private static _instance: RegisterModule;

    get instance(): RegisterModule {
        return RegisterModule._instance;
    }

    onLoad() {
        RegisterModule._instance = this;
        registerModule(ModuleID.HelloWorld, HelloWorldModule, HelloWorldView);
    }

    protected onDestroy(): void {
        RegisterModule._instance = null;
    }
}
