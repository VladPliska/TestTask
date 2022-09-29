export function validateString(str: string | null): boolean {
    return typeof str === 'string' && !!str;
}

export function validateNullOrString(val: string | null): boolean {
    return validateString(val) || val === null;
}
