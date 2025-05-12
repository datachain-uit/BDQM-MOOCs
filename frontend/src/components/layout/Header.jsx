import React from "react";
import { MoreHorizontal } from "lucide-react";

const Header = ({ title = "PERSIONALIZED LEARNING" }) => {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        zIndex: 50,
        borderBottom: "1px solid #E0E0E0",
        boxSizing: "border-box",
      }}
    >
      {/* Nền từ 240px trở đi */}
      <div
        style={{
          position: "absolute",
          left: "240px",
          right: 0,
          top: 0,
          bottom: 0,
          background: "rgba(0, 113, 188, 0.85)",
          zIndex: -1,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          width: "293px",
          height: "35px",
          left: "269px",
          top: "calc(50% - 35px / 2 - 2.5px)",
          // fontFamily: "Inter, sans-serif",
          // fontStyle: "normal",
          fontWeight: 600,
          fontSize: "20px",
          lineHeight: "150%",
          display: "flex",
          alignItems: "center",
          letterSpacing: "-0.01em",
          color: "#FFFFFF",
        }}
      >
        {title}
      </div>

      {/* More button + Avatar Group */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "50px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {/* More Button */}
        <button
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px 16px",
            gap: "8px",
            width: "56px",
            height: "40px",
            background: "#EEEEEE",
            borderRadius: "8px",
            border: "none",
          }}
        >
          <MoreHorizontal size={24} color="#000" />
        </button>

        {/* Avatar */}
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "#F7F7F7",
            borderRadius: "1000px",
            overflow: "hidden",
          }}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="User avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
