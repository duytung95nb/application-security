async function getRequest() {
  try {
    const response = await fetch("http://localhost:3000");
    console.log("Response: ", await response.text());
  } catch (e) {
    console.error("Error requesting", e.message);
  }
}
async function postRequest() {
  try {
    const response = await fetch("http://localhost:3000", {
      method: "post",
    });
    console.log("Response: ", await response.text());
  } catch (e) {
    console.error("Error requesting", e.message);
  }
}

async function authenticateWithCookie() {
  try {
    const response = await fetch("http://localhost:3000/authenticate/cookie", {
      method: "post",
      credentials: "include",
    });
    console.log("Response: ", await response.json());
  } catch (e) {
    console.error("Error requesting", e.message);
  }
}

async function requestWithCookieSuccess() {
  try {
    const response = await fetch(
      "http://localhost:3000/data/cookie-based/success",
      {
        method: "post",
        credentials: "include",
      }
    );
    console.log("Response: ", await response.json());
  } catch (e) {
    console.error("Error requesting", e.message);
  }
}

async function requestWithCookieFail() {
  try {
    const response = await fetch(
      "http://localhost:3000/data/cookie-based/fail",
      {
        method: "post",
        credentials: "include",
      }
    );
    console.log("Response: ", await response.json());
  } catch (e) {
    console.error("Error requesting", e.message);
  }
}
async function authenticateWithHttp() {
  try {
    const response = await fetch(
      "http://localhost:3000/authenticate/http-auth",
      {
        method: "post",
        credentials: "include",
      }
    );
    console.log("Response: ", await response.json());
  } catch (e) {
    console.error("Error requesting", e.message);
  }
}

async function requestWithHttpAuthSuccess() {
  try {
    const response = await fetch(
      "http://localhost:3000/data/http-auth/success",
      {
        method: "post",
        credentials: "include",
      }
    );
    console.log("Response: ", await response.json());
  } catch (e) {
    console.error("Error requesting", e.message);
  }
}

async function requestWithHttpAuthFail() {
  try {
    const response = await fetch("http://localhost:3000/data/http-auth/fail", {
      method: "post",
      credentials: "include",
    });
    console.log("Response: ", response.json());
  } catch (e) {
    console.error("Error requesting", e.message);
  }
}

async function main() {
  const responses = await Promise.allSettled([getRequest(), postRequest()]);
  console.log("All responses", responses);
}
(async () => {
  await main();
})();
