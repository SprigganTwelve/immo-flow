import Location from "../shared/Location";


export type AppartmentProps = {
    id: string;
    name: string;
    location?: Location;
}

export default class Appartment{
    public id: string;
    public name: string;
    public location?: Location;

    constructor({id, name, location}: AppartmentProps){
        this.id = id;
        this.name = name;
        this.location = location;
    }
}