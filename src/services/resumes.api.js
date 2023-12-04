import http from "../utils/http";

export const viewResume = (id) =>
  http.get(`resumes/${id}`);

export const getResume = (limit, page, column, order) =>
  http.get(`resumes`, {
    params: {
      limit: limit,
      page: page,
      column: column,
      order: order,
    },
  });

export const postResume = (data) => {
  return http.post(`resumes`, {
    name: data.name,
    file_url: data.file_url,
  });
};
export const editResume = (id,data) => http.put(`resumes/${id}`,data);


export const deleteResume = (id) => http.delete(`resumes`,{data:{ids: [id]}});


export const downloadResume = (id) =>
  http.get(`resumes/${id}/download`, { responseType: "blob" });