const Helper = {
    DatePadStart(date){
        return [
            String(date.getMonth() + 1).padStart(2, '0'),
            String(date.getDate()).padStart(2, '0'),
            String(date.getFullYear())
        ].join('/')
    },
    TimePadStart(time){
        return [
            String(time.getHours()).padStart(2, '0'),
            String(time.getMinutes()).padStart(2, '0')
        ].join(':')
    }
}

module.exports = Helper