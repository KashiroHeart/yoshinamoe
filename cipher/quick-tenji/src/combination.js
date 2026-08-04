/* Source from ChatGPT knowledge; Thank you */

function findCombinations(target, currentSum, currentCombination, combinations) {
    if (currentSum === target) {
        combinations.push(currentCombination.slice()); // Push a copy of the current combination
        return;
    }

    if (currentSum > target) {
        return;
    }

    for (let i = 1; i <= 3; i++) {
        currentCombination.push(i);
        findCombinations(target, currentSum + i, currentCombination, combinations);
        currentCombination.pop();
    }
}

function getAllCombinations(target) {
    const combinations = [];
    findCombinations(target, 0, [], combinations);
    return combinations;
}

export { findCombinations, getAllCombinations };