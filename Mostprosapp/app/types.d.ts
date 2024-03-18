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
    HomeOwnerCreate: undefined;
    HomeOwnerPostalCode: undefined;
    HomeOwnerAppLoodgieter: undefined;
    HomeOwnerAppHovenier: undefined;
    HomeOwnerAppDakdekker: undefined;
    HomeOwnerAppSchoonmaker: undefined;
    HomeOwnerAppAannemer: undefined;
    HomeOwnerAppElektricien: undefined;
    HomeOwnerAppAI_home_adviseur: undefined;
    HomeOwnerAppBadkamerspecialist: undefined;
    PostalCodeSpecialist: undefined;
    GegevensSpecialist: undefined;
    OmgevingSpecialist: undefined;
    CompanySituation1: undefined;
    CompanySituation2: undefined;
    CompanySituation3: undefined;
    CompanySituation4: undefined;
    DateAndTimePicker: undefined;
    CompanyKvk: undefined;
    NoKvKInfo: undefined;
    Footer: undefined;
    Contact: undefined;
    HomePageHomeOwner: undefined;
    HomeOwnerExtraInfo: undefined;
    HomeOwnerEmail: undefined;
    AboutUs: undefined;
    SpecialistResults: undefined;
    MyWork: undefined;
    MyWorkTwo: undefined;
    WorkNavigation: undefined;
    MyWorkThree: undefined;
    Changedate: undefined;
  };