const imageValidator = (file) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    
    const maxSize = 1 * 1024 * 1024; // 1MB
  
    if (!allowedExtensions.exec(file.originalname)) {
      throw new Error('Invalid file type. Only JPG, JPEG, and PNG files are allowed.');
    }
  
    if (file.size > maxSize) {
      throw new Error('File size exceeds the limit of 1MB.');
    }
  
    return true;
  };
  