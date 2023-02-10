import { InterfaceUser } from "./interfaces";

export class Usuario implements InterfaceUser{
    constructor(
        public id: number,
        public username: string,
        public password: string
    ){}

}