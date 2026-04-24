
interface AddressProps{
    street: string;
    country: string;
    postalCode: string;
}

class Address{
    public street: string;
    public country: string;
    public postalCode: string;

    constructor({street, country, postalCode}: AddressProps){
        this.street = street;
        this.country = country;
        this.postalCode = postalCode;
    }
}

export default Address