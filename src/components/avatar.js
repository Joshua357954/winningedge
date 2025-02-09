import React from "react";

const Avatar = ({ name }) => {
  // Extract initials
  const getInitials = (name) => {
    if (!name) return "?";
    const words = name.trim().split(" ");
    return words.length > 1
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
      : words[0][0].toUpperCase();
  };

  return (
    <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold text-uppercase" style={{ width: "50px", height: "50px" }}>
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
