export const calculateTax = (product_price, product_type) => {
  let total_tax = 0;
  // calculate total tax as service
  if (product_type === "service") {
    if (product_price > 1000 && product_price <= 8000) {
      const tax = product_price * 0.1;
      total_tax += tax;
    } else if (product_price > 8000) {
      const tax = product_price * 0.15;
      total_tax += tax;
    }
    total_tax += 100; // flat tax will be apply to all servie
  } else {
    // calculate product tax
    if (product_price > 1000 && product_price <= 5000) {
      const tax = product_price * 0.12;
      total_tax += tax;
    } else if (product_price > 5000) {
      const tax = product_price * 0.18;
      total_tax += tax;
    }
    total_tax += 200; // flat tax will be apply to all product
  }
  return total_tax;
};

// export const calculateTotalBill = async (userId) => {
//   const userProduct = await UserProducts.findOne({ userId });
//   if (!userProduct) {
//     return { success: false, total_bill: -1 };
//   }
//   let allProducts = userProduct.userProducts;
//   let total_bill = 0;
//   for (let i = 0; i < allProducts.length; i++) {
//     const product_Detail = await ProductItems.findById({
//       _id: allProducts[i],
//     });

//     const product_price = product_Detail.price;
//     const total_tax = calculateTax(product_price, product_Detail.product);
//     total_bill += product_price + total_tax;
//   }
//   return { success: true, total_bill: total_bill };
// };
