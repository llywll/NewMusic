import nedb from 'nedb'
import path from 'path'
import { remote } from 'electron'
const db = new nedb({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/data.db'),

})
const userDb = new nedb({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/user.db'),

})
export { db, userDb };