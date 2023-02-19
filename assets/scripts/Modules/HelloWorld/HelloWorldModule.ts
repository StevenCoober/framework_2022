import { AbstractHelloWorldModule } from "../../UI/AbstractHelloWorldView";

const {ccclass, property} = cc._decorator;

export class HelloWorldModule extends AbstractHelloWorldModule{
    static cachedJsonFiles: string[] = ["TestSystem"];
    onRegister(...args: any[]): void {
    }
    onOpen(...args: any[]): void {
    }
    onClose(...args: any[]): void {
    }
}
