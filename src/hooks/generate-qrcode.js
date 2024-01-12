const qr = require('qrcode');
const fs = require('fs');
const path = require('path');

module.exports = () => {
  return async context => {
    const { result, app } = context;
    const { id } = result;
    const qrCodeData = `${id}`;

    const qrCodeImageBuffer = await qr.toBuffer(qrCodeData);

    const timeStamp = Date.now();
    const fileName = `qrCode${timeStamp}.png`;
    const filePath = path.join(__dirname, '..', '..', 'public', fileName);

    fs.writeFileSync(filePath, qrCodeImageBuffer);

    await app.service('inventory').Model.update(
      { image: fileName },
      { where: { id } }
    );
    
    return context;
  };
};
