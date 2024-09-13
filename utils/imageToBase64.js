const getBase64Image = (file) => {
    
    return new Promise((resolve, reject) => {
        
        if (!file) {
            reject("No file provided");
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            resolve(e.target?.result);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });

};

export default getBase64Image;