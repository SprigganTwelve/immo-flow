import { Timestamp } from "next/dist/server/lib/cache-handlers/types";



interface TenantAttributes{
    id: number,
    firstName: string,
    lastName: string,
    email: String;
    createDate: Timestamp
    updateDate: Timestamp
}



export class Tenant {
    id: number;
    firstName: String;
    lastName: String;
    email: String;
    createDate: Timestamp
    updateDate: Timestamp

    constructor({
        id,
        firstName,
        lastName,
        email, createDate, updateDate
    }: TenantAttributes){
        this.id = id
        this. email = email
        this.firstName = firstName
        this.lastName  = lastName
        this.createDate = createDate
        this.updateDate = updateDate
    }
}