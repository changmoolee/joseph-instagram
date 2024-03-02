import axios from "axios";

/**
 * S3 이미지 업로드 함수
 */
export const ImageUpload = async (imageFile: File[]) => {
  if (!imageFile || imageFile.length === 0) {
    alert("등록할 이미지가 없습니다.");
    return;
  }

  const response = await axios.post("/api/upload", {
    imageInfo: JSON.stringify({
      filename: imageFile[0].name,
      contentType: imageFile[0].type,
    }),
  });

  const { result, data, message } = response.data;

  if (result === "success") {
    const { url, fields } = data;

    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append("file", imageFile[0]);

    try {
      await axios.post(url, formData);

      console.log("image-url", url + fields.key);

      return { url: url + fields.key };
    } catch (error: any) {
      alert(error.message);
      return;
    }
  }

  if (result === "fail") {
    // 에러메시지
    alert(message);
    return;
  }
};
