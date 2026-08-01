import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import enAuth from './locales/en/auth.json';
import enCommon from './locales/en/common.json';
import enUser from './locales/de/user.json';
import enEntityForm from './locales/en/entity-form.json';

import deAuth from './locales/de/auth.json';
import deCommon from './locales/de/common.json';
import deUser from './locales/de/user.json';
import deEntityForm from './locales/de/entity-form.json';

i18n.use(initReactI18next).init({
    lng: 'en',

    fallbackLng: 'en',

    interpolation: {
        escapeValue: false,
    },

    resources: {
        en: {
            auth: enAuth,
            common: enCommon,
            user: enUser,
            entityForm: enEntityForm,
        },

        de: {
            auth: deAuth,
            common: deCommon,
            user: deUser,
            entityForm: deEntityForm,
        },
    },

    ns: ['common', 'auth', 'user', 'entityForm'],

    defaultNS: 'common',
});

export default i18n;
