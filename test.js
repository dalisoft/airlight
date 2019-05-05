import test from "ava";
const JWT = require("./dist/cjs/jwt");

const secretKey = "asdfadsf_secretKey";
const salt =
  "some-secure-128-bit-salt-key-for-getting-private-key--pem-key-string-would-be-helpful";

test("JWT Basic features ", t =>
  new Promise(async resolve => {
    t.timeout(5000);
    t.plan(8);

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
        expiresIn: 2
      }
    );

    t.pass("Signing token was passed");
    await JWT.verify(signed, secretKey);

    t.throwsAsync(
      JWT.verify(signed.replace(/./, ".."), secretKey),
      "jwt malformed",
      "Invalid token was passed and this mean function does not work properly"
    );

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
        expiresIn: 2
      },
      true
    );

    t.pass("Signing and encoding token was passed");
    await JWT.verify(signedAndEncoded, secretKey, {}, true);

    t.throwsAsync(
      JWT.verify(signedAndEncoded + "a", secretKey, {}, true),
      "jwt malformed",
      "Invalid token was passed and this mean function does not work properly"
    );

    t.pass("Verify token was passed");

    setTimeout(async () => {
      await t.throwsAsync(
        JWT.verify(signed, secretKey),
        "jwt expired",
        "Expired token was passed and this mean function does not work properly"
      );
      await t.throwsAsync(
        JWT.verify(signedAndEncoded, secretKey, {}, true),
        "jwt expired",
        "Expired token was passed and this mean function does not work properly"
      );
      resolve();
    }, 3000);
  }));

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
