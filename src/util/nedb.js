import nedb from 'nedb'
import path from 'path'
import { remote } from 'electron'


let _dirName = remote.app.getPath('userData')
let dataDb = new nedb(path.join(_dirName, '/data.db'))
let userDb = new nedb(path.join(_dirName, '/user.db'))

dataDb.loadDatabase()
userDb.loadDatabase()

export { dataDb, userDb };