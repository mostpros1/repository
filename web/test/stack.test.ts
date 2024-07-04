import { sum }  from "../sum.ts";

describe('App', () => {
    it('should work as expected', () => {
        expect(sum(1, 1)).toBe(2);
    });
});