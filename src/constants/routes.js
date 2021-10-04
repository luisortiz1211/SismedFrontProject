const publicRoutes = {
  LOGIN: "/login",
};

const privateRoutes = {
  HOME: "/",
  REGISTER: "/register",
  PATIENTS: "/patients",
  CONTACTS: "/emergencyContact",
  PERSONAL: "/personalHistory",
  ALLERGIES: "/drugAllergies",
  FAMILY: "/familyHistory",
  PHYSICAL: "/physicalExam",
  EXPLORATION: "/explorationPatient",
  IMAGE: "/imagesRecipie",
  DRUGS: "/drugsRecipie",
  USERS: "/users",
  SCHEDULEDAY: "/scheduleDay",
  SCHEDULEUSER: "/userSchedule",
  MEDICALHISTORY: "/medicalHistory",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
