import { CategoryLocale } from "@/types/common";
import { useRouter } from "next/router";
import { categoryList } from "../../../constants/category";

const LocaleSwitch = () => {
  const router = useRouter();
  const { locale, pathname, query } = router;

  const translateCategory = (category: string | undefined, locale: string) => {
    // Ensure locale is one of the keys in CategoryMapping
    const safeLocale: keyof CategoryLocale = (locale === 'ko-KR' || locale === 'en-US') ? locale : 'ko-KR';
  
    const translated = categoryList.find(cat => cat[safeLocale] === category || cat['ko-KR'] === category);
    return translated ? translated[safeLocale] : category;
  };

  

  const switchLocale = () => {
    const newLocale = locale === "ko-KR" ? "en-US" : "ko-KR";
    router.push({ pathname, query }, router.asPath, { locale: newLocale, shallow: true });
  };

  return (
    <button onClick={switchLocale}>
      Switch to {locale === "ko-KR" ? "English" : "Korean"}
    </button>
  );
};

export default LocaleSwitch;
