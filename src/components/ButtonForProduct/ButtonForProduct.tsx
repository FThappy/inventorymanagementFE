import React from "react";
import "./ButtonForProduct.css";
type StatusProp = {
  type: string;
};
const ButtonForProduct = ({ type }: StatusProp) => {
  switch (type) {
    case "active":
      return <button className={`statusProduct ${type}`}>Kinh doanh</button>;
    case "available":
      return <button className={`statusProduct ${type}`}>Kinh doanh</button>;
    case "inactive":
      return <button className={`statusProduct ${type}`}>Ngừng bán</button>;
    case "not_still_in_existence":
      return <button className={`statusProduct ${type}`}>Hết hàng</button>;
    case "not_available":
      return <button className={`statusProduct ${type}`}>Ngừng bán</button>;
    case "none":
      return <button className={`statusProduct ${type}`}>Hết hàng</button>;
    // Add more cases as needed
    default:
      return null;
  }
};

export default ButtonForProduct;
