import { useTranslation } from "react-i18next";

import "./style.css";

const Input = (props) => {
  const { t } = useTranslation("common");
  const {
    inputType,
    classStyle,
    placeholder,
    data,
    setData,
    label,
    disabled,
    photo,
    row,
  } = props;

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setData(e.target.value);
    if (selectedValue !== "NONE") {
      setData(selectedValue);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setData(file);
  };

  const renderInput = () => {
    if (inputType === "date") {
      return (
        <input
          className={classStyle}
          type="text"
          placeholder={placeholder}
          value={data}
          onChange={handleChange}
          disabled={disabled}
        />
      );
    } else if (inputType === "gender") {
      return (
        <select
          className={classStyle}
          value={data === "None" ? data : data || "None"}
          onChange={handleChange}
          disabled={disabled}
        >
          <option disabled value="None">{t("candidate.profile.none")}</option>
          <option value="MALE">{t("candidate.profile.male")}</option>
          <option value="FEMALE">{t("candidate.profile.female")}</option>
          <option value="OTHER">{t("candidate.profile.other")}</option>
        </select>
      );
    } else if (inputType === "photo") {
      return (
        <>
          <img
            className="profile-pic p-0"
            src={photo ? URL.createObjectURL(photo) : "img/ava.png"}
            alt=""
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            disabled={disabled}
          />
        </>
      );
    } else if (inputType === "textarea") {
      return (
        <textarea
          className={classStyle}
          placeholder={placeholder}
          value={data}
          onChange={handleChange}
          rows={row}
          disabled={disabled}
        />
      );
    } else {
      return (
        <input
          type="text"
          className={classStyle}
          placeholder={placeholder}
          value={data}
          onChange={handleChange}
          disabled={disabled}
        />
      );
    }
  };

  return (
    <>
      <label>{label}</label>
      {renderInput()}
    </>
  );
};

export default Input;
