import { uploadDirect } from "@uploadcare/upload-client";
import { api } from "../remote";
import { PropertyData } from "../types/property-data";

export const propertyMutation = {
  fnc: async ({ image, ...restData }: PropertyData) => {
    const imageData = await uploadDirect(image!, {
      publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_API_KEY as string,
    });

    return api.post<PropertyData>("properties", {
      ...restData,
      imageSrc: imageData.cdnUrl,
    });
  },
};
