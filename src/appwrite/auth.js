import {Client, Account, ID} from "appwrite";
import conf from "../conf/conf";

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}) {
        try {
            const userAcccount = await this.account.create(ID.unique(), email, password, name);
            if(userAcccount){
                // call another method
                return this.login({email, password});
            } else {
                return userAcccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error){
            throw error;
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
            
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
};

const authService = new AuthService();

export default authService;

