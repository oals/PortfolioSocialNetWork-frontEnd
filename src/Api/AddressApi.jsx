import React from "react";
import DaumPostcode from "react-daum-postcode";

function AddressComponent({ onInput }) {
  const handleComplete = (data) => {
    onInput(data.zonecode, data.address);
  };

  return <DaumPostcode onComplete={handleComplete} />;
}

export default AddressComponent;
