/**
 * Returns whether or not the provided string is an api key (length 32)
 * @param apiKey
 * @returns {boolean}
 */
function isApiKey(apiKey = ""){
    const isApiKey = (apiKey.length === 32);
    return isApiKey;
}

export default {
    isApiKey: isApiKey
};

export {
    isApiKey as isApiKey
};
