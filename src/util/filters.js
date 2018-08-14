/**
 * Return items that have user specific information defined and
 * The user has gotten the meaning correct at least once
 * @param item
 * @returns {boolean}
 */
// TODO make mapping between filters and their names in extra layer
function meaningCorrectAtLeastOnce(item){
    return !!(item.user_specific && item.user_specific.meaning_correct > 0);
}

/**
 * Has the user unlocked this item
 * @param item
 * @returns {boolean}
 */
function userHasUnlocked(item) {
    return !!item.user_specific;
}

/**
 * Default method for include style filters
 * @param item
 * @returns {boolean}
 */
function includeThis(item){
    return true;
}

/**
 * Method to exclude enlightened items
 * @param item
 * @returns {boolean}
 */
function excludeEnlightened(item){
    const hasUnlocked = userHasUnlocked(item);
    if(!hasUnlocked){
        // An item is not enlightened if it is not unlocked
        return true;
    } else {
        return item.user_specific.srs !== "enlighten";
    }
}

export {
    meaningCorrectAtLeastOnce as meaningCorrectAtLeastOnce,
    includeThis as includeThis,
    userHasUnlocked as userHasUnlocked,
    excludeEnlightened as excludeEnlightened

};
