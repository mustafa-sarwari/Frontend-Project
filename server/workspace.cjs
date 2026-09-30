const d = require("./domain.cjs");
const { text, HttpError } = require("./http.cjs");
module.exports = {
  title: "AXIOM storefront",
  resources: {
    orders: {
      label: "Order history",
      fields: [],
      hideForm: true,
      readOnly: true,
    },
    messages: {
      label: "Contact requests",
      fields: d.messageFields,
      writeOnly: true,
      validate: d.message,
    },
  },
};
