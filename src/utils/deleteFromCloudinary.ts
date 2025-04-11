export const deleteFromCloudinary = async (imageUrl: string) => {
    console.log("Deleting...")
    try {
        if (!imageUrl?.includes("/upload")) {
            console.log("Not an upload URL")
            return
        }

        const publicId = imageUrl.split("/").pop()?.split(".")?.[0]
        if (!publicId) {
            console.log("Couldn't find public ID")
            return
        }

        await fetch("https://cloudinary-delete-api.vercel.app/api/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": process.env.CLOUDINARY_DELETE_SECRET!, },
            body: JSON.stringify({ public_id: publicId }),
        });
    console.log(`Deleted successfully: ${publicId}`)
    } catch (err) {
        console.warn("Failed to delete image from Cloudinary:", err);
    }
};
