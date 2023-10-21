
const qr = require('qrcode');
module.exports = (options = {}) => {
  return async context => {
    const { result } = context;
    const { id } = result; // Dapatkan ID yang baru saja tergenerate

    const timeStamp = Date.now();
    const fileName = `qrCode${timeStamp}`;

    try {
      const qrCodeImage = await qr.toFile(`public/${fileName}.png`, id);

    } catch (error) {
      console.error('Gagal membuat dan menyimpan QR code:', error);

    }
    // Generate QR code
    // Simpan gambar QR code secara lokal
    // const qrCodeFileName = `${id}.png`;
    // const qrCodePath = path.join(app.get('public'), 'qr-codes', qrCodeFileName);

    // fs.writeFileSync(qrCodePath, qrCodeImage);
    return context;
  };
};
