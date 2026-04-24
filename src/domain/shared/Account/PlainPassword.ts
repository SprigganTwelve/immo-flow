

type PlainPasswordProsps = {
    password: string
}


class PlainPassword {
    private password: string;
    constructor({ password }: PlainPasswordProsps){
        this.password = password
    }
}

export default PlainPassword