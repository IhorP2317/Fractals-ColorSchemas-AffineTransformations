class Rectangle {
    verticesMatrix;

    constructor(vertices) {
        this.verticesMatrix = vertices;
    }

    applyTransformation(transformationMatrix) {
        this.verticesMatrix = matrixMultiply(this.verticesMatrix, transformationMatrix);
    }

    getTranslateMatrix(dx, dy) {
        return [
            [1, 0, 0],
            [0, 1, 0],
            [+dx, +dy, 1],
        ];
    }

    getCenter() {
        const x = Math.abs(this.verticesMatrix[0][0] + this.verticesMatrix[2][0]) / 2;
        const y = (this.verticesMatrix[0][1] + this.verticesMatrix[2][1]) / 2;
        return [x, y];
    }

    getScaleMatrix(sx, sy) {
        return [
            [sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1],
        ];
    }

    getRotateMatrix(angleDegree) {
        const angle = (angleDegree * Math.PI) / 180;
        return [
            [Math.cos(angle), Math.sin(angle), 0],
            [-Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1],
        ];
    }

    scaleFromCenter(sx, sy) {
        const center = this.getCenter();
        let matrix = this.getTranslateMatrix(-center[0], -center[1]);
        matrix = matrixMultiply(matrix, this.getScaleMatrix(sx, sy));
        matrix = matrixMultiply(matrix, this.getTranslateMatrix(center[0], center[1]));
        this.applyTransformation(matrix);
    }

    rotateFromCenter(angle) {
        const center = this.getCenter();;
        let matrix = this.getTranslateMatrix(-center[0], -center[1]);
        matrix = matrixMultiply(matrix, this.getRotateMatrix(angle));
        matrix = matrixMultiply(matrix, this.getTranslateMatrix(center[0], center[1]))
        this.applyTransformation(matrix);
    }

    scaleRotateAndMove(sx, sy, angle, x, y) {
        const center = this.getCenter();
        let matrix = this.getTranslateMatrix(-center[0], -center[1]);
        matrix = matrixMultiply(matrix, this.getScaleMatrix(sx, sy));
        matrix = matrixMultiply(matrix, this.getTranslateMatrix(x,y))
        matrix = matrixMultiply(matrix, this.getRotateMatrix(angle));
        matrix = matrixMultiply(matrix, this.getTranslateMatrix(center[0], center[1]));
        this.applyTransformation(matrix);
    }

    get vertices() {
        return this.verticesMatrix;
    }

}

