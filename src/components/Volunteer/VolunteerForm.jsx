import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FormButton from "../FormButton";
import AutoCloseModal from "../AutoCloseModal";
import emailjs from "@emailjs/browser";

const VolunteerForm = () => {
  const { t, i18n } = useTranslation(); // Get translation function and current language

  // Map language codes to readable names (will appear in the email)
  const languageNames = {
    es: "Español",
    en: "English",
    fr: "Français",
  };

  // Initialize form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    language: languageNames[i18n.language] || i18n.language, // Track current page language
    formType: "Volunteer Form", // Identify which form is submitted
  });

  // Track touched fields for validation display
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    service: false,
  });

  // Store validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    service: "",
  });

  const [isFormValid, setIsFormValid] = useState(false); // Overall form validity
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
  const [modalType, setModalType] = useState(""); // "" | "submitStatusSuccess" | "submitStatusFailed"

  // Sync language field with i18n current language whenever it changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      language: languageNames[i18n.language] || i18n.language,
    }));
  }, [i18n.language]);

  // Validation function
  const validateForm = (data) => {
    const newErrors = {};

    // Name validation
    const nameTrimmed = data.name.trim();
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if (nameTrimmed === "") newErrors.name = t("form.requiredField");
    else if (nameTrimmed.length < 2) newErrors.name = t("form.minLength");
    else if (nameTrimmed.length > 50) newErrors.name = t("form.maxLength");
    else if (!nameRegex.test(nameTrimmed))
      newErrors.name = t("form.invalidFormat");
    else newErrors.name = "";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (data.email.trim() === "") newErrors.email = t("form.requiredField");
    else if (!emailRegex.test(data.email))
      newErrors.email = t("form.invalidEmail");
    else newErrors.email = "";

    // Service validation
    if (data.service.trim() === "") newErrors.service = t("form.requiredField");
    else newErrors.service = "";

    // Update errors state
    setErrors(newErrors);

    // Check if all fields are valid
    const valid = Object.values(newErrors).every((err) => err === "");
    setIsFormValid(valid);
  };

  // Validate on initial render
  useEffect(() => {
    validateForm(formData);
  }, []);

  // Handle input/select change
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Remove leading spaces and multiple spaces
    const cleanValue = value.replace(/^\s+/, "").replace(/\s{2,}/g, " ");
    const updatedData = { ...formData, [name]: cleanValue };
    setFormData(updatedData);
    validateForm(updatedData);
  };

  // Mark field as touched on blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return; // Prevent submission if invalid

    setIsSubmitting(true);

    try {
      // Send form via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setModalType("submitStatusSuccess"); // Show success modal

      // Reset form (keep language and formType fields)
      setFormData({
        name: "",
        email: "",
        service: "",
        language: languageNames[i18n.language] || i18n.language,
        formType: "Volunteer Form",
      });
      setTouched({ name: false, email: false, service: false });
      setErrors({ name: "", email: "", service: "" });
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
        className="flex flex-col gap-4 w-full max-w-xl mt-12"
      >
        {/* Name */}
        <label htmlFor="name" className="sr-only">
          {t("form.name")}
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t("form.name")}
          className="p-3 rounded-xl border border-gray-300 bg-[#eeeeee]"
          required
          autoComplete="name"
        />
        {touched.name && errors.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}

        {/* Email */}
        <label htmlFor="email" className="sr-only">
          {t("form.email")}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t("form.email")}
          className="p-3 rounded-xl border border-gray-300 bg-[#eeeeee]"
          required
          autoComplete="email"
        />
        {touched.email && errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}

        {/* Service */}
        <label htmlFor="service" className="sr-only">
          {t("form.selectService")}
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          onBlur={handleBlur}
          className="p-3 rounded-xl border border-gray-300 bg-[#eeeeee]"
          required
        >
          <option value="">{t("form.selectService")}</option>
          <option value="walks">{t("form.walks")}</option>
          <option value="volunteer">{t("form.volunteer")}</option>
          <option value="general">{t("form.general")}</option>
        </select>
        {touched.service && errors.service && (
          <span className="text-red-500 text-sm">{errors.service}</span>
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

export default VolunteerForm;
