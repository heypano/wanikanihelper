/**
 * Return items that have user specific information defined and
 * The user has gotten the meaning correct at least once
 * @param item
 * @returns {boolean}
 */
function meaningCorrectAtLeastOnce(item){
    return !!(item.user_specific && item.user_specific.meaning_correct > 0);
}

export {
    meaningCorrectAtLeastOnce as meaningCorrectAtLeastOnce
};
