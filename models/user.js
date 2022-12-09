const { pgp, db } = require("../config/connectStr");

exports.Signin = async function (account) {
  const rs = await db.any(
    `insert into public.\"Users\"(\"ID\",\"UName\", \"Email\", \"Password\", \"Permission\") 
          VALUES ($1, $2, $3, $4, $5) returning *`,
    [account.id, account.name, account.email, account.password, account.per]
  );
  return rs;
};

exports.findEmail = async function (email) {
  const rs = await db.any('select * from public."Users"where"Email" = $1', [
    email,
  ]);
  return rs;
};

exports.findUName = async function (uname) {
  const rs = await db.any('select * from public."Users"where"UName" = $1', [
    uname,
  ]);
  return rs;
};

exports.getLastID = async function () {
  const accounts = await db.any('select * from public."Users"');
  if (accounts.length == 0) {
    return 0;
  }
  return accounts[accounts.length - 1].ID;
};
