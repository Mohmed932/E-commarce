const getPaymobToken = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    api_key:
      "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRBek1qUTJNeXdpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS5vTjJtcF94LTdtQmFlWjdWRXM5N0NXLXhaaFlyNWphRzJ4bXJjODNpdTlzeF9LeFFFY21zdkFwdnFrSERNeFhtNVc1ak1JMjJBaHlsVmcxMVRxZFgxZw==",
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Token received:", result.token);
    return result.token;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

const createPaymobOrder = async () => {
  const authToken = await getPaymobToken();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    auth_token: authToken,
    product_name: "Product_NAME",
    amount_cents: "4000",
    currency: "EGP",
    inventory: "1",
    delivery_needed: "false",
    integrations: [123, 786],
    allow_quantity_edit: "false",
    product_description: "Product_Description",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://accept.paymob.com/api/ecommerce/products", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

createPaymobOrder();
