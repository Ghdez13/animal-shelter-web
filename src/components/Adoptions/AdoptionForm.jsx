// src/components/Adoptions/AdoptionForm.jsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FormButton from "../FormButton";
import AutoCloseModal from "../AutoCloseModal";
import emailjs from "@emailjs/browser";

const AdoptionForm = ({ animalName, onClose }) => {
  const { t, i18n } = useTranslation();

  // Map i18n language codes to readable language names
  const languageNames = {
    es: "Español",
    en: "English",
    fr: "Français",
  };

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    animalName: animalName || "",
    language: languageNames[i18n.language] || i18n.language,
    formType: "Adoption Form",
  });

  // State for touched inputs
  const [touched, setTouched] = useState({ name: false, email: false });

  // State for validation errors
  const [errors, setErrors] = useState({ name: "", email: "" });

  // State for form validity
  const [isFormValid, setIsFormValid] = useState(false);

  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for showing auto-close modal (success/failure)
  const [modalType, setModalType] = useState("");

  // Update language field whenever i18n language changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      language: languageNames[i18n.language] || i18n.language,
    }));
  }, [i18n.language]);

  // Function to validate form fields
  const validateForm = (data) => {
    const newErrors = {};

    // Validate name
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

    // Validate email
    const emailTrimmed = data.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    newErrors.email =
      emailTrimmed === ""
        ? t("form.requiredField")
        : !emailRegex.test(emailTrimmed)
        ? t("form.invalidEmail")
        : "";

    setErrors(newErrors);
    setIsFormValid(Object.values(newErrors).every((err) => err === ""));
    return newErrors;
  };

  // Re-validate form whenever formData changes
  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  // Handle input changes and update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/^\s+/, "").replace(/\s{2,}/g, " ");
    const updatedData = { ...formData, [name]: cleanValue };
    setFormData(updatedData);
    validateForm(updatedData);
  };

  // Mark input as touched when it loses focus
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    // Stop submission if any validation errors
    if (!Object.values(validationErrors).every((err) => err === "")) return;

    setIsSubmitting(true);

    try {
      // Send form via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Show success modal
      setModalType("adoptionSubmitSuccess");

      // Reset form state
      setFormData({
        name: "",
        email: "",
        animalName: animalName || "",
        language: languageNames[i18n.language] || i18n.language,
        formType: "Adoption Form",
      });
      setTouched({ name: false, email: false });
      setErrors({ name: "", email: "" });
      setIsFormValid(false);

      // Close AnimalModal shortly after success (matches AutoCloseModal)
      setTimeout(() => {
        if (onClose) onClose();
      }, 2500);
    } catch (error) {
      console.error("EmailJS error:", error);
      // Show failure modal
      setModalType("submitStatusFailed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine whether to show error messages
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
        onSubmit={handleSubmit} // Attach submit handler
        className="flex flex-col gap-4 w-full max-w-xl mt-6"
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
          onChange={handleChange} // Handle input changes
          onBlur={handleBlur} // Mark as touched on blur
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
          onChange={handleChange} // Handle input changes
          onBlur={handleBlur} // Mark as touched on blur
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

        {/* Hidden fields for template data */}
        <input type="hidden" name="animalName" value={formData.animalName} />
        <input type="hidden" name="language" value={formData.language} />
        <input type="hidden" name="formType" value={formData.formType} />

        {/* Submit button */}
        <FormButton
          disabled={!isFormValid || isSubmitting} // Disable when invalid or submitting
          isLoading={isSubmitting} // Show loading state
          type="submit" // Ensure it triggers form submission
        >
          {isSubmitting ? t("form.sending") : t("animalModal.submitButton")}
        </FormButton>
      </form>

      {/* AutoCloseModal to show success/failure messages */}
      {modalType && (
        <AutoCloseModal
          type={modalType}
          onClose={() => setModalType("")} // Close modal when timeout ends
          values={{ name: animalName }} // Pass animal name for interpolation
        />
      )}
    </>
  );
};

export default AdoptionForm;
