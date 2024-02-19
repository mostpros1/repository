import RootStackParamList from "./App"
declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }

  type RootStackParamList = {
    LandingPage: undefined;
    KeuzePage: undefined;
    HowItWorksOneHomeowner: undefined;
    HowItWorksTwoHomeowner: undefined;
    HowItWorksThreeHomeowner: undefined;
    HowItWorksOneSpecialist: undefined;
    HowItWorksTwoSpecialist: undefined;
    HowItWorksThreeSpecialist: undefined;
    Home: undefined;
    testHome: undefined;
    ProfileNavigation: undefined;
    SpecialistNavigation: undefined;
    HomeOwnerNavigation: undefined;
    ChatNavigation: undefined;
    Register: {email: string};
    Login: undefined;
    Verify: {email: string};
    Profile: undefined;
    ProfileSecurity: undefined;
    ProfileSettingsOne: undefined;
    ProfileSettingsTwo: undefined;
    ProfileNotifications: undefined;
    ProfileGeneralSettings: undefined;
    ChatOverview: undefined;
    HomePageSpecialist: undefined;
    ProfilePrivacy: undefined;
    ProfileAbout: undefined;
    HomeOwnerResults: undefined;
  };