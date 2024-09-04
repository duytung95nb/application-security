const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(cookieParser());

// Expect to allow all requests without credentials
app.get("/", cors(), (req, res) => {
  res.send("Hello World!");
});

// Expect to allow all requests without credentials
app.post("/", cors(), (req, res) => {
  res.send("Hello World!");
});

// Need to specify explicit origin for credentialed request to enable cross-origin request
const corsForCredentialedCookieRequest = cors({
  credentials: true,
  origin: "http://localhost:8080",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
});

// Authenticate with cookie
app.post(
  "/authenticate/cookie",
  corsForCredentialedCookieRequest,
  (req, res) => {
    if (req.cookies.user === "admin") {
      res.status(200).send({
        alreadyAuthenticatedBefore: true,
      });
      return;
    }
    res.cookie("user", "admin");
    res.status(200).send({
      authenticated: true,
    });
  }
);

// Request resource success in cookie-based auth
app.post(
  "/data/cookie-based/success",
  corsForCredentialedCookieRequest,
  (req, res) => {
    if (req.cookies.user === "admin") {
      res.status(200).send({
        resourceDataReturned: true,
      });
    } else {
      res.status(401).send({
        message: "You are not authenticated!",
      });
    }
  }
);

// Request resource failed in cookie-based auth (due to cors allow '*')
app.post("/data/cookie-based/fail", cors(), (req, res) => {
  console.log(
    "CORS request will still reach here but browser will throw net::ERR_FAILED"
  );
  res.status(200).send({
    succes: true,
  });
});

// Need to specify explicit origin for credentialed request to enable cross-origin request
const corsForCredentialedHttpRequest = cors({
  credentials: true,
  origin: "http://localhost:8080",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
});

// Basic authentication
app.post(
  "/authenticate/http-auth",
  corsForCredentialedHttpRequest,
  (req, res) => {
    const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    // Username and password in form of: <username>:<password>
    const [username, password] = Buffer.from(b64auth, "base64")
      .toString()
      .split(":");
    if (username === "admin" && password === "admin") {
      res.status(200).send({
        alreadyAuthenticatedBefore: true,
      });
      return;
    }
    res
      .status(401)
      .setHeader("WWW-Authenticate", 'Basic reaml="myServer"')
      .send({
        authenticated: true,
      });
  }
);
function httpAuthMiddleware(req, res, next) {
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  // Username and password in form of: <username>:<password>
  const [username, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");
  if (username === "admin" && password === "admin") {
    req.userData = { username, password };
    next();
    return;
  }
  res.status(401).setHeader("WWW-Authenticate", 'Basic reaml="myServer"').send({
    authenticated: true,
  });
}
// Request resource success in http auth
app.post(
  "/data/http-auth/success",
  corsForCredentialedHttpRequest,
  httpAuthMiddleware,
  (req, res) => {
    res.status(200).send({
      username: req.userData.username,
      success: true,
    });
  }
);

// Request resource fail in http auth (due to cors allow '*')
app.post("/data/http-auth/fail", cors(), (req, res) => {
  console.log(
    "CORS request will still reach here but browser will throw net::ERR_FAILED"
  );
  res.status(200).send({
    succes: true,
  });
});

// Vulnerability endpoint
app.post("/change-password", corsForCredentialedCookieRequest, (req, res) => {
  console.log("Change password runs");
  res.status(200).send({
    succes: true,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
