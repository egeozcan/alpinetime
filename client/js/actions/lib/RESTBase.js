let stateTree = require("../../stateTree.js");
let getBaseEntity = require("./getBaseEntity.js");
let stores = stateTree.select("stores");
let request = require("superagent"); 

export function add(type, data, cb) {
  let entity = Object.assign({}, getBaseEntity(), data);
  let entityStore = stores.select(`${type}s`);
  let cursor = entityStore.push(Object.assign({}, entity));
  let tempId = entity.ID;
  delete entity.ID;
  request.post(`/api/${type}s`, entity).end(function(err, res) {
    cb = cb || () => {};
    if (!!err) {
      cb(err);
      return;
    }
    let savedEntity = JSON.parse(res.text);
    entityStore.select(e => e.ID === tempId).merge(savedEntity);
    cb(null, savedEntity);
  });
}
/*
export function delete(type, id) {
  request.post(`/api/${type}s`, entity).end(function(err, res) {
    let newPkg = JSON.parse(res.text);
    packageStore.select(p => p.ID === tempId).merge(newPkg);
  });
}*/