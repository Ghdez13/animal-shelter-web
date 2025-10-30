import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FormButton from "../FormButton";
import AutoCloseModal from "../AutoCloseModal";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const { t, i18n } = useTranslation();

  // Map language codes to human-readable names
  const languageNames = {
    es: "Español",
    en: "English",
    fr: "Français",
  };

  // Initialize form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    language: languageNames[i18n.language] || i18n.language, // Keep track of page language
    formType: "Contact Form", // Identify which form is submitted
  });

  // Track touched fields for validation feedback
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  // Store validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isFormValid, setIsFormValid] = useState(false); // Form validity
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
  const [modalType, setModalType] = useState(""); // "" | "submitStatusSuccess" | "submitStatusFailed"

  // Keep language in sync with i18n
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      language: languageNames[i18n.language] || i18n.language,
    }));
  }, [i18n.language]);

  // Validation function
  const validateForm = (data) => {
    const newErrors = {};

    // Name
    const nameTrimmed = data.name.trim();
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if (nameTrimmed === "") newErrors.name = t("form.requiredField");
    else if (nameTrimmed.length < 2) newErrors.name = t("form.minLength");
    else if (nameTrimmed.length > 50) newErrors.name = t("form.maxLength");
    else if (!nameRegex.test(nameTrimmed))
      newErrors.name = t("form.invalidFormat");
    else newErrors.name = "";

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (data.email.trim() === "") newErrors.email = t("form.requiredField");
    else if (!emailRegex.test(data.email))
      newErrors.email = t("form.invalidEmail");
    else newErrors.email = "";

    // Message
    const messageTrimmed = data.message.trim();
    if (messageTrimmed === "") newErrors.message = t("form.requiredField");
    else if (messageTrimmed.length < 5) newErrors.message = t("form.minLength");
    else if (messageTrimmed.length > 500)
      newErrors.message = t("form.maxLength");
    else newErrors.message = "";

    setErrors(newErrors);
    // Check if all fields are valid
    setIsFormValid(Object.values(newErrors).every((err) => err === ""));
  };

  useEffect(() => {
    validateForm(formData); // Validate initially
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/^\s+/, "").replace(/\s{2,}/g, " ");
    const updatedData = { ...formData, [name]: cleanValue };
    setFormData(updatedData);
    validateForm(updatedData);
  };

  // Handle blur events to mark fields as touched
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Show success modal
      setModalType("submitStatusSuccess");

      // Reset form (keep language and formType)
      setFormData({
        name: "",
        email: "",
        message: "",
        language: languageNames[i18n.language] || i18n.language,
        formType: "Contact Form",
      });
      setTouched({ name: false, email: false, message: false });
      setErrors({ name: "", email: "", message: "" });
      setIsFormValid(false);
    } catch (error) {
      console.error("EmailJS error:", error);
      setModalType("submitStatusFailed"); // Show failure modal
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xl mt-5 ml-0"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t("form.name")}
          className="p-3 rounded-xl border border-gray-300 bg-[var(--color-bg-article)]"
          required
          autoComplete="name"
        />
        {touched.name && errors.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t("form.email")}
          className="p-3 rounded-xl border border-gray-300 bg-[var(--color-bg-article)]"
          required
          autoComplete="email"
        />
        {touched.email && errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}

        {/* Message */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t("form.message")}
          className="p-3 rounded-xl border border-gray-300 bg-[var(--color-bg-article)] h-32 resize-none max-w-full"
          required
        />
        {touched.message && errors.message && (
          <span className="text-red-500 text-sm">{errors.message}</span>
        )}

        {/* Hidden fields */}
        <input type="hidden" name="language" value={formData.language} />
        <input type="hidden" name="formType" value={formData.formType} />

        {/* Submit */}
        <FormButton disabled={!isFormValid} isLoading={isSubmitting}>
          {isSubmitting ? t("form.sending") : t("form.submit")}
        </FormButton>
      </form>

      {/* Modal */}
      {modalType && (
        <AutoCloseModal type={modalType} onClose={() => setModalType("")} />
      )}
    </>
  );
};

export default ContactForm;
