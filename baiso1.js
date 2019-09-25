const MAX_ROTATE_REACH_360 = 4;

const rotateRightSwapper90 = (bitmap, i, j) => {
  const n = bitmap.length;
  const temp = bitmap[i][j];

  bitmap[i][j] = bitmap[n - j - 1][i]; // left
  bitmap[n - j - 1][i] = bitmap[n - i - 1][n - j - 1]; // bottom
  bitmap[n - i - 1][n - j - 1] = bitmap[j][n - i - 1]; // right
  bitmap[j][n - i - 1] = temp;
}

const rotateRightSwapper180 = (bitmap, i, j) => {
  const n = bitmap.length;

  let temp = bitmap[i][j];
  bitmap[i][j] = bitmap[n - i - 1][n - j - 1];
  bitmap[n - i - 1][n - j - 1] = temp;

  temp = bitmap[n - j - 1][i];
  bitmap[n - j - 1][i] =  bitmap[j][n - i - 1];
  bitmap[j][n - i - 1] = temp;
}

const rotateLeftSwapper90 = (bitmap, i, j) => {
  const n = bitmap.length;
  const temp = bitmap[i][j];

  bitmap[i][j] = bitmap[j][n - i - 1]; // right
  bitmap[j][n - i - 1] = bitmap[n - i - 1][n - j - 1]; // bottom
  bitmap[n - i - 1][n - j - 1] = bitmap[n - j - 1][i]; // left
  bitmap[n - j - 1][i] = temp;
}

const swappers = [ rotateRightSwapper90, rotateRightSwapper180, rotateLeftSwapper90 ];

const rotateBitmapToRight = ( bitmap, k ) => {
  const n = bitmap.length;
  const maxColumnIndex = Math.ceil(n/2);
  const maxRowIndex = Math.floor(n/2);
  const actualK = k % MAX_ROTATE_REACH_360;

  if(actualK === 0) {
    return;
  }

  const swapper = swappers[actualK - 1];

  for(let i=0; i < maxRowIndex; i++) {
    for(let j=0; j < maxColumnIndex; j++) {
      swapper(bitmap, i, j);
    }
  }
}

export { rotateBitmapToRight };
