export const getPaymobToken = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    api_key: `ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRBek1qUTJNeXdpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS5vTjJtcF94LTdtQmFlWjdWRXM5N0NXLXhaaFlyNWphRzJ4bXJjODNpdTlzeF9LeFFFY21zdkFwdnFrSERNeFhtNVc1ak1JMjJBaHlsVmcxMVRxZFgxZw==`,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://accept.paymob.com/api/auth/tokens",
      requestOptions
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    // console.log("Token received:", result.token);
    return result.token;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

export const createPaymobOrder = async (
  authToken,
  amount_cents,
  merchant_order_id
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    auth_token: authToken,
    delivery_needed: false,
    amount_cents: amount_cents * 100,
    currency: "EGP",
    merchant_order_id,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://accept.paymob.com/api/ecommerce/orders",
      requestOptions
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    // console.log("Order created:", result);
    return result.id; // ده الـ order ID اللي هتحتاجه في الخطوة الجاية
  } catch (error) {
    console.error("Error creating order:", error);
  }
};

export const createPaymentKey = async (
  authToken,
  orderId,
  user,
  totalPrice
) => {
  const Card = "5023244";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const price = totalPrice * 100;
  const raw = JSON.stringify({
    auth_token: authToken,
    amount_cents: `${price}`,
    expiration: 3600,
    order_id: orderId,
    billing_data: {
      apartment: "803",
      email: user.email,
      floor: "42",
      first_name: user.name,
      street: `nkjh ${user.adress.landmark}`,
      building: "123",
      phone_number: `+2${user.adress.primaryPhone}`,
      shipping_method: "PKG",
      postal_code: "12345",
      city: `dfgd ${user.adress.governorate}`,
      country: "EG",
      last_name: user.name,
      state: user.adress.center,
    },
    currency: "EGP",
    integration_id: Card,
    lock_order_when_paid: "false",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      requestOptions
    );
    const result = await response.json();
    // console.log("Payment Key created:", result);
    // const iframeId = "909120";
    const iframeId = "909119";
    const link = `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${result.token}`;
    return link;
  } catch (error) {
    console.error("Error creating payment key:", error);
  }
};
