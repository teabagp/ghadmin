const cleanProperties = (obj) => {
    let result = {};
    for(const key in obj) {
        if(obj[key]) {
            result[key] = obj[key];
        }
    }

    return result;
}

const parseObjToStringWithSeparte = (obj, separator) => {
    let result = "";
    for(const key in obj) {
        if(obj[key]) {
            const str = `${key} ${separator} '${obj[key]}'`;
            result += result ? `, ${str}` : str;
        }
    }

    return result;
};

module.exports = {
    cleanProperties,
    parseObjToStringWithSeparte
};