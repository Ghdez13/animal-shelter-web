import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FormButton from "../FormButton";
import AutoCloseModal from "../AutoCloseModal";
import emailjs from "@emailjs/browser";

const VolunteerForm = () => {
  const { t, i18n } = useTranslation(); // Translation function and current language

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
    language: languageNames[i18n.language] || i18n.language,
    formType: "Volunteer Form",
  });

  // Track touched fields
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    service: false,
  });

  // Validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    service: "",
  });

  const [isFormValid, setIsFormValid] = useState(false); // Form validity
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
  const [modalType, setModalType] = useState(""); // Modal type

  // Sync language field with i18n language
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
    newErrors.name =
      nameTrimmed === ""
        ? t("form.requiredField")
        : nameTrimmed.length < 2
        ? t("form.minLength")
        : nameTrimmed.length > 50
        ? t("form.maxLength")
        : !nameRegex.test(nameTrimmed)
        ? t("form.invalidFormat")
        : "";

    // Email validation
    const emailTrimmed = data.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    newErrors.email =
      emailTrimmed === ""
        ? t("form.requiredField")
        : !emailRegex.test(emailTrimmed)
        ? t("form.invalidEmail")
        : "";

    // Service validation
    const serviceTrimmed = data.service.trim();
    newErrors.service = serviceTrimmed === "" ? t("form.requiredField") : "";

    setErrors(newErrors);

    // Check overall form validity
    setIsFormValid(Object.values(newErrors).every((err) => err === ""));
    return newErrors;
  };

  // Validate on initial render
  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  // Handle input/select change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/^\s+/, "").replace(/\s{2,}/g, " ");
    const updatedData = { ...formData, [name]: cleanValue };
    setFormData(updatedData);
    validateForm(updatedData);
  };

  // Mark field as touched
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (!Object.values(validationErrors).every((err) => err === "")) return;

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setModalType("submitStatusSuccess");

      // Reset form
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
      setModalType("submitStatusFailed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to decide whether to show error
  const shouldShowError = (field) => {
    const otherFieldsFilled = Object.keys(formData)
      .filter(
        (key) => key !== field && key !== "language" && key !== "formType"
      )
      .every((key) => formData[key].trim() !== "");
    return (
      touched[field] || (otherFieldsFilled && formData[field].trim() === "")
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xl mt-12"
      >
        {/* Name input */}
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
          className="p-3 rounded-xl border border-gray-300 bg-(--color-bg-article)"
          required
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {shouldShowError("name") && errors.name && (
          <span id="name-error" className="text-red-500 text-sm">
            {errors.name}
          </span>
        )}

        {/* Email input */}
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
          className="p-3 rounded-xl border border-gray-300 bg-(--color-bg-article)"
          required
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {shouldShowError("email") && errors.email && (
          <span id="email-error" className="text-red-500 text-sm">
            {errors.email}
          </span>
        )}

        {/* Service select */}
        <label htmlFor="service" className="sr-only">
          {t("form.selectService")}
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          onBlur={handleBlur}
          className="p-3 rounded-xl border border-gray-300 bg-(--color-bg-article)"
          required
          aria-invalid={errors.service ? "true" : "false"}
          aria-describedby={errors.service ? "service-error" : undefined}
        >
          <option value="">{t("form.selectService")}</option>
          <option value="walks">{t("form.walks")}</option>
          <option value="volunteer">{t("form.volunteer")}</option>
          <option value="general">{t("form.general")}</option>
        </select>
        {shouldShowError("service") && errors.service && (
          <span id="service-error" className="text-red-500 text-sm">
            {errors.service}
          </span>
        )}

        {/* Hidden fields */}
        <input type="hidden" name="language" value={formData.language} />
        <input type="hidden" name="formType" value={formData.formType} />

        {/* Submit button */}
        <FormButton
          disabled={!isFormValid || isSubmitting}
          isLoading={isSubmitting}
          type="submit"
        >
          {isSubmitting ? t("form.sending") : t("form.submit")}
        </FormButton>
      </form>

      {/* Modal for submission status */}
      {modalType && (
        <AutoCloseModal type={modalType} onClose={() => setModalType("")} />
      )}
    </>
  );
};

export default VolunteerForm;
