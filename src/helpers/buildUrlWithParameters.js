export default (url, queryParams = {}) => {
    const keys = Object.keys(queryParams);
    if ( !keys.length ) {
        return url;
    }
    return keys.reduce((res, key, index) => {
        const result = `${res + key}=${queryParams[key]}`;
        if (keys.length - 1 !== index) {
            return `${result}&`;
        }
        return result;
    }, `${url}?`);
};