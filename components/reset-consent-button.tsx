"use client";

export function ResetConsentButton() {
  return (
    <button
      className="text-[#FF007F] hover:underline"
      onClick={() => {
        localStorage.removeItem("cookie-consent");
        window.location.reload();
      }}
    >
      cliquer ici pour réinitialiser votre consentement
    </button>
  );
}
