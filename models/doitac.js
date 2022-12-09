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

exports.getLastIDCH = async function (id) {
  const rs = await db.any(
    'select * from public."CuaHang" where "MaDoiTac" = $1',
    [id]
  );

  if (rs.length == 0) {
    return 0;
  }
  return rs[rs.length - 1].MaCuaHang;
};

exports.getLastIDMA = async function (idch, iddt) {
  const rs = await db.any('select * from public."ThucDon" ');

  if (rs.length == 0) {
    return 0;
  }
  return rs[rs.length - 1].MaMon;
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

exports.getInfoID = async function (id) {
  const rs = await db.any(
    'select * from public."DoiTac"where"MaDoiTac"like $1',
    [id]
  );
  return rs;
};

exports.getCuaHang = async function (iddt) {
  const rs = await db.any(
    'select * from public."CuaHang"where"MaDoiTac"like $1',
    [iddt]
  );
  return rs;
};

exports.addCuahang = async function (ch) {
  const rs = await db.any(
    `insert into public.\"CuaHang\"(\"MaCuaHang\",\"MaDoiTac\",\"DiaChi\", \"ThoiGianHD\", \"TinhTrang\")
          VALUES ($1, $2, $3, $4, $5) returning *`,
    [ch.mach, ch.madt, ch.dc, ch.tg, ch.tt]
  );
  return rs;
};

exports.deleteCH = async function (idch, iddt) {
  const rs = await db.any(
    'delete from public."CuaHang" where "MaCuaHang" = $1 and "MaDoiTac" = $2 ',
    [idch, iddt]
  );
  return rs;
};

exports.getInfoCuaHang = async function (idch, iddt) {
  const rs = await db.any(
    'select * from public."CuaHang" where "MaCuaHang" = $1 and "MaDoiTac" = $2',
    [idch, iddt]
  );
  return rs;
};

exports.getInfoMonAn = async function (id) {
  const rs = await db.any(
    'select * from public."ThucDon" where "MaMon" = $1 ',
    [id]
  );
  return rs;
};

exports.updateCuaHang = async function (shop) {
  const rs = await db.any(
    'UPDATE public."CuaHang" SET "DiaChi" = $1, "ThoiGianHD" = $2 , "TinhTrang" = $3 WHERE "MaCuaHang" = $4 AND "MaDoiTac" = $5 ',
    [shop.dc, shop.tg, shop.tt, shop.mch, shop.mdt]
  );

  return rs;
};

exports.getMenus = async function (idch, iddt) {
  const rs = await db.any(
    'select * from public."ThucDon" where "MaCuaHang" = $1 and "MaDoiTac" = $2 ',
    [idch, iddt]
  );
  return rs;
};

exports.addMonAn = async function (food) {
  const rs = await db.any(
    `insert into public.\"ThucDon\"(\"MaMon\",\"TenMon\",\"GiaThanh\", \"MieuTa\", \"TinhTrang\", \"MaCuaHang\", \"MaDoiTac\")
          VALUES ($1, $2, $3, $4, $5,$6,$7) returning *`,
    [food.id, food.tenmon, food.gt, food.mt, food.tt, food.chId, food.madt]
  );
  return rs;
};

exports.deleteMA = async function (idma) {
  const rs = await db.any('delete from public."ThucDon" where "MaMon" = $1 ', [
    idma,
  ]);
  return rs;
};

exports.updateMonAn = async function (food) {
  const rs = await db.any(
    'UPDATE public."ThucDon" SET "TenMon" = $1, "GiaThanh" = $2 , "MieuTa" = $3 , "TinhTrang" = $4 WHERE "MaMon" = $5  ',
    [food.namef, food.gt, food.mt, food.tt, food.monanId]
  );

  return rs;
};
