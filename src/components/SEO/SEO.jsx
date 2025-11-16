import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const SEO = ({ pageKey, url, image }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Get translated values
  const title = t(`${pageKey}.title`) || "JausPet";
  const description =
    t(`${pageKey}.description`) || "JausPet - Adopta, ayuda, comparte amor";

  // 👇 If no image is provided, fallback to global OG image
  const ogImage = image || "https://jauspet.vercel.app/og/default.webp";

  // Update document title when language or route changes
  useEffect(() => {
    document.title = title;
  }, [title, i18n.language, location.pathname]);

  return (
    <Helmet key={`${location.pathname}-${i18n.language}`}>
      <html lang={i18n.language} />
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
