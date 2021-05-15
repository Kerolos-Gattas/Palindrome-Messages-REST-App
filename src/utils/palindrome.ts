let isPalindrome = (message: string): boolean => {
    var re = /[\W_]/g;
    var lowRegMessage = message.toLowerCase().replace(re, '');
    console.log(lowRegMessage);
    var reverseMessage = lowRegMessage.split('').reverse().join('');
    console.log(reverseMessage);
    console.log(message);
    console.log(message === reverseMessage);
    return lowRegMessage === reverseMessage;
}

export default isPalindrome;