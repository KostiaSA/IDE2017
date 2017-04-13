
export function getObjectConstructorName(obj: any) {
    let funcNameRegex = /function (.{1,})\(/;
    let results = (funcNameRegex).exec((obj).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};