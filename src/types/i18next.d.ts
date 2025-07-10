import 'react-i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        navigation: {
          tasks: string;
          budget: string;
          profile: string;
          company: string;
          login: string;
        };
        brand: {
          name: string;
        };
        hero: {
          announcement: string;
          title: string;
          subtitle: string;
          getStarted: string;
          seeHowItWorks: string;
        };
        accessibility: {
          openMainMenu: string;
          closeMenu: string;
        };
      };
    };
  }
}
