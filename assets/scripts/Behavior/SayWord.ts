import { EnumStatus } from "../../framework/libs/behavior3ts/Constants"
import { B3Condition } from "../../framework/libs/behavior3ts/core/B3Condition";
import { B3Action } from "../../framework/libs/behavior3ts/core/B3Action"
import { B3Tick } from "../../framework/libs/behavior3ts/core/B3Tick"
import { Blackboard } from "../Entity/UIProperty";
export default class SayWord extends B3Action {

    counter: number = 0;
    tick(tick: B3Tick<any>): EnumStatus {
        let _blackboard = tick.blackboard.get("_blackboard") as Blackboard;
        let wordNode = _blackboard.wordNode; // <cc.Node>
        let counter = _blackboard.counter; // <number>

        
        if (_blackboard.counter++ % 2 == 0) {
            wordNode.getComponent(cc.Label).string = _blackboard.hello;
        }
        else {
            wordNode.getComponent(cc.Label).string = _blackboard.world;
        }
 
        
        cc.tween(wordNode).set({ opacity:255}).to(1, { opacity: 0 }).start();

        return EnumStatus.SUCCESS;
    }
}
