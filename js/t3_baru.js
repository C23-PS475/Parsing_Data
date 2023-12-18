const payload = "6F030811170070895201000000006089520150895201408952012B05000604090503E407000023A8"
  const bufferLength = 4;
  let offset = 0;

  const serialNumber = payload.slice(2, 12).toString('hex');
  const reversedSerialNumber = reverseString(serialNumber);
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
      batteryy2 = (((1.85 - (3.7 - batteryy)) / 1.85) * 100);
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

  console.log("Serial Number:", reversedSerialNumber)
  console.log("Forward flow:", forwardFlowWithDecimal)
  console.log("baterai:", batteryy2 + "%")
  console.log("history2: ", history22decimal)
  console.log("Timestamp: ", getDayWithOrdinal(day), getNamaBulan(month), year, addLeadingZero(hour) + ":", addLeadingZero(minute) + ":", addLeadingZero(second))
 

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