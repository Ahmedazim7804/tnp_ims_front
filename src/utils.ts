export function camelCaseToNormal(str: string) {
    return str
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, function (char) {
            return char.toUpperCase();
        });
}
