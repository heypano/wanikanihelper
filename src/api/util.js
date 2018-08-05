function defaultErrorHandler (error){
    if(error){
        console.log("There was an error, Pano.", error);
    }
}

export {
    defaultErrorHandler as defaultErrorHandler
}
