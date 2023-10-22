
const qr = require('qrcode');
module.exports = (options = {}) => {
  return async context => {
    const { result } = context;
    const { id } = result; 

    const timeStamp = Date.now();
    const fileName = `qrCode${timeStamp}`;

    try {
      await qr.toFile(`public/${fileName}.png`, id);
    } catch (error) {
      console.error('Gagal membuat dan menyimpan QR code:', error);
    }
    return context;
  };
};
