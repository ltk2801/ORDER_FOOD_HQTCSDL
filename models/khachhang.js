const { pgp, db } = require("../config/connectStr");

exports.addKH = async function (account) {
  const rs = await db.any(
    `insert into public.\"KhachHang\"(\"MaKH\",\"HoTen\",\"SDT\", \"DiaChi\", \"Email\")
          VALUES ($1, $2, $3, $4, $5) returning *`,
    [account.idkh, account.uname, account.sdt, account.dc, account.email]
  );
  return rs;
};

exports.getLastID_KH = async function () {
  const rs = await db.any('select * from public."KhachHang"');
  if (rs.length == 0) {
    return 0;
  }
  return rs[rs.length - 1].MaKH;
};

exports.getInfo = async function (email) {
  const rs = await db.any(
    'select * from public."KhachHang"where"Email"like $1',
    [email]
  );
  return rs;
};
