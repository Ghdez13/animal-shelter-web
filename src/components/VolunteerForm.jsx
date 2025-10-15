import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";

const VolunteerForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    service: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías enviar a un backend o a un correo
    console.log("Form submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto mt-12 mb-28"
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder={t("form.name")}
        className="p-3 rounded-xl border border-gray-300 bg-[#eeeeee]"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder={t("form.email")}
        className="p-3 rounded-xl border border-gray-300 bg-[#eeeeee]"
        required
      />

      <input
        type="text"
        name="whatsapp"
        value={formData.whatsapp}
        onChange={handleChange}
        placeholder={t("form.whatsapp")}
        className="p-3 rounded-xl border border-gray-300 bg-[#eeeeee]"
      />

      <select
        name="service"
        value={formData.service}
        onChange={handleChange}
        className="p-3 rounded-xl border border-gray-300 bg-[#eeeeee]"
        required
      >
        <option value="">{t("form.selectService")}</option>
        <option value="walks">{t("form.walks")}</option>
        <option value="volunteer">{t("form.volunteer")}</option>
        <option value="general">{t("form.general")}</option>
      </select>

      <Button type="submit">{t("form.submit")}</Button>
    </form>
  );
};

export default VolunteerForm;
