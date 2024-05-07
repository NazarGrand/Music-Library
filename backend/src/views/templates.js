function verificationTemplate(userName, verificationLink) {
  return `
<div>
  <h1>Welcome, ${userName}!</h1>
  <p>To activate your account, please click the link below:</p>
  <a href="${verificationLink}">Click here to activate your account</a>
</div>
`;
}

module.exports = { verificationTemplate };
