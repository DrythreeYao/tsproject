import { app } from '../../core/ts/app';

export class Person {
    name: string
    constructor(name: string) {
        this.name = name
    }

    sayHello() {
        console.log('hello ' + this.name)
    }
}
