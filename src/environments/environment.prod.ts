import * as CryptoJS from 'crypto-js';

export const environment = {
    production: true,
    theme: 'black',
    blackThemeBrandColor: '#0AADC8',
    blackThemePieChartTrackColor: '#252c32',

    blueThemeBrandColor: '#252c32',
    blueThemePieChartTrackColor: '#eeeeee',
    serverUrl: 'http://ec2-3-15-116-184.us-east-2.compute.amazonaws.com:9090/cybernetix',
    encryptionParsePhrase: '6726376763767452',
    kibanaLink: 'http://ec2-3-15-116-184.us-east-2.compute.amazonaws.com:5601',

    API_KEY: CryptoJS.enc.Utf8.parse('123456$#@$^@ANIL'),
    API_CIPHER: CryptoJS.CipherOption = {
        keySize: 128 / 8,
        iv: CryptoJS.enc.Utf8.parse('123456$#@$^@ANIL'),  // Initialization Vector
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }
};

/* export var key = CryptoJS.enc.Utf8.parse('123456$#@$^@ANIL');
export var cipherOptions: CryptoJS.CipherOption = {
    keySize: 128 / 8,
    iv: CryptoJS.enc.Utf8.parse('123456$#@$^@ANIL'),  // Initialization Vector
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
} */