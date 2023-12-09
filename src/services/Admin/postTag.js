import http from "@/utils/http";

export default function postTag(name) {
  return http.post(`tags`, {
    name: name
  })
}
