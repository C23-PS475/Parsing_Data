function tampilkanData() {
  const payload = document.getElementById("payload").value;
  const bufferLength = 4; // Set buffer length per value (4 bytes for UInt32, 2 bytes for UInt16)
  let offset = 0;

  const serialNumber = payload.slice(2, 12).toString('hex');
  const reversedSerialNumber = reverseString(serialNumber); // Memanggil fungsi reverseString() untuk membalikkan Serial Number
  offset += bufferLength * 2;
  const forwardFlow = payload.slice(12, 20);
  const reversedFlow = reverseString(forwardFlow);
  const forwardfloww = parseInt(reversedFlow, 16);
  const forwardFlowWithDecimal = (forwardfloww  / 1000).toFixed(3); // Bagi dengan faktor skala 1000 dan tampilkan 3 digit desimal
  offset += bufferLength * 2;
  const history1 = payload.slice(28, 36);
  const reversedhistory1 = reverseString(history1);
  const history11 = parseInt(reversedhistory1, 16);
  const history11decimal = (history11 / 1000).toFixed(3);
  offset += bufferLength * 2;
  const history2 = payload.slice(36, 44);
  const reversedhistory2 = reverseString(history2);
  const history22 = parseInt(reversedhistory2, 16);
  const history22decimal = (history22 / 1000).toFixed(3);
  offset += bufferLength * 2;
  const history3 = payload.slice(44, 52);
  const reversedhistory3 = reverseString(history3);
  const history33 = parseInt(reversedhistory3, 16);
  const history33decimal = (history33 / 1000).toFixed(3);
  offset += bufferLength * 2;
  const uploadInterval = payload.slice(54, 58);
  const reverseuploadInterval = reverseString(uploadInterval);
  const uploadIntervall = parseInt(reverseuploadInterval, 16);
  offset += bufferLength;
  const battery = payload.slice(76, 78);
  const reverseuploadbattery = reverseString(battery);
  let batteryy = parseInt(reverseuploadbattery, 16) / 10;
  const allowedValues = ["23", "24", "25"];
  const rangeArray = Array.from({ length: 8 }, (_, index) => (index + 15).toString())
  const rangeArray2 = Array.from({ length: 3 }, (_, index) => (index + 12).toString());
  let batteryy2;
  if (allowedValues.includes(battery)) {
      batteryy2 = 100;
  } else if (rangeArray.includes(battery)) {
      batteryy2 = Math.round(((1.85 - (3.7 - batteryy)) / 1.85) * 100);
  } else if (rangeArray2.includes(battery)) {
      batteryy2 = 0;
  }
  offset += bufferLength;
  const timestamp = payload.slice(58, 72);
  const reversetimestamp = reverseString(timestamp);
  const day = parseInt(reversetimestamp.slice(6, 8), 16); // Ambil nilai hari dari indeks 6 sampai 8
  const month = parseInt(reversetimestamp.slice(4, 6), 16); // Ambil nilai bulan dari indeks 4 sampai 6
  const year = parseInt(reversetimestamp.slice(0, 4), 16); // Ambil nilai tahun dari indeks 0 sampai 4
  const hour = parseInt(reversetimestamp.slice(8, 10), 16);
  const minute = parseInt(reversetimestamp.slice(10, 12), 16);
  const second = parseInt(reversetimestamp.slice(12, 14), 16);

  // Menampilkan hasil data parsingan di div dengan id "hasilData"
  document.getElementById("hasilData").innerHTML = `
    <p>Serial Number: ${reversedSerialNumber}</p>
    <p>Forward Flow: ${forwardFlowWithDecimal} m³</p>
    <p>History 1: ${history11decimal} m³</p>
    <p>History 2: ${history22decimal} m³</p>
    <p>History 3: ${history33decimal} m³</p>
    <p>Upload Interval: ${uploadIntervall} mins</p>
    <p>Battery: ${batteryy2} %</p>
    <p>TimeStamp: ${getDayWithOrdinal(day)} ${getNamaBulan(month)} ${year}, ${addLeadingZero(hour)}:${addLeadingZero(minute)}:${addLeadingZero(second)}</p>
  `;
}

function tampilkanDatamilesight() {
  const payload2 = document.getElementById("payload").value;
  const bufferLength2 = 4; // Set buffer length per value (4 bytes for UInt32, 2 bytes for UInt16)
  let offset2 = 0;

  var output1 = "";
  const channel = payload2.slice(0, 2).toString('hex');
  if (channel === "03") {
    output1 = "GPIO1";
  } else if (channel === "04") {
    output1 = "GPIO2";
  }else if (channel === "06") {
  } else if (channel === "05") {
    output1 = "AI 1";
    output1 = "AI 2";
  } else if (channel === "ff") {
    output1 = "RS485 data";
  }
  offset2 += bufferLength2 * 2;


  var output2 = "";
  const type = payload2.slice(2, 4).toString('hex');
  if (type === "00") {
    output2 = "Digital Input";
  } else if (type === "01") {
    output2 = "Digital Output";
  } else if (type === "c8") {
    output2 = "Counter";
  } else if (type === "01") {
    output2 = "Protocol Version";
  } else if (type === "08") {
    output2 = "Device SN";
  } else if (type === "09") {
    output2 = "Hardware Version";
  } else if (type === "0a") {
    output2 = "Software Version";
  } else if (type === "0b") {
    output2 = "Power On";
  } else if (type === "0f") {
    output2 = "Device Type";
  } else if (type === "14") {
    output2 = "Analog type";
  } else if (type === "0e") {
    output2 = "RS485";
  }
  offset2 += bufferLength2 * 2;

  var output3 = "";
  const value = payload2.slice(4, 12).toString('hex');
  const reversedvalue = reverseString(value);
  output3 = parseInt(reversedvalue, 16);
  if (value === "00") {
    output3 = "LOW"
  } else if (value === "01") {
    output3 = "HIGH"
  } else if (value === "000") {
    output3 = "Coil"
  } else if (value === "001") {
    output3 = "Discrete"
  } 
  offset2 += bufferLength2 * 2;

  var output4 = "";
  const battery = payload2.slice(16, 18).toString('hex');
  output4 = parseInt(battery, 16);

  document.getElementById("hasilData").innerHTML = `
    <p>Channel: ${output1}</p>
    <p>Type: ${output2}</p>
    <p>Value: ${output3}</p>
    <p>Battery: ${output4}%</p>
    `;
}

let map = null;
let marker = null;
let markers = [];

function tampilkandatalansitec(){
  const payload4 = document.getElementById("payload").value;
  type = payload4.charAt(0)

  const type1 = payload4.slice(0, 1)
  if (type1 === "3") {
    data1 = payload4.slice(2, 10)
    data2 = payload4.slice(10, 18)
    data3 = payload4.slice(18, 26)
    
    const HexToFloat32 = (str) => {

        var int = parseInt(str, 16);
        if (int > 0 || int < 0) {
            var sign = (int >>> 31) ? -1 : 1;
            var exp = (int >>> 23 & 0xff) - 127;
            var mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
            var float32 = 0
            for (i = 0; i < mantissa.length; i += 1) { float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0; exp-- }
            return float32 * sign;
        } else return 0
    }
    function HexToInteger(hex) {
      // Mengonversi string heksadesimal menjadi angka desimal
      const decimalValue = parseInt(hex, 16);
      // Menghitung jam, menit, dan detik dalam waktu UTC
      const utcHours = Math.floor(decimalValue / 3600);
      const utcMinutes = Math.floor((decimalValue % 3600) / 60);
      const utcSeconds = decimalValue % 60;
      // Menambahkan offset waktu UTC ke waktu lokal (misalnya, Jakarta: UTC+7)
      const offsetHours = 7; // Offset waktu UTC+7 (sesuaikan dengan zona waktu lokal Anda)
      const localHours = (utcHours + offsetHours) % 24;
      const formattedTime = `${String(localHours).padStart(2, '0')}:${String(utcMinutes).padStart(2, '0')}:${String(utcSeconds).padStart(2, '0')}`;
      return formattedTime;
    }

    // Konversi nilai heksadesimal data3 ke dalam format tanggal
    const unixTimestamp = parseInt(data3, 16);
    const date = new Date(unixTimestamp * 1000); // Konversi ke milidetik
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;
    
    var longitude = HexToFloat32(data1);
    var latitude = HexToFloat32(data2);
    const formattedTime = HexToInteger(data3);

  document.getElementById("hasilData").innerHTML = `
  <p>Latitude : ${latitude}</p>
  <p>Longitude : ${longitude}</p>
  <p>Date : ${formattedDate}</p>
  <p>Time : ${formattedTime}</p>
`;

if (marker) {
  map.removeLayer(marker);  
}

marker = L.marker([latitude, longitude]).addTo(map)
  .setLatLng([latitude, longitude])
  .bindPopup(`<b>Latitude:</b> ${latitude}<br><b>Longitude:</b> ${longitude}<br><b>Time:</b> ${formattedTime}<br><b>Date:</b> ${formattedDate}`)
  .openPopup();

map.setView([latitude, longitude], 15);
}
 else if (type1 === "2") {
  const hexToDecimal = hex => parseInt(hex, 16);
  data_voltage = payload4.slice(2, 4)
  data_RSSI = payload4.slice(4, 6)
  data_SNR = payload4.slice(6, 10)
  data_GNSS = payload4.slice(10, 12)

  const voltage = hexToDecimal(data_voltage)
  voltase = (voltage * 0.01) + 1.5 
  persentase = ((0.75 - (3.6 - voltase)) / 0.75) * 100
  const RSSI = hexToDecimal(data_RSSI) * -1
  const SNR = hexToDecimal(data_SNR) * 0.01
  const hexToBinary2 = hex => {
    let binary = parseInt(hex, 16).toString(2);
    while (binary.length < 8) {
      binary = "0" + binary;
    }
    
    return binary;
  };
  var data_output = "";
  if (data_GNSS == "00") {
    data_output = "GNSS OFF"
  } else if (data_GNSS == "01") {
    data_output = "bot GNSS"
  } else if (data_GNSS == "02") {
    data_output = "locating"
  } else if (data_GNSS== "03") {
    data_output = "located"
  } else if (data_GNSS == "09") {
    data_output = "No Signal"
  }
  document.getElementById("hasilData").innerHTML = `
  <p>Voltage : ${voltase} V</p>
  <p>Persentase : ${persentase} %</p>
  <p>RSSI : ${RSSI}</p>
  <p>SNR : ${SNR}</p>
  <p>GNSS : ${data_output}</p>
  `;
 } else if (type1 === "8") {
  const hexToDecimal = hex => parseInt(hex, 16);
  const get_Major_Beacon = payload4.slice(4, 8);
  const get_Minor_Beacon = payload4.slice(8, 12);

  const data_Major_Asset = hexToDecimal(get_Major_Beacon);
  const data_Minor_Asset = hexToDecimal(get_Minor_Beacon);

  const dataToSend = {
    major: data_Major_Asset,
    minor: data_Minor_Asset
  };

  fetch('https://header-8.vercel.app/receivedata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;ty=4',
      'Accept': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  })
  .then(response => response.json())
  .then(data => {
    const depoData = data.data[0];

    if (depoData) {
      document.getElementById("hasilData").innerHTML = `
        <p>Nama Depo: ${depoData.Nama_Depo}</p>
        <p>Zona: ${depoData.zona}</p>
        <p>Major: ${depoData.major}</p>
        <p>Minor: ${depoData.minor}</p>
        <p>Longitude: ${depoData.longitude}</p>
        <p>Latitude: ${depoData.latitude}</p>
      `;

 // Menampilkan marker di peta
 if (marker) {
  map.removeLayer(marker);
}

marker = L.marker([depoData.latitude, depoData.longitude]).addTo(map)
  .setLatLng([depoData.latitude, depoData.longitude])
  .bindPopup(`<b>Latitude:</b> ${depoData.latitude}<br><b>Longitude:</b> ${depoData.longitude}<br><b>Depo:</b> ${depoData.Nama_Depo}<br><b>zona:</b> ${depoData.zona}`)
  .openPopup();

map.setView([depoData.latitude, depoData.longitude], 15);
} 

else {
document.getElementById("hasilData").innerHTML = `<p>Data tidak ditemukan.</p>`;
}  
  })
  .catch(error => {
    document.getElementById("hasilData").innerHTML = `<p>Error fetching data.</p>`;
  });

  
  
} else if(type1 === "7"){
  const hexToDecimal = hex => parseInt(hex, 16);
    data_jumlah_beacon_receive = payload4.slice(1, 2)

    if (data_jumlah_beacon_receive == "1") {

        data_VIBSTATE = payload4.slice(2, 4)
        data_Minor = payload4.slice(16, 20)
        data_Major = payload4.slice(12, 16)
        data_RSSI = payload4.slice(20, 22)

        const VIBSTATE = hexToDecimal(data_VIBSTATE)
        const RSSI = hexToDecimal(data_RSSI)
        const Minor = hexToDecimal(data_Minor)
        const Major = hexToDecimal(data_Major)
   
        document.getElementById("hasilData").innerHTML = `
        <p>Jumlah Beacon yang diterima : ${data_jumlah_beacon_receive}</p>
        <p>-------------Data Beacon 1-------------</p>
        <p>Vibstate : ${VIBSTATE}</p>
        <p>Minor : ${Minor}</p>
        <p>Major : ${Major}</p>
        <p>RSSI : ${RSSI - 256}</p>
        `;
    }
    if (data_jumlah_beacon_receive == "2") {

        data_VIBSTATE_1 = payload4.slice(2, 4)
        data_Major_1 = payload4.slice(12, 16)
        data_Minor_1 = payload4.slice(16, 20)
        data_RSSI_1 = payload4.slice(20, 22)

        data_Major_2 = payload4.slice(22,26)
        data_Minor_2 = payload4.slice(26,30)
        data_RSSI_2 = payload4.slice(30,32)

        const VIBSTATE_1 = hexToDecimal(data_VIBSTATE_1)
        const RSSI_1 = hexToDecimal(data_RSSI_1)
        const Minor_1 = hexToDecimal(data_Minor_1)
        const Major_1 = hexToDecimal(data_Major_1)

        const RSSI_2 = hexToDecimal(data_RSSI_2)
        const Minor_2 = hexToDecimal(data_Minor_2)
        const Major_2 = hexToDecimal(data_Major_2)
  
        document.getElementById("hasilData").innerHTML = `
        <p>Jumlah Beacon yang diterima : ${data_jumlah_beacon_receive}</p>
        <p>-------------Data Beacon 1-------------</p>
        <p>Vibstate : ${VIBSTATE_1}</p>
        <p>Minor : ${Minor_1}</p>
        <p>Major : ${Major_1}</p>
        <p>RSSI : ${RSSI_1 - 256}</p>
        <p>-------------Data Beacon 2-------------</p>
        <p>Minor : ${Minor_2}</p>
        <p>Major : ${Major_2}</p>
        <p>RSSI : ${RSSI_2 - 256}</p>
        `;
    }
    else if(data_jumlah_beacon_receive == "3"){

        data_VIBSTATE_1 = payload4.slice(2, 4)
        data_Major_1 = payload4.slice(12, 16)
        data_Minor_1 = payload4.slice(16, 20)
        data_RSSI_1 = payload4.slice(20, 22)
        data_Major_2 = payload4.slice(22,26)
        data_Minor_2 = payload4.slice(26,30)

        data_RSSI_2 = payload4.slice(30,32)

        data_Major_3 = payload4.slice(32,36)
        data_Minor_3 = payload4.slice(36,40)
        data_RSSI_3 = payload4.slice(40,42)

        const VIBSTATE_1 = hexToDecimal(data_VIBSTATE_1)
        const RSSI_1 = hexToDecimal(data_RSSI_1)
        const Minor_1 = hexToDecimal(data_Minor_1)
        const Major_1 = hexToDecimal(data_Major_1)

        const RSSI_2 = hexToDecimal(data_RSSI_2)
        const Minor_2 = hexToDecimal(data_Minor_2)
        const Major_2 = hexToDecimal(data_Major_2)

        const RSSI_3 = hexToDecimal(data_RSSI_3)
        const Minor_3 = hexToDecimal(data_Minor_3)
        const Major_3 = hexToDecimal(data_Major_3)

        document.getElementById("hasilData").innerHTML = `
        <p>Jumlah Beacon yang diterima : ${data_jumlah_beacon_receive}</p>
        <p>-------------Data Beacon 1-------------</p>
        <p>Vibstate : ${VIBSTATE_1}</p>
        <p>Minor : ${Minor_1}</p>
        <p>Major : ${Major_1}</p>
        <p>RSSI : ${RSSI_1 - 256}</p>
        <p>-------------Data Beacon 2-------------</p>
        <p>Minor : ${Minor_2}</p>
        <p>Major : ${Major_2}</p>
        <p>RSSI : ${RSSI_2 - 256}</p>
        <p>-------------Data Beacon 3-------------</p>
        <p>Minor : ${Minor_3}</p>
        <p>Major : ${Major_3}</p>
        <p>RSSI : ${RSSI_3 - 256}</p>
        `;

    }
 } else if (type1 === "9"){
  var data_output1 = "";
  data_temper = payload4.charAt(3)
    if (data_temper == "1") {
        data_output1 = "Nyala"
    }
    document.getElementById("hasilData").innerHTML = `
    <p>Status Alarm : ${data_output1}</p>
    `;

 } else if (type1 == "b") {

  function hexToUTC(hexString) {
    // Konversi dari string heksadesimal menjadi nilai integer
    let intValue = parseInt(hexString, 16);

    // Konversi nilai integer menjadi waktu UTC
    let utcTime = new Date(intValue * 1000); // Unix time dalam milidetik

    return utcTime.toUTCString(); // Mengonversi ke format waktu UTC string
}

// Fungsi konversi float dari string heksadesimal
function hexToFloat(hex) {
    let intValue = parseInt(hex, 16);
    let floatView = new Float32Array(1);
    let intView = new Uint32Array(floatView.buffer);
    intView[0] = intValue;
    return floatView[0];
}

let data_Maj = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126.127, 128, 129, 130]

let markers = [];
let counter = 0;
 // Variabel untuk menampung hasil parsing
 let result = '';

 let jumlah_data = payload4.slice(1, 2);
 let jumlah_data2 = parseInt(jumlah_data, 16);
 let x = 4;
 let y = 8;

 for (let i = 0; i < jumlah_data2; i++) {
     let jenis_data, data_longitude, data_latitude, utcTime, major, minor, RSSI;

     let filterdata = payload4.slice(x, y);
     let Headerdata = parseInt(filterdata, 16);

     if (data_Maj.includes(Headerdata)) {
         jenis_data = "BLE";
     } else {
         jenis_data = "GPS";
     }

     if (jenis_data == "GPS") {
         y = y + 4;
         let get_data1 = payload4.slice(x, y);
         data_longitude = hexToFloat(get_data1);

         x = x + 8;
         y = y + 8;
         let get_data2 = payload4.slice(x, y);
         data_latitude = hexToFloat(get_data2);

         x = x + 8;
         y = y + 8;
         let get_data3 = payload4.slice(x, y);
         utcTime = hexToUTC(get_data3);

         x = y;
         y = y + 4;

        // Membuat penanda untuk koordinat GPS
        let marker = L.marker([data_latitude, data_longitude]).addTo(map)
            .bindPopup(`
                <b>Latitude:</b> ${data_latitude}<br>
                <b>Longitude:</b> ${data_longitude}<br>
                <b>Data ke-${counter + 1}</b>
            `);
         markers.push(marker);
         counter++;

     } else if (jenis_data == "BLE") {
         let get_data1 = payload4.slice(x, y);
         major = parseInt(get_data1, 16);

         x = x + 4;
         y = y + 4;
         let get_data2 = payload4.slice(x, y);
         minor = parseInt(get_data2, 16);

         x = x + 4;
         y = y + 2;
         let get_data3 = payload4.slice(x, y);
         RSSI = parseInt(get_data3, 16) - 256;

         x = y;
         y = y + 4;
         // Kirim data major dan minor ke server
        fetch('https://header-8.vercel.app/receivedata', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;ty=4',
              'Accept': 'application/json'
          },
          body: JSON.stringify({ major, minor }) // Mengirim data major dan minor
      })
      .then(response => response.json())
      .then(data => {
          const depoData = data.data[0];

          if (depoData) {
              // Jika data ditemukan, buat marker dan tampilkan di peta
              let marker = L.marker([depoData.latitude, depoData.longitude]).addTo(map)
                  .bindPopup(`
                      <b>Nama Depo:</b> ${depoData.Nama_Depo}<br>
                      <b>Zona:</b> ${depoData.zona}<br>
                      <b>Latitude:</b> ${depoData.latitude}<br>
                      <b>Longitude:</b> ${depoData.longitude}<br>
                  `);
              markers.push(marker);
              counter++;

              if (markers.length > 0) {
                  const group = L.featureGroup(markers);
                  map.fitBounds(group.getBounds());
              }
          }
      })
      .catch(error => {
          console.error('Error:', error);
      }); 
     }
      // Menambahkan hasil parsing ke dalam variabel 'result' hanya jika jenis datanya sesuai
      if ((jenis_data === "GPS")) {
        result += `
            <p>Jenis Data: ${jenis_data}</p>
            <p>Longitude: ${data_longitude}</p>
            <p>Latitude: ${data_latitude}</p>
            <p>UTC Time: ${utcTime}</p>
        `;
      }else if ((jenis_data === "BLE")){
      result += `
      <p>Jenis Data: ${jenis_data}</p>
       <p>Major: ${major}</p>
       <p>Minor: ${minor}</p>
       <p>RSSI: ${RSSI}</p>
`;
  }  
  if (markers.length > 0) {
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds());
  }  
}
 document.getElementById("hasilData").innerHTML = result;
 }
 
 else if (type1 === "1"){
  const hexToBinary = hex => parseInt(hex, 16).toString(2);
  data_type1 = payload4.slice(0,2)
  const  data_type2 = hexToBinary(data_type1)
  data_adr = data_type2.slice(1,2)
  var data_type3 = "";
  if (data_adr == "0") {
    data_type3 = "OFF"
  } else if (data_adr == "1") {
    data_type3 = "ON"
  }
  data_type4 = payload4.slice(4,6)
   const data_power = hexToBinary(data_type4)
   data_pwr = data_power.slice(0,5)
   const data_pwr_dsml = parseInt(data_pwr, 2);
   data_offline = data_power.slice(5,6)
   alarm_enable = data_power.slice(6,7)
   single_key = data_power.slice(7,8)

   var cache = ''
   var alarm = ''
   var single = ''

   if (data_offline == "0"){
    cache = "disable"
   } else if (data_offline == "1") {
    cache = "enable"
   } 
   if (alarm_enable == "0") {
    alarm = "disable"
   } else if (alarm_enable == "1"){
    alarm = "enable"
   }
   if (single_key == "0") {
    single = "disable"
   } else if (single_key == "1") {
    single = "enable"
   }

   const hexToBinary2 = hex => {
     let binary = parseInt(hex, 16).toString(2);
     while (binary.length < 8) {
       binary = "0" + binary;
     }
    return binary;
  };
  data_type5 = payload4.slice(6,8)
  const cfg1 = hexToBinary2(data_type5)
  data_DR =  cfg1.slice(0,4)
  const data_dreal = parseInt(data_DR, 2);
  const hexToBinary3 = hex => {
  // Memasukkan hasil ke dalam variabel yang dibulatkan
    let binary = parseInt(hex, 16).toString(2);
    while (binary.length < 16) {
      binary = "0" + binary;
    }
    return binary;
  };
  data_switchen1 = cfg1.slice(6,7)
  var data_switchen = "";
  if (data_switchen1 == "0"){
    data_switchen = "Disable"
  } else if (data_switchen1 == "1"){
    data_switchen = "enable"
  }
  data_posmode = cfg1.slice(5,7)
  var data_posmode1 = "";
  if (data_posmode == "00"){
    data_posmode1 = "Period Mode"
  } else if (data_posmode == "01"){
    data_posmode1 = "Autonomous mode"
  } else if (data_posmode === "10"){
    data_posmode1 = "On-Demand mode"
  }
  data_GNSSEN = cfg1.slice(4, 5)
  var data_GNSSEN1 =  "";
  if (data_GNSSEN == "0"){
    data_GNSSEN1 = "Disable"
  } else if (data_GNSSEN == "1"){
    data_GNSSEN1 = "Enable"
  }
  
  data_HB = payload4.slice(8,12)
  const data_HB1 = hexToBinary3(data_HB)
  const data_HB_dsml = parseInt(data_HB1, 2);
  value_data_HB_dsml = data_HB_dsml * 30 /60
  data_BLEPRI = payload4.slice(12,16)
  const data_blepri1 = hexToBinary3(data_BLEPRI)
  const data_blepri_dsml = parseInt(data_blepri1, 2);
  value_datablepri_min = data_blepri_dsml * 5 / 60; 
  data_DIV = payload4.slice(16,18)
  const data_div1 = hexToBinary2(data_DIV)
  const data_div_dsml = parseInt(data_div1, 2);
  data_BLEEN = payload4.slice(18,20)
  const data_BLEEN1 = hexToBinary2(data_BLEEN)
  const data_BLEEN_dsml = parseInt(data_BLEEN1, 2);
  potioning_uuid = payload4.slice(20,52)
  /*
  const hexToBinary4 = hex => {
    let binary = parseInt(hex, 16).toString(2);
    while (binary.length < 128) {
      binary = "0" + binary;
    }
    
    return binary;
  };
  const data_potioning = hexToBinary4(potioning_uuid)
  */
  data_gsensor = payload4.slice(52,54)
  const data_gsensor1 = hexToBinary2(data_gsensor)
  const data_gsensor_dsml = parseInt(data_gsensor1, 2);
  value_gsensor = (50 + data_gsensor_dsml * 5)*0.001
  data_VER = payload4.slice(54,58)
  const data_ver1 = hexToBinary3(data_VER)

  data_cfmmsg = payload4.slice(58,60)
  data_hbcount = payload4.slice(60, 62)
  const data_cfmmsg1 = hexToBinary2(data_cfmmsg)
  const data_cfmmsg2 = parseInt(data_cfmmsg1, 2);
  const data_hbcount1 = hexToBinary2(data_hbcount)
  const data_hbcount2 = parseInt(data_hbcount1, 2)
  data_bluetooth = payload4.slice(62,64)
  const data_bluetooth1 = hexToBinary2(data_bluetooth)
  const data_bluetooth2 = parseInt(data_bluetooth1, 2)
  data_bluetooth_receive = payload4.slice(64,66)
  const data_bluetooth_receive1 = hexToBinary2(data_bluetooth_receive)
  const data_bluetooth_receive2 = parseInt(data_bluetooth_receive1, 2)

  data_asset_beacon = payload4.slice(66,68)
  const data_asset_beacon2 = parseInt(data_asset_beacon, 16)
  value_asset_beacon1 = data_asset_beacon2 * 10 / 60
  
  data_asset_beacon_uuid = payload4.slice(68,100)

  data_shock = payload4.slice(100,102)
  const data_shock1 = hexToBinary2(data_shock)
  const data_shock2 = parseInt(data_shock1, 2)
  value_shock = (50 + data_shock2 * 5)*0.001  

  data_shock_detection = payload4.slice(102, 104)

  const data_shock_detection2 = parseInt(data_shock_detection, 16)
  value_period = data_shock_detection2 * 30 / 60
  interval_GNSSPRI = payload4.slice(104, 108)
  const interval_dsml = parseInt(interval_GNSSPRI, 16)
  value_interval = interval_dsml * 5 / 60

  document.getElementById("hasilData").innerHTML = `
  <p>TYPE (ADR) : ${data_type3}</p>
  <p>Power : ${data_pwr_dsml} dbm</p>
  <p>-----Offline Configuration-----</p>
  <p>Offline Cache Enable : ${data_offline}, ${cache}</p>
  <p>Alarm Enable : ${alarm_enable}, ${alarm}</p>
  <p>Single Key enable : ${single_key}, ${single}</p>
  <p>-----Offline Configuration-----</p>
  <p>-----CONFIG-----</p>
  <p>Switchen: ${data_switchen}</p>
  <p>POSMODE: ${data_posmode1}</p>
  <p>GNSSEN: ${data_GNSSEN1}</p>
  <p>DR: ${data_dreal}</p>
  <p>-----CONFIG-----</p>
  <p>HeartBeat: ${value_data_HB_dsml} min</p>
  <p>BLEPRI: ${value_datablepri_min} min</p>
  <p>DIV: ${data_div_dsml}</p>
  <p>BLEEN: ${data_BLEEN_dsml}</p>
  <p>Bluetooth Positioning Beacon UUID: ${potioning_uuid}</p>
  <p>Accelerometer threshold : ${value_gsensor}</p>
  <p>VER : ${data_ver1}</p>
  <p>-----CFMMSG FIELD-----</p>
  <p>CFMMSG : ${data_cfmmsg2}</p>
  <p>HBCOUNT : ${data_hbcount2}</p>
  <p>-----CFMMSG FIELD-----</p>
  <p>-----ASSET BEACON REPORT FIELD-----</p>
  <p>Bluetooth Receiving Period : ${data_bluetooth2} min</p>
  <p>Bluetooth Receiving Duration : ${data_bluetooth_receive2} s</p>
  <p>Asset Beacon Report interval : ${value_asset_beacon1} min</p>
  <p>Asset Beacon UUID : ${data_asset_beacon_uuid}</p>
  <p>-----ASSET BEACON REPORT FIELD-----</p>
  <p>Shock Detection Threshold  : ${value_shock}</p> 
  <p>shock detection report period  : ${value_period} minutes</p>
  <p>Interval GNSSPRI  : ${value_interval} minutes</p> 
  `;
 }
}

document.addEventListener('DOMContentLoaded', function () {
  map = L.map('map').setView([0, 0], 13);

  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  });


function tampilkandataultra() {
  const payload5 = document.getElementById("payload").value;
  const bytes = [];
  
  for (let i = 0; i < payload5.length; i += 2) {
    bytes.push(parseInt(payload5.substr(i, 2), 16));
  }

  const lengthOfBytes = bytes.length;
  var sensorData = {};
  var meterReading = 0.0;
  var pointer = 0;
  var prepaymentValue = '';

  while (pointer < lengthOfBytes) {
    var type = bytes[pointer] >> 2;
    var length = 1 << (bytes[pointer] & 0x03);
    pointer++;

    if (type == 1) {
      
      if (length == 2) {
        meterReading = bytes[pointer] << 8 | bytes[pointer + 1];
        sensorData["TS"] = meterReading.toString();
        pointer = pointer + length;
      } else {
        meterReading = bytes[pointer] << 24 | bytes[pointer + 1] << 16 | bytes[pointer + 2] << 8 | bytes[pointer + 3];
        sensorData["TS"] = meterReading.toString();
        pointer = pointer + length;
      }
    } else if (type == 2) {
      lowBattery = (bytes[pointer] & 0x40) >> 6;
      sensorData["AS"] = lowBattery.toString();
      pointer = pointer + length;

    } else if (type == 3) {

      battery = bytes[pointer] & 0x7f;
      valveStatus = bytes[pointer] >> 7;

      sensorData["BL"] = battery.toString();
      sensorData["VS"] = valveStatus.toString();
      pointer = pointer + length;

    } else if (type == 10 || type == 11) {

      latchTimestamp = new Date((bytes[pointer] << 24 | bytes[pointer + 1] << 16 | bytes[pointer + 2] << 8 | bytes[pointer + 3]) * 1000);
      latchTimestamp = new Date(latchTimestamp);

      sensorData["DT"] = latchTimestamp.toISOString();
      pointer = pointer + length;

    } 
    else if (type == 4) {
      if (bytes[pointer] == 0x10 || bytes[pointer] == 0x12) {
        length = 4;
      } else if (bytes[pointer] == 0x14) {
        length = 1;
      }

      if (length === 4) {
        const valueBytes = bytes.slice(pointer, pointer + 4);
        prepaymentValue = parseInt(valueBytes.map(byte => byte.toString(16).padStart(2, '0')).join(''), 16) / 1000; // Konversi ke desimal
        prepaymentValue = prepaymentValue.toFixed(3);
      } else if (length === 1) {
        const valueByte = bytes[pointer + 0];
        prepaymentValue = valueByte / 1000;
        prepaymentValue = prepaymentValue.toFixed(3);
      }
      pointer = pointer + length + 1;
    }
     else  {
      pointer = pointer + length;  
    }
  }

  document.getElementById("hasilData").innerHTML = `
    <p>Meter Reading: ${sensorData["TS"] + "m³"}</p>
    <p>LowBattery: ${sensorData["AS"]}</p>
    <p>Battery: ${sensorData["BL"]}</p>
    <p>Valve Status: ${sensorData["VS"]}</p>
    <p>Prepayment : ${prepaymentValue}</p>
    <p>Timestamp: ${sensorData["DT"]}</p>
  `;
}

function tampilkandataltek(){
  const payload6 = document.getElementById("payload").value;
  const bufferLength3 = 4; // Set buffer length per value (4 bytes for UInt32, 2 bytes for UInt16)
  let offset3 = 0;

  const serialNumber2 = payload6.slice(2, 16).toString('hex');
  const reversedSerialNumber2 = reverseString(serialNumber2); // Memanggil fungsi reverseString() untuk membalikkan Serial Number
  offset3 += bufferLength3 * 2;
  const forwardFlow = payload6.slice(16, 24);
  const reversedFlow = reverseString(forwardFlow);
  const forwardfloww = parseInt(reversedFlow, 16);
  const forwardFlowWithDecimal = (forwardfloww  / 1000).toFixed(3); 
  offset3 += bufferLength3 * 2;
  const history1 = payload6.slice(24, 32);
  const reversedflow1 = reverseString(history1);
  const history11 = parseInt(reversedflow1, 16);
  const history11decimal = (history11 / 1000).toFixed(3);
  offset3 += bufferLength3 * 2;
  const timestamp = payload6.slice(34, 48);
  const reversetimestamp = reverseString(timestamp);
  const day = parseInt(reversetimestamp.slice(6, 8), 16); // Ambil nilai hari dari indeks 6 sampai 8
  const month = parseInt(reversetimestamp.slice(4, 6), 16); // Ambil nilai bulan dari indeks 4 sampai 6
  const year = parseInt(reversetimestamp.slice(0, 4), 16); // Ambil nilai tahun dari indeks 0 sampai 4
  const hour = parseInt(reversetimestamp.slice(8, 10), 16);
  const minute = parseInt(reversetimestamp.slice(10, 12), 16);
  const second = parseInt(reversetimestamp.slice(12, 14), 16);
  const battery = payload6.slice(54, 56);
  const reverseuploadbattery = reverseString(battery);
  const batteryy = parseInt(reverseuploadbattery, 16) /10;
  const batteryy3 = Math.round((0.75 - (3.6 - batteryy)) / 0.75) * 100

  document.getElementById("hasilData").innerHTML = `
    <p>Serial Number: ${reversedSerialNumber2}</p>
    <p>Forward Flow: ${forwardFlowWithDecimal} m³</p>
    <p>Reverse Flow: ${history11decimal} m³</p>
    <p>TimeStamp: ${getDayWithOrdinal(day)} ${getNamaBulan(month)} ${year}, ${addLeadingZero(hour)}:${addLeadingZero(minute)}:${addLeadingZero(second)}</p>
    <p>Battery: ${batteryy3.toFixed(2)} %</p>
  `;

}

function tampilkanDataSWL(){
  const payload7 = document.getElementById("payload").value;

  const hexToDecimal = hex => parseInt(hex, 16);
  const battery = payload7.slice(1, 2);
  const distance = payload7.slice(7, 8);
  const distance1 = payload7.slice(1,2);
  var output14 = "";
  var output15 = "";
  var output16 = "";
if (battery === "1") {
  const baterai1 = payload7.slice(4, 6);
  const nbaterai = hexToDecimal(baterai1);
  output14 = nbaterai;
  //console.log("Baterai = " + nbaterai + "%");
}

if (distance === "3") {
  const jarak = payload7.slice(10, 12);
  const njarak = hexToDecimal(jarak);
  output15 = njarak;
 // console.log("Jarak = " + njarak + "cm");
}

if (distance1 == "3") {
  const jarak1 = payload7.slice(4, 6)
  const njarak1 = hexToDecimal(jarak1)
  output16 = njarak1;
  //console.log("jarak = " + njarak1 + "cm")
}

document.getElementById("hasilData").innerHTML = `
    <p>Baterai : ${output14} %</p>
    <p>Jarak : ${output15} cm</p>
    <p>Jarak1 : ${output16} cm</p>
  `;

}
function tampilkandatabarindo(){
  const hexString = document.getElementById("payload").value;
  reportType = hexString.substring(0, 2);
  soft = hexString.substring(4, 6);
  csq =  hexString.substring(6, 8);
  battery = hexString.substring(8, 10);
  dateTime = hexString.substring(10, 22);
  const year = dateTime.substring(10, 12);
  const month = dateTime.substring(8, 10);
  const day = dateTime.substring(6, 8);
  const hour = dateTime.substring(4, 6);
  const minute = dateTime.substring(2, 4);
  const second = dateTime.substring(0, 2);
  const formattedTime = new Date(`20${year}`, month - 1, day, hour, minute, second);
  const formattedTimeString = formattedTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');

  cumulative1 = hexString.substring(22, 26);
  const reversedHexString1 = cumulative1.match(/.{2}/g).reverse().join('');
  const integerValue1 = parseInt(reversedHexString1, 16);

  cumulative2 = hexString.substring(26, 30);
  const reversedHexString2 = cumulative2.match(/.{2}/g).reverse().join('');
  const integerValue2 = parseInt(reversedHexString2, 16);

  cumulative3 = hexString.substring(30, 34);
  const reversedHexString3 = cumulative3.match(/.{2}/g).reverse().join('');
  const integerValue3 = parseInt(reversedHexString3, 16);

  cumulative4 = hexString.substring(34, 38);
  const reversedHexString4 = cumulative4.match(/.{2}/g).reverse().join('');
  const integerValue4 = parseInt(reversedHexString4, 16); 

  cumulative5 = hexString.substring(38, 42);
  const reversedHexString5 = cumulative5.match(/.{2}/g).reverse().join('');
  const integerValue5 = parseInt(reversedHexString5, 16);

  cumulative6 = hexString.substring(42, 46);
  const reversedHexString6 = cumulative6.match(/.{2}/g).reverse().join('');
  const integerValue6 = parseInt(reversedHexString6, 16);
  
  deviceNo = hexString.substring(62, 76);
  deviceMac = hexString.substring(76, 84);
  dataVersion = hexString.substring(84, 86);

  document.getElementById("hasilData").innerHTML = `
    <p>Report Type : ${reportType}</p>
    <p>Software : ${soft}</p>
    <p>csq : ${csq}</p>
    <p>Battery : ${battery / 10} V</p>
    <p>Date time : ${formattedTimeString}</p>
    <p>cumulant1 : ${integerValue1}m³</p>
    <p>cumulant2 : ${integerValue2}m³</p>
    <p>cumulant3 : ${integerValue3}m³</p>
    <p>cumulant4 : ${integerValue4}m³</p>
    <p>cumulant5 : ${integerValue5}m³</p>
    <p>cumulant6 : ${integerValue6}m³</p>        
    <p>Data Version : ${dataVersion}</p>
    <p>Device No : ${deviceNo}</p>
    <p>deviceMac : ${deviceMac}</p>
  `;

}

function tampilkanhasil() {
  const payhb = document.getElementById("heartbeat").value;
  const dtk_payhb = (payhb * 60) / 30
  const hex_dtk_payhb = dtk_payhb.toString(16).padStart(4, '0').toUpperCase();
  const paypos = document.getElementById("POS").value;
  const dtk_paypos = (paypos * 60) / 5
  const hex_dtk_paypos = dtk_paypos.toString(16).padStart(4, '0').toUpperCase();
  const payBLEPRI = document.getElementById("BLEPRI").value
  const dtk_BLEPRI = (payBLEPRI * 60) / 5
  const hex_dtk_BLEPRI = dtk_BLEPRI.toString(16).padStart(4, '0').toUpperCase();
  const paymode = document.getElementById("mode").value;
  var output17 = ""
  if (paymode == "0") {
    output17 = "9"
  } else if (paymode == "1") {
    output17 = "B"
  } else if (paymode == "2") {
    output17 = "D"
  }
  const DIV_Field = "00";
  const FBR_Field = "01";
  const G_sensor = "0A";
  const Bluetooth_UUID = document.getElementById("UUID").value;
  const Bluetooth_UUID1 = Bluetooth_UUID.padStart(32, '0')

  const header_asset = "C0";
  const payperiod = document.getElementById("Beacon_period").value;
  const nilai_period = payperiod / 1
  const hex_period = nilai_period.toString(16).padStart(2, '0').toUpperCase();
  const payreceiving = document.getElementById("Bluetooth_period").value;
  const hex_nilai_receiving = payreceiving.toString(16).padStart(2, '0').toUpperCase();
  const payreport = document.getElementById("Asset_Report").value;
  const nilai_report = (payreport * 60) / 10
  const hex_nilai_report = nilai_report.toString(16).padStart(2, '0').toUpperCase();
  const asset_UUID = document.getElementById("Asset_UUID").value;
  const Bluetooth_UUID2 = asset_UUID.padStart(32, '0')

  
  document.getElementById("hasilData").innerHTML = `
    <p>Tracker Downlink : 9${output17}${hex_dtk_payhb}${hex_dtk_BLEPRI}${DIV_Field}${FBR_Field}${Bluetooth_UUID1}${G_sensor}${hex_dtk_paypos}</p>
    <p>Asset Downlink : ${header_asset}${hex_period}${hex_nilai_receiving}${hex_nilai_report}${Bluetooth_UUID2}</p>
  `;
}


function reverseString(str) {
  return str.match(/.{2}/g).reverse().join('');
}

function getNamaBulan(month) {
  const namaBulan = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return namaBulan[month - 1];
}

function getDayWithOrdinal(day) {
  const suffixes = ["th", "st", "nd", "rd"];
  const relevantDigits = (day % 100 > 10 && day % 100 < 14) ? 0 : day % 10;
  return day + (suffixes[relevantDigits] || suffixes[0]);
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function hapus(){
  var inputPayload = document.getElementById("payload");
      inputPayload.value = "";
  var inputHB = document.getElementById("heartbeat");
      inputHB.value = "";
  var inputBLEPRI = document.getElementById("BLEPRI");
      inputBLEPRI.value = "";
  var inputmode = document.getElementById("mode");
      inputmode.value = "";
  var inputpos = document.getElementById("POS");
      inputpos.value = "";
  var inputuuid = document.getElementById("UUID");
      inputuuid.value = "";
  var inputperiod = document.getElementById("Beacon_period");
      inputperiod.value = "";
  var inputblp = document.getElementById("Bluetooth_period");
      inputblp.value = "";
  var inputasset = document.getElementById("Asset_Report");
      inputasset.value = "";
  var inputasuuid = document.getElementById("Asset_UUID");
      inputasuuid.value = "";
  document.getElementById("hasilData").innerHTML = `
    `;
    map.removeLayer(marker)
}

function kembali(){
  document.getElementById("Mode-container").style.display = "none";
  document.getElementById("BLEPRI-container").style.display = "none";
  document.getElementById("heartbeat-container").style.display = "none";
  document.getElementById("POS-container").style.display = "none";
  document.getElementById("btn_kembali").style.display = "none"
  document.getElementById("UUID-container").style.display="none";
  document.getElementById("Tracker").style.display="none";
  document.getElementById("Beacon-Period-container").style.display="none";
  document.getElementById("Asset_beacon").style.display="none";
  document.getElementById("btn_hasil").style.display = "none";
  document.getElementById("Bluetooth-receiving-container").style.display = "none";
  document.getElementById("Asset-Report-container").style.display = "none";
  document.getElementById("Asset-UUID-container").style.display = "none";
  document.getElementById("hasilData").innerHTML = `
    `;
}

function tampilkanFormDownlink() {
  // Menampilkan elemen-elemen heartbeat dan asset beacon
  document.getElementById("Mode-container").style.display = "block";
  document.getElementById("BLEPRI-container").style.display = "block";
  document.getElementById("heartbeat-container").style.display = "block";
  document.getElementById("POS-container").style.display = "block";
  document.getElementById("btn_kembali").style.display = "block";
  document.getElementById("Tracker").style.display="block";
  document.getElementById("UUID-container").style.display="block";
  document.getElementById("Beacon-Period-container").style.display="block";
  document.getElementById("Asset_beacon").style.display="block";
  document.getElementById("btn_hasil").style.display = "block";
  document.getElementById("Bluetooth-receiving-container").style.display = "block";
  document.getElementById("Asset-Report-container").style.display = "block";
  document.getElementById("Asset-UUID-container").style.display = "block";
}


/*
function pasteFromClipboard() {
  // Mengecek apakah browser mendukung fitur clipboard API
  if (navigator.clipboard) {
    // Meminta akses ke clipboard
    navigator.clipboard.readText()
      .then(function (text) {
        // Menyisipkan teks dari clipboard ke elemen yang Anda inginkan
        var targetElement = document.getElementById('payload'); // Ganti 'targetElement' dengan ID elemen target Anda
        targetElement.value = text; // Menggunakan .value jika elemen adalah input atau textarea
      })
      .catch(function (err) {
        console.error('Gagal mempaste dari clipboard: ', err);
      });
  } else {
    console.error('Browser tidak mendukung clipboard API.');
  }
}
*/