const { pgp, db } = require("../config/connectStr");

exports.AddDT = async function (account) {
  const rs = await db.any(
    `insert into public.\"DoiTac\"(\"MaDoiTac\",\"TenDoiTac\",\"NguoiDaiDien\", \"DiaChiDoiTac\", \"DiaChiKinhDoanh\", \"Email\",\"SDT\",\"TenQuanAn\",\"LoaiThucPham\",\"SoluongDHHangNgay\")
          VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10) returning *`,
    [
      account.iddt,
      account.uname,
      account.ndd,
      account.dcdt,
      account.dckd,
      account.email,
      account.sdt,
      account.tqa,
      account.lat,
      account.sld,
    ]
  );
  return rs;
};

exports.getLastIDDT = async function () {
  const rs = await db.any('select * from public."DoiTac"');

  return rs[rs.length - 1].MaDoiTac;
};

exports.getLastIDHDCD = async function () {
  const rs = await db.any('select * from public."HopDongChoDuyet"');
  if (rs.length == 0) {
    return 1;
  }
  return rs[rs.length - 1].MaHopDong;
};

exports.AddHDCD = async function (account) {
  const rs = await db.any(
    `insert into public.\"HopDongChoDuyet\"(\"MaHopDong\",\"MaSoThue\", \"NguoiDaiDien\", \"SoChiNhanh\", \"PhiKichHoat\", \"NgayLap\", \"NgayKT\")
          VALUES ($1, $2, $3, $4, $5,$6,$7) returning *`,
    [
      account.idhd,
      account.iddt,
      account.ndd,
      account.scn,
      1000000,
      account.nbd,
      account.nkt,
    ]
  );
  return rs;
};

exports.getInfo = async function (email) {
  const rs = await db.any('select * from public."DoiTac"where"Email"like $1', [
    email,
  ]);
  return rs;
};
