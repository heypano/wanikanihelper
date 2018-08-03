import service from '../util/service';

/**
 * Service to get the list of vocabulary learned by user UUID on wanikani
 * @param {string} uuid
 * @returns {Promise<Response>}
 */
export function getVocabulary(uuid){
    return service.get(`https://www.wanikani.com/api/user/${uuid}/vocabulary/`);
}

export default {
    getVocabulary: getVocabulary
}
