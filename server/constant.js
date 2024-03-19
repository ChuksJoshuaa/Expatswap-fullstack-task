export const getUrl = () => {
  let url = process.env.MONGO_URI;
  if (process.env.NODE_ENV === "test") {
    url = process.env.TEST_URI;
  }
  return url;
};

export const userInfo = {
  firstName: "Chuck",
  lastName: "Joshua",
  phoneNumber: "08046978494",
  email: "chuksjoshua1@gmail.com",
  password: "Chukwudi123",
  dateOfBirth: "1998-12-01",
}