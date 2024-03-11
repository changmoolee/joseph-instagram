import {
  ICommonResponse,
  ICommonReturn,
} from "../../typescript/common/response.interface";
import apiClient from "@/utils/axios";

interface IUploadData {
  url: string;
  fields: Record<string, string>;
}

/**
 * S3 이미지 업로드 함수
 */
export const ImageUpload = async (
  imageFile: File[]
): Promise<ICommonReturn<string>> => {
  if (!imageFile || imageFile.length === 0) {
    alert("등록할 이미지가 없습니다.");
    return { result: "fail" };
  }

  const response: ICommonResponse<IUploadData> = await apiClient.post(
    "/api/upload",
    {
      imageInfo: JSON.stringify({
        filename: imageFile[0].name,
        contentType: imageFile[0].type,
      }),
    }
  );

  const { result, data, message } = response.data;

  if (result === "success" && data) {
    const { url, fields } = data;

    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append("file", imageFile[0]);

    try {
      await apiClient.post(url, formData);

      return { result: "success", data: url + fields.key };
    } catch (error: any) {
      alert(error.message);
      return { result: "fail", data: null };
    }
  } else {
    // 에러메시지
    alert(message);
    return { result: "fail", data: null };
  }
};
