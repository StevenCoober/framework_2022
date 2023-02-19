

import EventEmitter = require("./EventEmitter");

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    emitter: EventEmitter;
    onLoad() {
    }
 
    start() {
        this.label.string = this.text;
        this.emitter = new EventEmitter();
        this.emitter.emit("hello", 1, 2);
    }
    test() {

    }
}
