
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

export function localeToFolderName(locale: string | undefined): string {
  return locale ? locale.split("-")[0].toLowerCase() : ""
}
