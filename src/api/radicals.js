import service from '../util/service';

/**
 * Service to get the list of kanji learned by user UUID on wanikani
 * @param {string} uuid
 * @returns {Promise<Response>}
 */
export function getRadicals(uuid){
    return service.get(`https://www.wanikani.com/api/user/${uuid}/radicals/`);
}

export default {
    getRadicals: getRadicals
}
