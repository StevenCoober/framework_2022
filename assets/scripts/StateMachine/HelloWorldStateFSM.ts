import { State } from "../../framework/libs/state-machine";
import StateMachine from "../../framework/libs/state-machine/app";
import mixin from "../../framework/libs/state-machine/util/mixin";
import { Logger } from "../Utils/Logger";
class AbstractFSM {
    is: (state: State | State[]) => boolean;
    can: (transition: string) => boolean;
    cannot: (transition: string) => boolean;
    observe: (...args: any[]) => void;
    transitions: () => string[];
    allTransitions: () => string[];
    allStates: () => State[];
    get state() {
        return this.fsm && this.fsm.state;
    }
    public readonly fsm: any;
    public constructor(fsm: any) {
        this.fsm = fsm;
        mixin(this, fsm);
        this.is = fsm.is.bind(fsm);
        this.can = fsm.can.bind(fsm);
        this.cannot = fsm.cannot.bind(fsm);
        this.observe = fsm.observe.bind(fsm);
        this.transitions = fsm.transitions.bind(fsm);
        this.allTransitions = fsm.allTransitions.bind(fsm);
        this.allStates = fsm.allStates.bind(fsm);
    }
}
enum HelloWorldStateFSM_StateType {
    init = "init",
    InitState = "InitState",
    MoveLeft = "MoveLeft",
    MoveRight = "MoveRight",
    MoveEnd = "MoveEnd",
}
enum HelloWorldStateFSM_TransitionType {
    To_MoveEnd = "MoveEnd",
    To_MoveRight = "MoveRight",
    To_MoveLeft = "MoveLeft",
    To_InitState = "To_InitState",
}
export class HelloWorldStateFSM extends AbstractFSM {
    To_MoveEnd(...args):void {};
    To_MoveRight(...args):void {};
    To_MoveLeft(...args):void {};
    To_InitState(...args):void {};
    public static readonly StateType = HelloWorldStateFSM_StateType;
    public static readonly TransitionType = HelloWorldStateFSM_TransitionType;
    public constructor() {
        const fsm = new StateMachine({
            init: 'init',
            transitions: [
                { name: "To_MoveEnd", from: "*", to: "MoveEnd" },
                { name: "To_MoveRight", from: [".*End","InitState"], to: "MoveRight" },
                { name: "To_MoveLeft", from: [".*End","InitState"], to: "MoveLeft" },
                { name: "To_InitState", from: ["init","*"], to: "InitState" },
            ],
            methods: {
                onInvalidTransition: (transition: string, from: string, to: string, ...args) => { Logger.error2(7, "transition is invalid in current state", transition, from, to, ...args); },
            },
        });
        fsm.To_InitState();
        super(fsm);
    }
}
enum Animation_Falldown_Find_Obstacle_Sub_StateType {
    Initial1 = "Initial1",
    Animation_Falldown_Scalling = "Animation_Falldown_Scalling",
    Animation_Falldown_Scalling_End = "Animation_Falldown_Scalling_End",
}
enum Animation_Falldown_Find_Obstacle_Sub_TransitionType {
    To_Animation_Falldown_Scalling_End = "To_Animation_Falldown_Scalling_End",
    To_Animation_Falldown_Scalling = "To_Animation_Falldown_Scalling",
}
export class Animation_Falldown_Find_Obstacle_Sub extends AbstractFSM {
    To_Animation_Falldown_Scalling_End(...args):void {};
    To_Animation_Falldown_Scalling(...args):void {};
    public static readonly StateType = Animation_Falldown_Find_Obstacle_Sub_StateType;
    public static readonly TransitionType = Animation_Falldown_Find_Obstacle_Sub_TransitionType;
    public constructor() {
        const fsm = new StateMachine({
            init: 'Initial1',
            transitions: [
                { name: "To_Animation_Falldown_Scalling_End", from: ["Animation_Falldown_Scalling","*"], to: "Animation_Falldown_Scalling_End" },
                { name: "To_Animation_Falldown_Scalling", from: ["Initial1","*"], to: "Animation_Falldown_Scalling" },
                { name: "To_Animation_Falldown_Scalling", from: ["Animation_Falldown_Scalling_End","*"], to: "Animation_Falldown_Scalling" },
            ],
            methods: {
                onInvalidTransition: (transition: string, from: string, to: string, ...args) => { Logger.error2(7, "transition is invalid in current state", transition, from, to, ...args); },
            },
        });
        super(fsm);
    }
}
enum Task_All_Sub_StateType {
    Initial1 = "Initial1",
    ExchangeTask = "ExchangeTask",
    FalldownTask = "FalldownTask",
    SynthesisTask = "SynthesisTask",
    EliminateTask = "EliminateTask",
    UsePropTask = "UsePropTask",
    Init_State = "Init_State",
}
enum Task_All_Sub_TransitionType {
    To_ExchangeTask = "To_ExchangeTask",
    To_FalldownTask = "To_FalldownTask",
    To_SynthesisTask = "To_SynthesisTask",
    To_EliminateTask = "To_EliminateTask",
    To_UsePropTask = "To_UsePropTask",
    To_Init_State = "To_Init_State",
}
export class Task_All_Sub extends AbstractFSM {
    To_ExchangeTask(...args):void {};
    To_FalldownTask(...args):void {};
    To_SynthesisTask(...args):void {};
    To_EliminateTask(...args):void {};
    To_UsePropTask(...args):void {};
    To_Init_State(...args):void {};
    public static readonly StateType = Task_All_Sub_StateType;
    public static readonly TransitionType = Task_All_Sub_TransitionType;
    public constructor() {
        const fsm = new StateMachine({
            init: 'Initial1',
            transitions: [
                { name: "To_ExchangeTask", from: ["Init_State","*"], to: "ExchangeTask" },
                { name: "To_FalldownTask", from: ["Init_State","*"], to: "FalldownTask" },
                { name: "To_SynthesisTask", from: ["Init_State","*"], to: "SynthesisTask" },
                { name: "To_EliminateTask", from: ["Init_State","*"], to: "EliminateTask" },
                { name: "To_UsePropTask", from: ["Init_State","*"], to: "UsePropTask" },
                { name: "To_Init_State", from: "Initial1", to: "Init_State" },
            ],
            methods: {
                onInvalidTransition: (transition: string, from: string, to: string, ...args) => { Logger.error2(7, "transition is invalid in current state", transition, from, to, ...args); },
            },
        });
        fsm.To_Init_State();
        super(fsm);
    }
}
