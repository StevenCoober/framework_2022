import CustomAction from "../../../framework/libs/behavior3ts/custom/CustomActions/CustomAction";
import Log from "../../../framework/libs/behavior3ts/custom/CustomActions/Log";
import DisCondition from "../../../framework/libs/behavior3ts/custom/CustomCondtion/DisCondition";
import TargetCondition from "../../../framework/libs/behavior3ts/custom/CustomCondtion/TargetCondition";
import { registerCustom } from "../../../framework/libs/behavior3ts/register/B3ClsRegister";
import MoveLeft from "../MoveLeft";
import SayWord from "../SayWord";
import MoveRight from "../MoveRight";

export function registerAllB3Custom() {
    registerCustom("MoveLeft", MoveLeft);
    registerCustom("SayWord", SayWord);
    registerCustom("MoveRight", MoveRight);
}
