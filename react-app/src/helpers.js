export function isObjInList(list, objId) {
    return list.filter(u => u._id === objId || u === objId).length > 0
}