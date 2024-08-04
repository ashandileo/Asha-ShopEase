"use client";

import React from "react";

import { I18nextProvider } from "react-i18next";

import i18n from "./../i18n";

interface IReactI18nextProvider {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
}

const ReactI18nextProvider = ({ children }: IReactI18nextProvider) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default ReactI18nextProvider;
