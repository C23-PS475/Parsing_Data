function hexStringToString(hexString) {
    // Mengubah string heksadesimal ke string teks
    const hex = hexString.toString(); // Ubah ke string jika belum string
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }
  
  const hexValue = '087000000080d5e3c4401FF0';
  const result = hexStringToString(hexValue);
  console.log(result); // Output: '???????'
  