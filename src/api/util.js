function defaultErrorHandler (error){
    if(error){
        console.log("There was an error, Pano.", error);
    }
}

/**
 * Encode the WaniKani API key for URL params
 * @param {string} apiKey
 * @returns {string}
 */
function encodeApiKeyForUrl (apiKey) {
    let result = "";
    if(apiKey){
        result = encodeURIComponent(btoa(apiKey));
    }
    return result;
}

/**
 * Decode the WaniKani API key from the URL params
 * @param {string} apiKey
 * @returns {string}
 */
function decodeApiKeyFromUrlParam (apiKey){
    let result = "";
    if(apiKey){
        result = atob(decodeURIComponent(apiKey));
    }
    return result;
}

export {
    defaultErrorHandler as defaultErrorHandler,
    encodeApiKeyForUrl as encodeApiKeyForUrl,
    decodeApiKeyFromUrlParam as decodeApiKeyFromUrlParam
}
