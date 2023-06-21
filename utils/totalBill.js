import {
  AMOUNT_1000,
  AMOUNT_5000,
  AMOUNT_8000,
  PA_TAX,
  PB_TAX,
  PC_TAX,
  SA_TAX,
  SB_TAX,
  SC_TAX,
} from "./constants.js";

export const calculateTax = (product_price, product_type) => {
  let total_tax = 0;
  // calculate total tax as service
  if (product_type === "service") {
    if (product_price > AMOUNT_1000 && product_price <= AMOUNT_8000) {
      const tax = product_price * SA_TAX;
      total_tax += tax;
    } else if (product_price > AMOUNT_8000) {
      const tax = product_price * SB_TAX;
      total_tax += tax;
    }
    total_tax += SC_TAX; // flat tax will be apply to all servie
  } else {
    // calculate product tax
    if (product_price > AMOUNT_1000 && product_price <= AMOUNT_5000) {
      const tax = product_price * PA_TAX;
      total_tax += tax;
    } else if (product_price > AMOUNT_5000) {
      const tax = product_price * PB_TAX;
      total_tax += tax;
    }
    total_tax += PC_TAX; // flat tax will be apply to all product
  }
  return total_tax;
};
