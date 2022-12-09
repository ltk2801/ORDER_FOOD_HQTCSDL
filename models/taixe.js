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
  const rs = await db.any('select * from public."TaiXe"where"CMND" = $1', [
    cmnd,
  ]);
  return rs;
};

exports.getInfo = async function (email) {
  const rs = await db.any('select * from public."TaiXe"where"Email" = $1', [
    email,
  ]);
  return rs;
};

exports.getDanhSachDonHang = async function () {
  const rs = await db.any(
    'select * from public."DonHang" where "TaiXe" is $1 ',
    [null]
  );
  return rs;
};

exports.updateDonHangTaiXe = async function (dhId, txId) {
  const rs = await db.any(
    'UPDATE public."DonHang" SET "TaiXe" = $1 WHERE "MaDH" = $2  ',
    [txId, dhId]
  );

  return rs;
};

exports.getDanhSachDonHangTaiXe = async function (idTx) {
  const rs = await db.any(
    'select * from public."DonHang" where "TaiXe" = $1 ',
    [idTx]
  );
  return rs;
};

exports.updateTinhTrangDonHangTaiXe = async function (info) {
  const rs = await db.any(
    'UPDATE public."DonHang" SET "TinhTrangDH" = $1 WHERE "MaDH" = $2  ',
    [info.tt, info.mdh]
  );

  return rs;
};
