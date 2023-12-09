import http from "../utils/http";


export const getAccount = (limit, page, column, order) => {
    return http.get('users', {
        params:{
            limit:limit,
            page:page,
            column:column,
            order:order
        },
    });
  };
export const deleteAccount = (ids) => http.delete(`users`,{data:{ids}});

