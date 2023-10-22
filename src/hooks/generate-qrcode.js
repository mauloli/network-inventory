
const qr = require('qrcode');
module.exports = () => {
  return async context => {
    const { result, app } = context;
    const { id } = result;

    const timeStamp = Date.now();
    const fileName = `qrCode${timeStamp}`;

    try {
      await qr.toFile(`public/${fileName}.png`, id);

      const updateQr = await app.service('inventory-brand')._patch(id, {
        qr_image: `${fileName}.png`
      });

      context.result = updateQr;
    } catch (error) {
      console.error('Gagal membuat dan menyimpan QR code:', error);
    }

    return context;
  };
};
