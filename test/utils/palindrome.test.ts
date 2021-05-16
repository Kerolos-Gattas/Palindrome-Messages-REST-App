import isPalindrome from '../../src/utils/palindrome';
import { expect } from 'chai';

describe("palindrome tests", () => {
    it("isPlandirome should return false when the text is not a plaindrome", async () => {
        // arrange
        const result = isPalindrome('Not a plaindrome');

        // assert
        expect(result).false;
    });

    it("isPlandirome should return true when the text is a plaindrome", async () => {
        // arrange
        const result = isPalindrome('race car');

        // assert
        expect(result).true;
    });

    it("isPlandirome should return true when the text is a plaindrome even with extra characters", async () => {
        // arrange
        const result = isPalindrome('0_0 (: /- :) 0–0');

        // assert
        expect(result).true;
    });
});