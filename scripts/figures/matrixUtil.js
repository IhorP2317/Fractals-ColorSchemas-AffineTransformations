function matrixMultiply(a, b) {
    if (a[0].length !== b.length) {
        throw new Error('The number of columns in the first matrix must be equal to the number of rows in the second matrix.');
    }

    const result = new Array(a.length).fill(0).map(() => new Array(b[0].length).fill(0));

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < b.length; k++) {
                sum = +sum + (+a[i][k] * +b[k][j]);
            }
            result[i][j] = sum;
        }
    }
    return result;
}