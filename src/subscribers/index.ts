import EventEmitter from "events";

class MyOwnEmitter extends EventEmitter {}

export const myOnwEmitter = new MyOwnEmitter();

myOnwEmitter.on("proof", (value: string) => console.log(value));
