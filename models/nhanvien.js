const { as } = require("pg-promise");
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
  const rs = await db.any('select * from public."NhanVien"where"Email" = $1', [
    email,
  ]);
  return rs;
};

exports.getDSHD = async function () {
  const rs = await db.any('select * from public."HopDong"');

  return rs;
};

exports.getDSHDCD = async function () {
  const rs = await db.any('select * from public."HopDongChoDuyet"');

  return rs;
};

exports.findHD = async function (id) {
  const rs = await db.any(
    'select * from public."HopDongChoDuyet" where "MaHopDong" = $1',
    [id]
  );

  return rs;
};

exports.addHD = async function (hd) {
  const rs = await db.any(
    `insert into public.\"HopDong\"(\"MaHopDong\",\"MaSoThue\",\"NguoiDaiDien\", \"SoChiNhanh\", \"PhiKichHoat\", \"NgayLap\", \"NgayKT\")
          VALUES ($1, $2, $3, $4, $5,$6,$7) returning *`,
    [
      hd.idHDDT,
      hd.MaSoThue,
      hd.NguoiDaiDien,
      hd.SoChiNhanh,
      hd.PhiKichHoat,
      hd.NgayLap,
      hd.NgayKT,
    ]
  );
  return rs;
};

exports.deleteHDCD = async function (id) {
  const rs = await db.any(
    'delete from public."HopDongChoDuyet" where "MaHopDong" = $1',
    [id]
  );
  return rs;
};

exports.getLastHD = async function () {
  const rs = await db.any('select * from public."HopDong"');
  if (rs.length == 0) {
    return 0;
  }
  return rs[rs.length - 1].MaHopDong;
};
