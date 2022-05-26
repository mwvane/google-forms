export default class Helpers {
    static getID(array) {
        let id = 0;
        for (let item of array) {
            if (item.id > id) {
                id = item.id
            }
        }
        return id + 1
    }

    static findIndexById(id, array) {
        return array.findIndex(item => item.id === id)
    }
}
