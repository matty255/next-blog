export const copyToClipboard = (hex: string) => {
  navigator.clipboard
    .writeText(hex)
    .then(() => {
      alert("Copied to clipboard.");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
};
