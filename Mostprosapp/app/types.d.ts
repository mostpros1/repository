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
    TestHome: undefined;
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
    DateAndTimePicker: undefined;
    CompanyKvk: undefined;
    NoKvKInfo: undefined;
    Footer: undefined;
    Contact: undefined;
    HomePageHomeOwner: undefined;
    HomeOwnerExtraInfo: undefined;
    HomeOwnerEmail: undefined;
    AboutUs: undefined;
<<<<<<< HEAD
    SpecialistResults: undefined;
    MyWork: undefined;
    MyWorkTwo: undefined;
    WorkNavigation: undefined;
    MyWorkThree: undefined;
    Changedate: undefined;
    ChangedateTwo: undefined;
    ConfirmDate: undefined;
    PaymentSend: undefined;
    EditProfile: undefined;
    TestHome: undefined;
    RevenueTool: undefined;
=======
>>>>>>> acceptance
  };