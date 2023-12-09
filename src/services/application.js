import http from "../utils/http";

export const viewApplicationsEmployees  = (id) =>
  http.get(`applications/${id}`);


export const viewApplications = (id) =>
  http.get(`applications/posts/${id}`);

export const getApplications = (limit, page, column, order) =>
  http.get(`applications`, {
    params: {
      limit: limit,
      page: page,
      column: column,
      order: order,
    },
  });

export const postApplications = (data) => {
  return http.post(`applications`, {
    content: data.content,
    name: data.name,
    file_url: data.file_url,
    recruitment_post_id: data.recruitment_post_id,
    status: data.status,
    feedback : data.feedback,
  });
};
export const editApplications = (id,data) => http.put(`applications/${id}`,data);


export const deleteApplications = (ids) => http.delete(`applications`,{data:{ids}});

