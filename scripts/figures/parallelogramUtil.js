function isParallelogram(vertices) {
    const A = vertices[0]
    const B = vertices[1]
    const C = vertices[2]
    const D = vertices[3]

    const AB = [B[0] - A[0], B[1] - A[1]]
    const BC = [C[0] - B[0], C[1] - B[1]]
    const CD = [D[0] - C[0], D[1] - C[1]]
    const DA = [A[0] - D[0], A[1] - D[1]]

    const sidesEqual = (vec1, vec2) =>
        Math.sqrt(vec1[0] ** 2 + vec1[1] ** 2) === Math.sqrt(vec2[0] ** 2 + vec2[1] ** 2)
    if (!sidesEqual(AB, CD) || !sidesEqual(BC, DA)) {
        return false
    }

    const areParallel = (vec1, vec2) =>
        vec1[0] * vec2[1] - vec1[1] * vec2[0] === 0

    return !(!areParallel(AB, CD) || !areParallel(BC, DA));
}

function calculateFourthPoint(vertices) {
    const A = vertices[0]
    const B = vertices[1]
    const C = vertices[2]

    return [+A[0] + +C[0] - B[0], +A[1] + +C[1] - B[1], 1]
}