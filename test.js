import test from "ava";
const JWT = require("./dist/cjs/jwt");

const secretKey = "asdfadsf_secretKey";
const salt =
  "some-secure-128-bit-salt-key-for-getting-private-key--pem-key-string-would-be-helpful";

test("JWT Basic features ", async t => {
  t.plan(4);

  const signed = await JWT.sign(
    {
      my: {
        user: "data",
        secure: false
      },
      role: "admin"
    },
    secretKey,
    {
      expiresIn: 60 * 1000
    }
  );

  t.pass("Signing token was passed");
  await JWT.verify(signed, secretKey);

  t.pass("Verify token was passed");

  const signedAndEncoded = await JWT.sign(
    {
      my: {
        user: "data",
        secure: true
      },
      role: "admin"
    },
    secretKey,
    {
      expiresIn: 60 * 1000
    },
    true
  );

  t.pass("Signing and encoding token was passed");
  await JWT.verify(signedAndEncoded, secretKey, {}, true);

  t.pass("Verify token was passed");
});

test("JWT Generate token and Refresh token", async t => {
  t.plan(4);

  await JWT.generateToken(
    {
      my: {
        user: "data",
        secure: false
      },
      role: "admin"
    },
    secretKey,
    {
      expiresIn: -100
    }
  )
    .then(res => JWT.refreshToken({ ...res, privateKey: secretKey }))
    .then(({ accessToken }) => JWT.verify(accessToken, secretKey, undefined))
    .then(() => t.pass("Refresh token worked perfectly"));

  await JWT.generateToken(
    {
      my: {
        user: "data",
        secure: true
      },
      role: "admin"
    },
    secretKey,
    {
      expiresIn: -100
    },
    true,
    salt
  )
    .then(res => JWT.refreshToken({ ...res, salt }))
    .then(({ accessToken }) =>
      JWT.verify(accessToken, secretKey, undefined, true)
    )
    .then(() => t.pass("Refresh token worked perfectly"));

  await JWT.generateToken(
    {
      my: {
        user: "data",
        secure: false
      },
      role: "admin"
    },
    secretKey,
    {
      expiresIn: 1000
    }
  )
    .then(res => JWT.refreshToken({ ...res, privateKey: secretKey }))
    .then(({ accessToken }) => JWT.verify(accessToken, secretKey, undefined))
    .then(() => t.pass("Refresh token worked perfectly"));

  await JWT.generateToken(
    {
      my: {
        user: "data",
        secure: true
      },
      role: "admin"
    },
    secretKey,
    {
      expiresIn: 1000
    },
    true,
    salt
  )
    .then(res => JWT.refreshToken({ ...res, salt }))
    .then(({ accessToken }) =>
      JWT.verify(accessToken, secretKey, undefined, true)
    )
    .then(() => t.pass("Refresh token worked perfectly"));
});
