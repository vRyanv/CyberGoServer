const fs = require('fs');

// Đọc nội dung từ file JSON
fs.readFile('../countries.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Lỗi khi đọc file:', err);
        return;
    }

    try {
        // Parse dữ liệu JSON
        const jsonArray = JSON.parse(data);

        // Sửa tên các khóa từ 'dial_code' thành 'prefix'
        const modifiedArray = jsonArray.map(item => {
            return {
                ...item,
                prefix: item.dial_code,
                // Loại bỏ khóa 'dial_code' nếu cần thiết
                ...(delete item.dial_code && { dial_code: undefined })
            };
        });

        // Chuyển đổi dữ liệu đã sửa thành chuỗi JSON
        const modifiedJsonString = JSON.stringify(modifiedArray, null, 2);

        // Ghi dữ liệu đã sửa vào file
        fs.writeFile('countries.json', modifiedJsonString, 'utf8', err => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
                return;
            }
            console.log('File đã được sửa và ghi thành công!');
        });
    } catch (error) {
        console.error('Lỗi khi xử lý dữ liệu JSON:', error);
    }
});