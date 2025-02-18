import React from "react";

const CustomButton = ({ onClick }: { onClick: () => void }) => {
  return <button onClick={onClick}>Click me</button>;
};

export default CustomButton;
