import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';


export const MsisdnRegex: RegExp = /^(?:[0-9] ?){6,14}[0-9]{1,11}$/;

export const PasswordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*\d).{8,}$/;


export const IndexRegex = /^[SP]\d{4}\/\d{4}\/\d{4}$/;

export const uppercaseReg = /[A-Z]/g;


export const extractKey = (text: string):string => {
    let label = text;

    const uppercase = Array.from(text).find(char => char.match(/[A-Z]+/));
    
    if(uppercase !== undefined){
        label = label.replace(uppercase!, ` ${uppercase.toLocaleLowerCase()}`);
        return extractKey(label);
    }
    
    return label;
}


export class Utils {
    public static PROJECT_NAME = "SIMS";

    public static hashSting = (plaintext: string) => {
        const hash = sha256(plaintext);
        return hash.toString(CryptoJS.enc.Hex);
    }
}

export const capitalize = (text: string) => {
    return text.trim().split(" ")
        .map((word) => word.charAt(0).toUpperCase().concat(word.slice(1).toLowerCase()))
        .join(" ");
}

export const shouldAllow = <T> (condition: T, allowed: T[]):boolean => {
    return allowed.includes(condition);
}

export const getDetailsRoute = (route: string, id: number | string) => {
    return route.replace(":id", id.toString());
}