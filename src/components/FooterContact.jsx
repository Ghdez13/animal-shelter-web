import { useMemo } from "react";

const FooterContact = ({ emailParts = [] }) => {
  // Combine email parts into full email address
  const email = useMemo(() => emailParts.join(""), [emailParts]);

  return (
    <div className="inline-flex flex-col gap-0.5 text-[var(--color-text-light)] font-normal leading-6 mb-8">
      {/* Email link */}
      <a
        href={`mailto:${email}`}
        aria-label={`Send an email to ${email}`}
        className="hover:underline focus-visible:outline-none  focus:text-[var(--color-focus-secondary)]"
      >
        {email}
      </a>
    </div>
  );
};

export default FooterContact;
