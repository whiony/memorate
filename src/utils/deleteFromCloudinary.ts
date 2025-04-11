export const deleteFromCloudinary = async (imageUrl: string) => {
    try {
        const matches = imageUrl.match(/\/upload\/(?:v\\d+\/)?(.+?)\\.(jpg|jpeg|png|webp|gif)/);
        if (!matches) return;

        const publicId = matches[1];

        await fetch("https://cloudinary-delete-api.vercel.app/api/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": process.env.CLOUDINARY_DELETE_SECRET!, },
            body: JSON.stringify({ public_id: publicId }),
        });
    } catch (err) {
        console.warn("Failed to delete image from Cloudinary:", err);
    }
};
