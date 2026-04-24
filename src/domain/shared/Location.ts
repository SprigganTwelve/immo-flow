

export type LocationProps = {
    lat: number;
    lng: number;
}

export default class Location{
    public lat: number;
    public lng: number;

    constructor({lat, lng}: LocationProps){
        this.lat = lat;
        this.lng = lng;
    }
}