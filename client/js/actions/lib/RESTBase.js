"use strict";

import stateTree from "../../stateTree.js";
import getBaseEntity from "./getBaseEntity.js";
let stores = stateTree.select("stores");
import request from "superagent";

export function add(type, data, cb) {
    let entity = Object.assign({}, getBaseEntity(), data);
    let entityStore = stores.select(`${type}s`);
    entityStore.push(Object.assign({}, entity));
    let tempId = entity.ID;
    delete entity.ID;
    request.post(`/api/${type}s`, entity).end(function(err, res) {
        cb = cb || (() => {});
        if (err) {
            cb(err);
            return;
        }
        let savedEntity = JSON.parse(res.text);
        entityStore.select(e => e.ID === tempId).merge(savedEntity);
        cb(null, savedEntity);
    });
}