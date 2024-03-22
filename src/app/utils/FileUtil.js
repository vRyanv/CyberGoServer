const {unlink} = require('node:fs')

module.exports = {
    DeleteFile: (path, file_name) => {
        unlink(path + file_name, (error) => {
            if(error){
                console.log('unlink error', error)
            }
        });
    }
}