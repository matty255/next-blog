import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const LocaleSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    i18n.changeLanguage(newLocale).then(() => {
      router.replace(router.asPath); // Refresh the page to update localized content
    });
  };

  return (
    <div>
      <button onClick={() => switchLocale("ko")}>한국어</button>
      <button onClick={() => switchLocale("en")}>English</button>
      {/* Add more buttons for other locales here */}
    </div>
  );
};

export default LocaleSwitch;
