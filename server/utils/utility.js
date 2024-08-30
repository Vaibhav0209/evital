const generateOtp = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
};

const otpExpiry = () => {
  return new Date(Date.now() + 15 * 60 * 1000);
};
module.exports = { generateOtp, otpExpiry };
