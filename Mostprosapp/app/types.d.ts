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
    Register: {email: string};
    Login: undefined;
    Verify: {email: string};
    Profile: undefined;
    ProfileSecurity: undefined;
    ProfileSettings: undefined;
  };