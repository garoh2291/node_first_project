const keys = require("../keys");

module.exports = function (email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: "Registration is complete",
    html: `
        <h1>Welcome to our store</h1>
        <p>Your account was created -  ${email}</p>
        <hr/>
        <a href="${keys.BASE_URL}">Shop</a>
    `,
  };
};
