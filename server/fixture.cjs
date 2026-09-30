module.exports = {
  ...{ resource: "orders", invalid: {} },
  body: async (url, cookie) => {
    return {
      items: [
        {
          id: (await (await fetch(url + "/api/products")).json()).find(
            (p) => p.inStock,
          ).id,
          quantity: 1,
        },
      ],
    };
  },
};
