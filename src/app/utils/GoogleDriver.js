const { google } = require('googleapis');
const {CyberGoGoogleServiceKey} = require('../../env');
const fs = require('fs');

const SCOPES = ['https://www.googleapis.com/auth/drive']; // Phạm vi quyền truy cập

const auth = new google.auth.JWT(
    CyberGoGoogleServiceKey.client_email,
    null,
    CyberGoGoogleServiceKey.private_key,
    SCOPES
);

const drive = google.drive({ version: 'v3', auth });
async function listFiles() {
  try {
    const response = await drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    });
    const files = response.data.files;
    if (files.length) {
      console.log('Files:');
      files.forEach((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  } catch (error) {
    console.error('Error listing files:', error);
  }
}



const googleDriver = {
  setFilePublic: async(fileId) =>{
    try {
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      })

      const getUrl = await drive.files.get({
        fileId,
        fields: 'webViewLink, webContentLink'
      })

      return getUrl;
    } catch (error) {
      console.error(error);
    }
  },
  uploadFile: async (fileName, fileType, folder, __path) => {
    try {
      const createFile = await drive.files.create({
        requestBody: {
          name: fileName,
          mimeType: fileType,
          parents: [folder]
        },
        media: {
          mimeType: fileType,
          body: fs.createReadStream('../secret/cyber-go-key.json')
        },
      })
      let link = await googleDriver.setFilePublic(createFile.data.id);
      createFile.data.link = link.data
      console.log(createFile)
      return createFile.data
    } catch (error) {
      console.error(error);
    }
  },
  deleteFile: async (fileId) => {
    try {
      const deleteFile = await drive.files.delete({
        fileId: fileId
      })
      return deleteFile
    } catch (error) {
      console.error(error);
    }
  },
  checkDriveQuota: async() => {
    try {
      const res = await drive.about.get({
        fields: 'storageQuota',
      });

      const storageQuota = res.data.storageQuota;
      console.log('Dung lượng đã sử dụng:', storageQuota.usageInDrive, 'bytes');
      console.log('Dung lượng tối đa:', storageQuota.limit, 'bytes');
    } catch (error) {
      console.error('Lỗi khi kiểm tra dung lượng:', error);
    }
  }
}

// googleDriveService.uploadFile('hello','application/json', 'root', 'ds')
// googleDriver.deleteFile('1wHdLOvZ3X6Nq_J6gRAUb4x0oUbV3PE4K')
// googleDriveService.checkDriveQuota()