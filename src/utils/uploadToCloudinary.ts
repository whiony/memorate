export const uploadToCloudinary = async (
    base64: string,
    cloudName: string,
    uploadPreset: string
  ): Promise<string> => {
    const data = new FormData();
  
    data.append('file', `data:image/jpeg;base64,${base64}`);
    data.append('upload_preset', uploadPreset);
  
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: data,
    });
  
    const json = await res.json();
    if (!json.secure_url) throw new Error('Cloudinary upload failed');
    return json.secure_url;
  };
  