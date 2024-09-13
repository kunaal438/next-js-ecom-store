const extractPublicId = (url) => {
    
    let urlInArray = url.split("/");
    let idWithFileType = urlInArray.splice(urlInArray.length-2, urlInArray.length - 1).join("/");
    let publicId = idWithFileType.split(".png")[0];

    return publicId;
    
}

export default extractPublicId;