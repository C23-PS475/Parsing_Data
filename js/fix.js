const msg = "68640087000000080d5e3c4401FF0001A682B546DE10AC4EC7615E56B4201297901F0E303030323032313034323230393200540052901E30361211034A59150818052300010130680D1F000000000049071F0025F506000000000000000000000000000000000000000000000000000000000000000000000000000001000000455F0500000023";
const mac = msg.substring(5, 29)

const dataStr = msg.substring(106);
const dataIdentify = dataStr.substring(0, 4);

if (dataIdentify === "901E") {
    const payload = msg.substring(64);
    if (payload.length < 180) {
        console.log("Exception: Valid data length is abnormal");
        return new Result("Data exception", msg);
    }
    const dataVersion = payload.substring(204, 206);
    const alarmOrigin = payload.substring(192, 194);
    if (dataVersion.toUpperCase() === "23") {
        const setDataVersion = dataVersion
        const setCsq = payload.substring(46, 48);
        const setBattery = payload.substring(48, 50);
        const setBattery_dec = (setBattery/10).toFixed(1);
        const setSoft = payload.substring(50, 52);
        const setHard = payload.substring(52, 54);
        const setAlarmOrigin = alarmOrigin;
        const setAlarmDuration = parseInt(msg.substring(196, 198) + msg.substring(194, 196), 16);

        //setdevice
        const setDeviceTime = payload.substring(58, 70);
        const year = setDeviceTime.substring(10, 14);
        const year_fix = (20 + year);
        const month = setDeviceTime.substring(8, 10);
        const day = setDeviceTime.substring(6, 8);
        const hour = setDeviceTime.substring(4, 6);
        const minute = setDeviceTime.substring(2, 4);
        const second = setDeviceTime.substring(0, 2);
        const date = new Date(year_fix, month - 1, day, hour, minute, second);
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        
        const setStatusOrigin = payload.substring(70, 74);
        const setProductType = payload.substring(74, 76);
        const setWaterUnit = payload.substring(76, 78);

        //setSurplus
        const setSurplus = payload.substring(86, 94);
        const setSurplus_mirror = reverseString(setSurplus);
        const setSurplus_dec = parseInt(setSurplus_mirror,16);

        //cumulant
        const setCumulant = payload.substring(78, 86);
        const setCumulant_mirror = reverseString(setCumulant);
        const setCumulant_dec = parseInt(setCumulant_mirror,16).toFixed(2);

        //cumulant1
        const setCumulant1 = payload.substring(94, 102);
        const setCumulant1_mirror = reverseString(setCumulant1);
        const setCumulant1_dec = parseInt(setCumulant1_mirror,16).toFixed(2);

        //cumulant2
        const setCumulant2 = payload.substring(102, 110);
        const setCumulant2_mirror = reverseString(setCumulant2);
        const setCumulant2_dec = parseInt(setCumulant2_mirror,16).toFixed(2);

        //cumulant3
        const setCumulant3 = payload.substring(110, 118);
        const setCumulant3_mirror = reverseString(setCumulant3);
        const setCumulant3_dec = parseInt(setCumulant3_mirror,16).toFixed(2);

        //cumulant4
        const setCumulant4 = payload.substring(118, 126);
        const setCumulant4_mirror = reverseString(setCumulant4);
        const setCumulant4_dec = parseInt(setCumulant4_mirror,16).toFixed(2);

        //cumulant5
        const setCumulant5 = payload.substring(126, 134);
        const setCumulant5_mirror = reverseString(setCumulant5);
        const setCumulant5_dec = parseInt(setCumulant5_mirror,16).toFixed(2);

        //cumulant6
        const setCumulant6 = payload.substring(134, 142);
        const setCumulant6_mirror = reverseString(setCumulant6);
        const setCumulant6_dec = parseInt(setCumulant6_mirror,16).toFixed(2);

        //cumulant7
        const setCumulant7 = payload.substring(142, 150);
        const setCumulant7_mirror = reverseString(setCumulant7);
        const setCumulant7_dec = parseInt(setCumulant7_mirror,16).toFixed(2);

        //cumulant8
        const setCumulant8 = payload.substring(158, 166);
        const setCumulant8_mirror = reverseString(setCumulant8);
        const setCumulant8_dec = parseInt(setCumulant8_mirror,16).toFixed(2);

        //cumulant9
        const setCumulant9 = payload.substring(150, 158);
        const setCumulant9_mirror = reverseString(setCumulant9);
        const setCumulant9_dec = parseInt(setCumulant9_mirror,16).toFixed(2);

        //cumulant10
        const setCumulant10 = payload.substring(166, 174);
        const setCumulant10_mirror = reverseString(setCumulant10);
        const setCumulant10_dec = parseInt(setCumulant10_mirror,16).toFixed(2);

        console.log(
            "Original Data : " + msg
            +"\nData Version : " + dataVersion 
            + "\nMac : " + mac 
            + "\ncsq : " + setCsq
            + "\nBattery : " + setBattery_dec
            + "\nSoft : " + setSoft
            + "\nHard : " + setHard
            + "\nDevice Time : " + formattedDate
            + "\nstatusOrigin : " + setStatusOrigin
            + "\nProduct Type : " + setProductType
            + "\nWater Unit : " + setWaterUnit
            + "\ncumulant : " + setCumulant_dec
            + "\ncumulant1 : " + setCumulant1_dec
            + "\ncumulant2 : " + setCumulant2_dec
            + "\ncumulant3 : " + setCumulant3_dec
            + "\ncumulant4 : " + setCumulant4_dec
            + "\ncumulant5 : " + setCumulant5_dec
            + "\ncumulant6 : " + setCumulant6_dec
            + "\ncumulant7 : " + setCumulant7_dec
            + "\ncumulant8 : " + setCumulant8_dec
            + "\ncumulant9 : " + setCumulant9_dec
            + "\ncumulant10 : " + setCumulant10_dec
            + "\nAlarm Origin : " + setAlarmOrigin
            + "\nAlarm Duration : " + setAlarmDuration
            + "\nData Version : " + setDataVersion
            + "\nSurplus : " + setSurplus_dec);

        return;
    }
}

function reverseString(str) {
    return str.match(/.{2}/g).reverse().join('');
  }
