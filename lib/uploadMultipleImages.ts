// lib/cloudinaryHelper.ts
import { File } from "formidable";
import cloudinary from "./cloudinary";

/**
 * Upload nhiều file lên Cloudinary và trả về mảng URL
 * @param files - Một file hoặc mảng file từ formidable
 * @param folder - Tên folder trên Cloudinary
 */
export async function uploadMultipleImages(
  files: File | File[],
  folder = "dongphucunivi"
): Promise<string[]> {
  // Chuẩn hoá thành mảng
  const fileArray: File[] = Array.isArray(files) ? files : [files];

  // Upload song song
  const results = await Promise.all(
    fileArray.map((file) =>
      cloudinary.uploader.upload(file.filepath, { folder })
    )
  );

  // Trả về mảng secure_url
  return results.map((r) => r.secure_url);
}
