let isPalindrome = (message: string): boolean => {
    var re = /[\W_]/g;
    var lowRegMessage = message.toLowerCase().replace(re, '');
    var reverseMessage = lowRegMessage.split('').reverse().join('');
    return lowRegMessage === reverseMessage;
}

export default isPalindrome;