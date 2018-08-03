import service from '../util/service';

/**
 * Service to get the list of vocabulary learned by user apiKey on wanikani
 * @param {string} apiKey
 * @returns {Promise<Response>}
 */
export function getVocabulary(apiKey){
    return service.get(`https://www.wanikani.com/api/user/${apiKey}/vocabulary/`);
}

export default {
    getVocabulary: getVocabulary
}
