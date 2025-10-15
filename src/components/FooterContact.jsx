const FooterContact = ({ emailParts, phoneParts }) => {
  const email = emailParts.join("");
  const phoneDisplay = phoneParts.join(" ");
  const phoneLink = phoneParts.join("");

  return (
    <div className="inline-flex flex-col gap-0.5  text-[var(--color-text-light)] font-semibold leading-6 not-last:p-0 m-0">
      <a
        href={`mailto:${email}`}
        aria-label="Send email"
        className="hover:underline focus-visible:outline-none focus:text-[var(--color-focus-secondary)] p-0 m-0 leading-6"
      >
        {email}
      </a>
      <a
        href={`tel:${phoneLink}`}
        aria-label="Call number"
        className="hover:underline focus-visible:outline-none focus:text-[var(--color-focus-secondary)] p-0 m-0 leading-6"
      >
        {phoneDisplay}
      </a>
    </div>
  );
};

export default FooterContact;
