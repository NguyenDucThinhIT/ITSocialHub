import http from "@/utils/http"

const getTags = () => http.get(`tags?keyword=&page=1&size=50`);

export default getTags;
