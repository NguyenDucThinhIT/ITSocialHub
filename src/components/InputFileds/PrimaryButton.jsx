import { Button } from "react-bootstrap";

const PrimaryButton = ({ text, className, style, onClick }) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      variant="primary"
      style={style}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
