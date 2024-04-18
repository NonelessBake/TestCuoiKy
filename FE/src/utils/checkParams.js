export const isIntegerGreaterThanOne = (value) => {
    if (typeof value === 'number' && Number.isInteger(value) && value >= 1) {
        return true;
    } else {
        return false;
    }
}