import http from "@/utils/http";

export function upload(file) {
    const formData = new FormData();
    formData.append("file", file);
    return http.post(`upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    }).then((response) => response?.data)
  }
