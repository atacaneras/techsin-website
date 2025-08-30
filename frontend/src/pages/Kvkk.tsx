import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext";

export default function Kvkk() {
  const { t, tArray } = useLanguage();
  const rights = tArray("kvkkRights");

  return (
    <>
      <Helmet>
        <title>{t("kvkkHelmet")}</title>
      </Helmet>

      <div className="max-w-4xl mx-auto p-6 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {t("kvkkPageTitle")}
        </h1>

        <p className="mb-4">
          <strong>{t("kvkkCompanyName")}</strong> {t("kvkkIntro1")}
        </p>

        <p className="mb-4">{t("kvkkIntro2")}</p>

        <h2 className="text-xl font-bold mt-6 mb-3">{t("kvkkSection1Title")}</h2>
        <p className="mb-4">{t("kvkkSection1P1")}</p>
        <p className="mb-4">{t("kvkkSection1P2")}</p>

        <h2 className="text-xl font-bold mt-6 mb-3">{t("kvkkSection2Title")}</h2>
        <p className="mb-4">{t("kvkkSection2")}</p>

        <h2 className="text-xl font-bold mt-6 mb-3">{t("kvkkSection3Title")}</h2>
        <p className="mb-4">{t("kvkkSection3")}</p>

        <h2 className="text-xl font-bold mt-6 mb-3">{t("kvkkSection4Title")}</h2>
        <p className="mb-4">{t("kvkkRightsIntro")}</p>
        <p className="mb-4">{t("kvkkRightsTitle")}</p>

        <ul className="list-disc pl-6 mb-4 space-y-2">
          {rights.map((right, i) => (
            <li key={i}>{right}</li>
          ))}
        </ul>

        <p className="mb-4">{t("kvkkRightsOutro")}</p>
        <p className="mb-4">{t("kvkkContactInfo")}</p>
        <p className="mb-4">{t("kvkkAdditionalInfo1")}</p>
        <p className="mb-4">{t("kvkkAdditionalInfo2")}</p>
        <p className="mb-4">{t("kvkkProcedureRef")}</p>
      </div>
    </>
  );
}
