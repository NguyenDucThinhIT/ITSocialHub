import http from "@/utils/http"

const deleteTag = (id) => http.delete(`tags/${id}`);

export default deleteTag;
