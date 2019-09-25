import { getRecommendBundle, makesAppropriateBundle, isAnswerSatisfyAllRules } from './baiso2';

describe('baiso2', () => {
  describe('getRecommendBundle', () => {
    test('should return 0 if answers is Age < 18', () => {
      const answer = {
        age: 15
      };

      const result = getRecommendBundle(answer);

      expect(result).toBe(0);
    });

    test('should return 0 if answers is Age: 16, Student: yes, Income: 0', () => {
      const answer = {
        age: 16,
        isStudent: true,
        income: 0
      };

      const result = getRecommendBundle(answer);

      expect(result).toBe(0);
    });

    test('should return 1 if answers is Age > 17 & Income > 0', () => {
      const answer = {
        age: 18,
        income: 1
      };

      const result = getRecommendBundle(answer);

      expect(result).toBe(1);
    });

    test('should return 2 if answers is Income > 12000 & Age > 17', () => {
      const answer = {
        age: 30,
        income: 12001
      };

      const result = getRecommendBundle(answer);

      expect(result).toBe(2);
    });

    test('should return 3 if answers is Income > 40000 & Age > 17', () => {
      const answer = {
        age: 18,
        isStudent: true,
        income: 40001
      };

      const result = getRecommendBundle(answer);

      expect(result).toBe(3);
    });
  });

  describe('makesAppropriateBundle', () => {
    test('should change Student Account to Junior Saver Account', () => {
      const answer = {
        age: 15,
        income: undefined,
        isStudent: true
      };
      const bundle = {
        products: ["Student Account", "Debit Card", "Credit Card"]
      }

      const result = makesAppropriateBundle(answer, bundle);

      expect(result).toEqual({
        products: [ 'Junior Saver Account' ]
      });
    });

    test('should upgrade to maximum bundle', () => {
      const answer = {
        age: 18,
        income: 40001,
        isStudent: true
      };
      const bundle = {
        products: ["Student Account"]
      }

      const result = makesAppropriateBundle(answer, bundle);

      expect(result).toEqual({
        products: [ 'Current Account Plus', 'Debit Card', 'Gold Credit Card' ]
      });
    });

    test('should upgrade Credit Card to Gold Credit Card', () => {
      const answer = {
        age: 18,
        income: 40001,
        isStudent: true
      };
      const bundle = {
        products: ['Current Account Plus', 'Debit Card', 'Credit Card']
      }

      const result = makesAppropriateBundle(answer, bundle);

      expect(result).toEqual({
        products: [ 'Current Account Plus', 'Debit Card', 'Gold Credit Card' ]
      });
    });

    test('should remove Credit Card', () => {
      const answer = {
        age: 18,
        income: 1,
        isStudent: true
      };
      const bundle = {
        products: ['Current Account', 'Debit Card', 'Credit Card']
      }

      const result = makesAppropriateBundle(answer, bundle);

      expect(result).toEqual({
        products: [ 'Current Account', 'Debit Card' ]
      });
    });

    test('should return failed reason', () => {
      const answer = {
        age: 30,
        income: 0,
        isStudent: true
      };
      const bundle = {
        products: ['Current Account', 'Debit Card', 'Credit Card']
      }

      const result = makesAppropriateBundle(answer, bundle);

      expect(result).toEqual({
        failedReason: [ 'income' ]
      });
    });
  });
});
