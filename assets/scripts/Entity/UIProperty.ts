import { HelloWorldStateFSM } from "../StateMachine/HelloWorldStateFSM";
export class B {
    public testInt41: number = 0;
    public __clone() {
        let _b = new B();
        _b.__readData(this);
        return _b;
    }
    public __data() {
        return {
            testInt41: this.testInt41, 
        }
    }
    public __readData(data) {
        if (data.hasOwnProperty('testInt41')) {
            this.testInt41 = data.testInt41; 
        }
    }
    public __serialize() {
        let testInt41 = this.testInt41; 
        return {
            testInt41: testInt41, 
        }
    }
    public __clearData() {
        this.testInt41 = 0; 
    }
    public dump(prefix?: any) {
        if (prefix == null) prefix = "";
        console.log(`${prefix}B.ts->dump:`, this.__data());
    }
}
export class Blackboard {
    public uiNode: cc.Node = null;
    public helloWorldStateFSM: HelloWorldStateFSM = new HelloWorldStateFSM();
    public wordNode: cc.Node = null;
    public hello: string = "你好";
    public world: string = "世界";
    public counter: number = 0;
    public b: B = new B();
    public bArray: B[] = [];
    public __clone() {
        let _blackboard = new Blackboard();
        _blackboard.__readData(this);
        return _blackboard;
    }
    public __data() {
        return {
            uiNode: this.uiNode, 
            helloWorldStateFSM: this.helloWorldStateFSM, 
            wordNode: this.wordNode, 
            hello: this.hello, 
            world: this.world, 
            counter: this.counter, 
            b: this.b, 
            bArray: this.bArray, 
        }
    }
    public __readData(data) {
        if (data.hasOwnProperty('uiNode')) {
            this.uiNode = data.uiNode; 
        }
        if (data.hasOwnProperty('helloWorldStateFSM')) {
            this.helloWorldStateFSM = data.helloWorldStateFSM; 
        }
        if (data.hasOwnProperty('wordNode')) {
            this.wordNode = data.wordNode; 
        }
        if (data.hasOwnProperty('hello')) {
            this.hello = data.hello; 
        }
        if (data.hasOwnProperty('world')) {
            this.world = data.world; 
        }
        if (data.hasOwnProperty('counter')) {
            this.counter = data.counter; 
        }
        if (data.hasOwnProperty('b')) {
            if(data.b) {
                let _B = new B();
                _B.__readData(data.b);
                this.b = _B;
            }
            else {
                this.b = null; 
            }
        }
        if (data.hasOwnProperty('bArray')) {
            if (data.bArray) {
                this.bArray = [];
                for(let i = 0; i < data.bArray.length; i++) {
                    if(data.bArray[i]) {
                        let _B = new B();
                        _B.__readData(data.bArray[i]);
                        this.bArray[i] = _B;
                    }
                    else {
                        this.bArray[i] = null;
                    }
                }
            }
            else {
                this.bArray = null; 
            }
        }
    }
    public __serialize() {
        let hello = this.hello; 
        let world = this.world; 
        let b = this.b&&this.b.__serialize();
        let bArray = [];
        for(let i = 0; i < this.bArray.length; i++) {
            let _b = this.bArray[i];
            bArray[i] = _b&&_b.__serialize();
        }
        return {
            hello: hello, 
            world: world, 
            b: b, 
            bArray: bArray, 
        }
    }
    public __clearData() {
        this.uiNode = null; 
        this.helloWorldStateFSM = new HelloWorldStateFSM(); 
        this.wordNode = null; 
        this.hello = "你好"; 
        this.world = "世界"; 
        this.counter = 0; 
        this.b = new B(); 
        this.bArray = []; 
    }
    public dump(prefix?: any) {
        if (prefix == null) prefix = "";
        console.log(`${prefix}Blackboard.ts->dump:`, this.__data());
    }
}
