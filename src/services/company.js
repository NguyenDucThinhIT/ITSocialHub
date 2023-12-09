import http from "@/utils/http";

export const updateProfileCompany = (data) => {
  return http.put('company-informations', data);
}

export const getProfileCompany = (data) => {
  return http.get('company-informations', data);
}

export const getAllCompany = (limit, page, column, order, search) => {
  return http.get('companies', {
      params:{
          limit:limit,
          page:page,
          column:column,
          order:order,
          search:search,
      },
  });
};

export const getIdCompany = (id,limit, page, column, order) => {
  return http.get(`companies/${id}`, {
      params:{
          limit:limit,
          page:page,
          column:column,
          order:order
      },
  });
};