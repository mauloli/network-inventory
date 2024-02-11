const qr = require('qrcode');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = () => {
  return async context => {
    const { result, app } = context;
    const { id } = result;
    const timeStamp = Date.now();
    const fileName = `qrCode${timeStamp}.png`;

    const algorithm = 'aes-256-cbc';
    const cipher = crypto.createCipher(algorithm, 'secretKey');
    let encryptedNumber = cipher.update(String(id), 'utf-8', 'hex');
    encryptedNumber += cipher.final('hex');

    const url = `https://kslsqwb8-3000.asse.devtunnels.ms/inventory/${encryptedNumber}`;
    console.log(url)
    const qrCodeData = url;

    const qrCodeImageBuffer = await qr.toBuffer(qrCodeData);

 
    const filePath = path.join(__dirname, '..', '..', 'public', fileName);

    fs.writeFileSync(filePath, qrCodeImageBuffer);

    await app.service('inventory').Model.update(
      { image: fileName },
      { where: { id } }
    );
    return context;
  };
};
