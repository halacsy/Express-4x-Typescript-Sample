/// <reference path='../../typings/tsd.d.ts' />

import mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

export var UserSchema   = new Schema({
    name: String
});

export interface IUser extends mongoose.Document {
    name:string
};


export var User = mongoose.model<IUser>('UserSchema', UserSchema);
    