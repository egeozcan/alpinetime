"use strict";

export default function getBaseEntity () {
    var d = new Date();
    return {
        "ID": "temp" + Date.now(),
        "createdAt": d.toJSON(),
        "updatedAt": d.toJSON(),
        "deletedAt": null,
        "CreateUserID": "0",
        "ModifyUserID": "0"
    };
}