import service from '../util/service';

/**
 * Service to get the list of kanji learned by user apiKey on wanikani
 * @param {string} apiKey
 * @returns {Promise<Response>}
 */
export function getKanji(apiKey) {
    return service.get(`https://www.wanikani.com/api/user/${apiKey}/kanji/`);
}

export default {
    getKanji: getKanji
}
