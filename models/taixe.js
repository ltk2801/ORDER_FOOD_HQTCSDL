const { pgp, db } = require("../config/connectStr");

exports.addTX = async function (account) {
  const rs = await db.any(
    `insert into public.\"TaiXe\"(\"CMND\",\"HoTen\",\"KhuVucHD\", \"BienSoXe\", \"STK\",\"Email\",\"DiaChi\",\"SDT\")
          VALUES ($1, $2, $3, $4, $5,$6,$7,$8) returning *`,
    [
      account.cmnd,
      account.uname,
      account.kv,
      account.bsx,
      account.tk,
      account.email,
      account.dc,
      account.sdt,
    ]
  );
  return rs;
};

exports.findCmnd = async function (cmnd) {
  const rs = await db.any('select * from public."TaiXe"where"CMND"like $1', [
    cmnd,
  ]);
  return rs;
};

exports.getInfo = async function (email) {
  const rs = await db.any('select * from public."TaiXe"where"Email"like $1', [
    email,
  ]);
  return rs;
};
