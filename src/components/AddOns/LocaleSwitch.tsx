import { useRouter } from "next/router";

const LocaleSwitch = () => {
  const router = useRouter();
  const { locale } = router;

  const switchLocale = () => {
    const newLocale = locale === "ko-KR" ? "en-US" : "ko-KR";
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <button onClick={switchLocale}>
      Switch to {locale === "ko-KR" ? "English" : "Korean"}
    </button>
  );
};

export default LocaleSwitch;
