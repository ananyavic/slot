export class Users{
    username: string;
    emailId: string;
    password: string;
    contactNum?: string;
    proficPic?: string;

    constructor(
        username: string,
        emailId: string,
        password: string,
        contactNum?: string,
        proficPic?: string,

    ){
        this.username = username;
        this.emailId = emailId;
        this.contactNum = contactNum;
        this.password = password;
        this.proficPic =proficPic;
    }
}