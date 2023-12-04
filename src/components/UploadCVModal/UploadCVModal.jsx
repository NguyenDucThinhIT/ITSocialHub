import React, { useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { upload } from "@/services/upload.api";
import { postApplications } from "@/services/application";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import "./modal.css";

const UploadCVModal = ({ show, handleClose, postId }) => {
  const { t } = useTranslation("common");
  const user = useSelector((state) => state.auth.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textInfor, setTextInfor] = useState("");

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };
  const handleTextChange = (value) => {
    setTextInfor(value);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf",
  });

  const handleUpload = async () => {
    if (selectedFile) {
      const urlCV = await upload(selectedFile)
        .then((response) => {
          console.log("Tải lên thành công:", response);
          Swal.fire({
            icon: "success",
            title: "Ứng tuyển thành công!",
            text: "Cảm ơn bạn đã ứng tuyển.",
          });
          
          return response.url;
          
        })
        .catch((error) => {
          console.error("Lỗi khi tải lên:", error);
          return false;
        });
        return urlCV;
    } else {
      console.log("Vui lòng chọn một tệp để tải lên.");
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng chọn một tệp để tải lên.",
      });
      return false;
    }
    return false;
  };
  const postApplicationsMutation = useMutation({
    mutationFn: (body) => postApplications(body),
  });
  const handlePostApplications = async () => {
    const uploadCV = await handleUpload();
    if (!uploadCV) return;
    postApplicationsMutation.mutate(
      {
        content: textInfor,
        name: user.last_name + " " + user.first_name,
        file_url: uploadCV,
        recruitment_post_id: postId,
        status: "NEW",
      },
      {
        onSuccess: () => {
          handleClose();
          Swal.mixin({
            toast: true,
            position: "top-end",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).fire({
            icon: "success",
            text: t("login.registerSuccess"),
          });
        },
        onError: () => {
          let errorText;
          Swal.fire({
            icon: "error",
            title: t("jobPage.failed"),
            text: errorText,
          });
        },
      }
    );
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ứng tuyển </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-infor">
          <RichTextEditor
            className="text-edit"
            value={textInfor}
            handleChange={handleTextChange}
            placeholder="Giới thiệu về bản thân"
          />
        </div>
        <div className="line-text"></div>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps({ accept: "application/pdf" })} />
          <p>Kéo và thả tệp PDF của bạn hoặc nhấp để chọn tệp.</p>
        </div>
        {selectedFile && (
          <div className="uploaded-file">
            <span className="uploaded-file-name">{selectedFile.name}</span>
            <span
              className="uploaded-file-delete"
              onClick={() => setSelectedFile(null)}
            >
              Xóa
            </span>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handlePostApplications}>
          Hoàn tất
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadCVModal;
