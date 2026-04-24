import Image from "@/domain/file/Image";
import Address from "./Address";
import Email from "./Email";
import PlainPassword from "./PlainPassword";

export interface PersonProps{
  id: string;
  
  image: Image;
  firstName: string;
  lastName: string;
  address: Address;
  
  email: Email;
  password: PlainPassword;

  createdAt: Date;
  updatedAt: Date;
 
}


class Person{
    public id: string;

    public firstName: string;
    public lastName: string;
    
    public image: Image;
    public address: Address;
    
    public email: Email;
    public password: PlainPassword;

    public createdAt: Date;
    public updatedAt: Date;

    constructor({
        id,

        firstName,
        lastName,
        
        email,
        password,

        image,
        address,

        createdAt,
        updatedAt
    }: PersonProps){
        this.id = id;
        
        this.firstName = firstName;
        this.lastName = lastName;

        this.email = email;
        this.password = password;

        this.image = image;
        this.address = address;

        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default Person