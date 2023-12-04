import http from "@/utils/http";


export function editProfile(data) {
  return http.put("users/update-profile", data);
}