function convertTo6Bits(payload) {
    const panjang_data_hex = payload.slice(1, 2); // Ambil panjang data dalam bentuk hexadecimal
    const panjang_data_decimal = parseInt(panjang_data_hex, 16); // Konversi panjang data dari hex ke desimal
  
    const isi_data_hex = payload.slice(2, 4); // Ambil isi data dalam bentuk hexadecimal
    const isi_data_binary = parseInt(isi_data_hex, 16).toString(2).padStart(8, '0'); // Konversi isi data dari hex ke binary (8 bit)
  
    const bits6 = isi_data_binary.slice(0, panjang_data_decimal); // Ambil hanya 6 bit pertama berdasarkan panjang data
  
    return bits6;
  }
  
  // Contoh penggunaan
  const payload = "b6f8";
  const result = convertTo6Bits(payload);
  console.log("Hasil konversi:", result); // Output: Hasil konversi: 111110
  