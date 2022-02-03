const dev = process.env.NODE_ENV !== "production";

export const baseUrl = dev
  ? "http://localhost:1402"
  : "https://checkout-test.rt.pe";
