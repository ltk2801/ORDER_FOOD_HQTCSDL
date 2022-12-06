const { pgp, db } = require("../config/connectStr");

exports.addNV = async function (account) {
  const rs = await db.any(
    `insert into public.\"NhanVien\"(\"MaNhanVien\",\"HoTen\",\"Email\", \"DiaChi\", \"SDT\")
          VALUES ($1, $2, $3, $4, $5) returning *`,
    [account.idnv, account.uname, account.email, account.dc, account.sdt]
  );
  return rs;
};

exports.getLastID_NV = async function () {
  const rs = await db.any('select * from public."NhanVien"');
  if (rs.length == 0) {
    return 0;
  }
  return rs[rs.length - 1].MaNhanVien;
};

exports.getInfo = async function (email) {
  const rs = await db.any(
    'select * from public."NhanVien"where"Email"like $1',
    [email]
  );
  return rs;
};
