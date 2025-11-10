import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const FooterContact = ({ emailParts = [] }) => {
  const { t } = useTranslation();

  // Combine all parts to form the complete email address
  const email = useMemo(() => emailParts.join(""), [emailParts]);

  return (
    <div className="inline-flex flex-col gap-0.5 text-(--color-text-light) font-normal leading-6 mb-8">
      <a
        href={`mailto:${email}`}
        aria-label={t("footer.emailAriaLabel", { email })}
        className="
          transition-colors
          duration-300
          hover:text-focus-tertiary
          focus-visible:text-focus-tertiary
          focus-visible:outline-none
        "
      >
        {email}
      </a>
    </div>
  );
};

export default FooterContact;
