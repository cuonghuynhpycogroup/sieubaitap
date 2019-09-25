import { rotateBitmapToRight } from './baiso1';

describe('baiso1', () => {
  test('rotate to the right 1 time with 3x3 bitmap', () => {
    const bitmap = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    rotateBitmapToRight(bitmap, 1);

    expect(bitmap).toEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ]);
  });

  test('rotate to the right 2 times with 3x3 bitmap', () => {
    const bitmap = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    rotateBitmapToRight(bitmap, 2);

    expect(bitmap).toEqual([
      [9, 8, 7],
      [6, 5, 4],
      [3, 2, 1],
    ]);
  });

  test('rotate to the right 3 times with 3x3 bitmap', () => {
    const bitmap = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    rotateBitmapToRight(bitmap, 3);

    expect(bitmap).toEqual([
      [3, 6, 9],
      [2, 5, 8],
      [1, 4, 7],
    ]);
  });

  test('rotate to the right 4 times with 3x3 bitmap', () => {
    const bitmap = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    rotateBitmapToRight(bitmap, 4);

    expect(bitmap).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  test('rotate to the right 400000001 times with 3x3 bitmap', () => {
    const bitmap = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    rotateBitmapToRight(bitmap, 400000001);

    expect(bitmap).toEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ]);
  });

  test('rotate to the right 1 time with 4x4 bitmap', () => {
    const bitmap = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    rotateBitmapToRight(bitmap, 1);

    expect(bitmap).toEqual([
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
      [16, 12, 8, 4],
    ]);
  });

  test('rotate to the right 2 times with 4x4 bitmap', () => {
    const bitmap = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    rotateBitmapToRight(bitmap, 2);

    expect(bitmap).toEqual([
      [16, 15, 14, 13],
      [12, 11, 10, 9],
      [8, 7, 6, 5],
      [4, 3, 2, 1],
    ]);
  });

  test('rotate to the right 3 times with 4x4 bitmap', () => {
    const bitmap = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    rotateBitmapToRight(bitmap, 3);

    expect(bitmap).toEqual([
      [4, 8, 12, 16],
      [3, 7, 11, 15],
      [2, 6, 10, 14],
      [1, 5, 9, 13],
    ]);
  });

  test('rotate to the right 4 times with 4x4 bitmap', () => {
    const bitmap = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    rotateBitmapToRight(bitmap, 4);

    expect(bitmap).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ]);
  });

  test('rotate to the right 400000001 times with 4x4 bitmap', () => {
    const bitmap = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    rotateBitmapToRight(bitmap, 400000001);

    expect(bitmap).toEqual([
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
      [16, 12, 8, 4],
    ]);
  });
});
