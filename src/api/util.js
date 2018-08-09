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
    return encodeURIComponent(btoa(apiKey));
}

/**
 * Decode the WaniKani API key from the URL params
 * @param {string} apiKey
 * @returns {string}
 */
function decodeApiKeyFromUrlParam (apiKey){
    return atob(decodeURIComponent(apiKey));
}

export {
    defaultErrorHandler as defaultErrorHandler,
    encodeApiKeyForUrl as encodeApiKeyForUrl,
    decodeApiKeyFromUrlParam as decodeApiKeyFromUrlParam
}
