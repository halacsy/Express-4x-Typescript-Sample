/// <reference path='../../typings/tsd.d.ts' />

import mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

export var UserSchema   = new Schema({
    name : {familyName : String, givenName:String, middleName:String },
    email : String,
    facebook: { id: String, profileUrl: String, token:String },
    
    
    
});

export interface IUser extends mongoose.Document {
    displayName: string;
    name? : {
         familyName: string;
         givenName: string;
         middleName?: string;
    };
    email? : String;
    facebook : {
        id:string,
        profileUrl:string,
        token:string
    }
    
};


export var User = mongoose.model<IUser>('UserSchema', UserSchema);
    