let isPalindrome = (txt: string): boolean => {
    var re = /[\W_]/g;
    var lowRegtxt = txt.toLowerCase().replace(re, '');
    var reversetxt = lowRegtxt.split('').reverse().join('');
    return lowRegtxt === reversetxt;
}

export default isPalindrome;