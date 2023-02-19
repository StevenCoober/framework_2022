import { B3Error } from "../actions/B3Error";
import { B3Failer } from "../actions/B3Failer";
import { B3Runner } from "../actions/B3Runner";
import { B3Succeeder } from "../actions/B3Succeeder";
import { B3Wait } from "../actions/B3Wait";
import { B3MemPriority } from "../composites/B3MemPriority";
import { B3MemSequence } from "../composites/B3MemSequence";
import { B3Priority } from "../composites/B3Priority";
import { B3Sequence } from "../composites/B3Sequence";
import { B3Action } from "../core/B3Action";
import { B3Condition } from "../core/B3Condition";
import { IB3NodeProp } from "../core/B3INodeProperties";
import { B3Inverter } from "../decorators/B3Inverter";
import { B3Limiter } from "../decorators/B3Limiter";
import { B3MaxTime } from "../decorators/B3MaxTime";
import { B3Repeater } from "../decorators/B3Repeater";
import { B3RepeatUntilFailure } from "../decorators/B3RepeatUntilFailure";
import { B3RepeatUntilSuccess } from "../decorators/B3RepeatUntilSuccess";


export let B3CompositesCls = {
    ["B3MemPriority"]: B3MemPriority,
    ["B3MemSequence"]: B3MemSequence,
    ["B3Sequence"]: B3Sequence,
    ["B3Priority"]: B3Priority,
}

export let B3ActionsCls = {
    ["B3Error"]: B3Error,
    ["B3Failer"]: B3Failer,
    ["B3Runner"]: B3Runner,
    ["B3Succeeder"]: B3Succeeder,
    ["B3Wait"]: B3Wait,
}
export let B3DecoratorsCls = {
    ["B3Inverter"]: B3Inverter,
    ["B3Limiter"]: B3Limiter,
    ["B3MaxTime"]: B3MaxTime,
    ["B3Repeater"]: B3Repeater,
    ["B3RepeatUntilFailure"]: B3RepeatUntilFailure,
    ["B3RepeatUntilSuccess"]: B3RepeatUntilSuccess,
}


export let B3CustomClsRegister = {}

type Constructor<T> = { new(d: IB3NodeProp): T };
export function registerCustom(name: string, cls:  Constructor<B3Action> | Constructor<B3Condition>) {
    B3CustomClsRegister[name] = cls;
}