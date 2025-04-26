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

export const createPaymobOrder = async (authToken) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    auth_token: authToken,
    delivery_needed: false,
    amount_cents: "4000",
    currency: "EGP",
    items: [
      {
        name: "Product_NAME",
        amount_cents: "4000",
        description: "Product_Description",
        quantity: 1,
      },
    ],
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
    // console.log("Order created:", result.id);
    return result.id; // ده الـ order ID اللي هتحتاجه في الخطوة الجاية
  } catch (error) {
    console.error("Error creating order:", error);
  }
};

export const createPaymentKey = async () => {
  const authToken = await getPaymobToken();
  const orderId = await createPaymobOrder(authToken);
  const Card = "5023244";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    auth_token: authToken,
    amount_cents: "4000",
    expiration: 3600,
    order_id: orderId,
    billing_data: {
      apartment: "803",
      email: "user@example.com",
      floor: "42",
      first_name: "John",
      street: "Main St.",
      building: "123",
      phone_number: "+201234567890",
      shipping_method: "PKG",
      postal_code: "12345",
      city: "Cairo",
      country: "EG",
      last_name: "Doe",
      state: "Cairo",
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
    // console.log("Payment Key created:", result.token);
    const iframeId = "909120";
    // const iframeId = "909119";
    const link = `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${result.token}`;
    console.log(link);
    return result.token;
  } catch (error) {
    console.error("Error creating payment key:", error);
  }
};

const createPaymentWallet = async () => {
  try {
    const token = await createPaymentKey();

    const req = await fetch(
      "https://accept.paymob.com/api/acceptance/payments/pay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: {
            identifier: "01064702174", // رقم الموبايل هنا
            subtype: "WALLET",
          },
          payment_token: token,
        }),
      }
    );

    const res = await req.json();
    console.log(res);
  } catch (error) {
    console.error("Error in createPaymentWallet:", error);
  }
};

createPaymentWallet();
