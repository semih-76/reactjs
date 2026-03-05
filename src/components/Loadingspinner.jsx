import React from "react";

/**
 * Composant de chargement pour Suspense fallback
 */
const LoadingSpinner = ({ message = "Chargement..." }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        gap: "20px",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "4px solid #F5EFE7",
          borderTop: "4px solid #D9C09B",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1rem",
          color: "#666",
        }}
      >
        {message}
      </p>
      <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
    </div>
  );
};

export default LoadingSpinner;
