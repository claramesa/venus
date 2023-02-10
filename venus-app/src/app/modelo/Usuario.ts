import { InterfaceUser } from "./interfaces";

export class Usuario implements InterfaceUser{
    constructor(
        public id: any|undefined,
        public username: string,
        public password: string
    ){}

}