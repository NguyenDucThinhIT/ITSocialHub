import http from "@/utils/http";

export const postRecruitment = (data) => {
  return http.post("recruitment-posts", {
    role: data.role,
    title: data.title,
    address: data.address,
    job_type: data.job_type,
    salary: data.salary,
    description: data.description,
    job_requirements: data.job_requirements,
    educational_requirements: data.educational_requirements,
    experience_requirements: data.experience_requirements,
    expired_at: data.expired_at,
  });
};
export const editRecruitment = (id,data) => {
  return http.put(`recruitment-posts/${id}`,data);
};
export const getIdPostRecruitment = (id,limit, page, column, order) => {
    return http.get(`recruitment-posts/${id}`, {
        params:{
            limit:limit,
            page:page,
            column:column,
            order:order
        },
    });
  };
export const getAllPostRecruitment = (limit, page, column, order,types,experiences,date,search,companies) => {
    return http.get('recruitment-posts', {
        params:{
            limit:limit,
            page:page,
            column:column,
            order:order,
            types:types,
            experiences:experiences,
            date:date,
            search:search,
            companies:companies
        },
    });
  };
export const getPostRecruitment = (limit, page, column, order) => {
    return http.get('recruitment-posts/personal/posts', {
        params:{
            limit:limit,
            page:page,
            column:column,
            order:order
        },
    });
  };