import React, { useEffect, useState } from "react";
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
import { getResume } from "@/services/resumes.api";

const UploadCVModal = ({ show, handleClose, postId,title, userCVs }) => {
  const { t } = useTranslation("common");
  const user = useSelector((state) => state.auth.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textInfor, setTextInfor] = useState("");
  const [selectedCV, setSelectedCV] = useState(null);
  const [uploadOption, setUploadOption] = useState("online");
  const [cvList, setCvList] = useState([]);

  const getAllCV = () => {
    getResume().then((res) => {
      const cvData = res.data.items.map((cv) => ({
        id: cv.id,
        name: cv.name,
        file_url: cv.file_url, 
      }));
      setCvList(cvData);
    });
  };

  useEffect(() => {
    getAllCV();
  }, []);

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
    if (uploadOption === "online" && !selectedCV) {
      // Nếu đang chọn CV online mà chưa chọn CV thì thông báo lỗi
      console.log("Vui lòng chọn một CV.");
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng chọn một CV.",
      });
      return false;
    }
  
    if (uploadOption === "local" && !selectedFile) {
      console.log("Vui lòng chọn một tệp để tải lên.");
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng chọn một tệp để tải lên.",
      });
      return false;
    }
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
    } else if (uploadOption === "online" && selectedCV) {
      // Lấy URL của CV khi chọn CV online
      const selectedCvData = cvList.find((cv) => cv.id === selectedCV);
      return selectedCvData ? selectedCvData.file_url : false;
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
            text: t("candidate.notice.apply"),
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
  useEffect(() => {
    // Kiểm tra nếu selectedCV rỗng và cvList không rỗng thì chọn CV đầu tiên
    if (!selectedCV && cvList.length > 0) {
      setSelectedCV(cvList[0].id);
    }
  }, [cvList, selectedCV]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ứng tuyển {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="text-infor">
          <RichTextEditor
            className="text-edit"
            value={textInfor}
            handleChange={handleTextChange}
            placeholder="Giới thiệu ngắn gọn về bản thân"
          />
        </div>
        <div className="line-text"></div>
        <div>
          <label className="mb-2 mr-2">Chọn phương thức tải CV:</label>
          <select
            className="bg-white"
            value={uploadOption}
            onChange={(e) => setUploadOption(e.target.value)}
          >
            <option value="online">Dùng CV Online</option>
            <option value="local">Tải lên CV từ máy tính</option>
          </select>
        </div>
        {uploadOption === "online" && (
          <div>
            <label className="mr-2">Chọn CV:</label>
            <select
            className="bg-white"
              value={selectedCV}
              onChange={(e) => setSelectedCV(e.target.value)}
            >
              <option value="" disabled>
                Chọn một CV
              </option>
              {cvList.map((cv) => (
                <option key={cv.id} value={cv.id}>
                  {cv.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {uploadOption === "local" && (
          <div>
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
