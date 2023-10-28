import http from "../utils/http";

export const viewResume = (id) =>
  http.get(`resumes/${id}/view`, { responseType: "blob" });

export const getResume = (id, name, page = 1, size = 30) =>
  http.get(`resumes`, {
    params: {
      id: id,
      name: name,
      page: page,
      size: size,
    },
  });

export function postResume(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("resumeName", file.name);
  return http.post(`resumes/upload`, formData, {
    headers: {
      "Content-Type ": "multipart/form-data"
    },
  });
}

export const downloadResume = (id) => http.get(`resumes/${id}/download`, { responseType: "blob" });

export const deleteResume = (id) => http.delete(`resumes/${id}`);
