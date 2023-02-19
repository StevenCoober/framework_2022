import { EnumStatus } from "../../framework/libs/behavior3ts/Constants"
import { B3Condition } from "../../framework/libs/behavior3ts/core/B3Condition";
import { B3Action } from "../../framework/libs/behavior3ts/core/B3Action"
import { B3Tick } from "../../framework/libs/behavior3ts/core/B3Tick"
import { Blackboard } from "../Entity/UIProperty";
import { HelloWorldStateFSM } from "../StateMachine/HelloWorldStateFSM";
export default class MoveLeft extends B3Action {

    tick(tick: B3Tick<any>): EnumStatus {
        let _blackboard = tick.blackboard.get("_blackboard") as Blackboard;
        let uiNode = _blackboard.uiNode; // <cc.Node>
        let helloWorldStateFSM = _blackboard.helloWorldStateFSM; // <HelloWorldStateFSM>
        if (helloWorldStateFSM.is(HelloWorldStateFSM.StateType.MoveLeft)) {
            return EnumStatus.RUNNING;
        }
        
        if (helloWorldStateFSM.is(HelloWorldStateFSM.StateType.MoveEnd)) {
            helloWorldStateFSM.To_InitState();
            return EnumStatus.SUCCESS;
        }
        console.log("moveLeft");
        helloWorldStateFSM.To_MoveLeft();
        cc.tween(uiNode).by(1, { position: cc.v3(-100, 0)}).call(() => {
            helloWorldStateFSM.To_MoveEnd();
        }).start();
        return EnumStatus.RUNNING;
    }
}
