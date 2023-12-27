import http from "@/utils/http";

export const postEmail = (data) => {
  return http.post(`send-verify`, {
    email: data.email,
  });
};

export const postChangePass = (data) => {
    return http.post(`reset-pass`, {
        verify_code: data.verify_code,
        new_password: data.new_password,
        new_password_confirmation: data.new_password_confirmation,
    });
  };