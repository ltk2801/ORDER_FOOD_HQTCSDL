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

exports.getDT = async function () {
  const rs = await db.any('select * from public."DoiTac" ');

  return rs;
};

exports.getMenu = async function (id) {
  const rs = await db.any(
    'select * from public."ThucDon" where "MaMon" like $1 ',
    [id]
  );

  return rs;
};

exports.getLastID_Carts = async function () {
  const rs = await db.any('select * from public."Carts"');
  if (rs.length == 0) {
    return 0;
  }
  return rs[rs.length - 1].ID;
};

exports.addCart = async function (info) {
  const rs = await db.any(
    `insert into public.\"Carts\"(\"ID\",\"MaMon\",\"TenMon\", \"GiaThanh\", \"SoluongMon\", \"TongGia\")
          VALUES ($1, $2, $3, $4, $5,$6) returning *`,
    [
      info.idCart,
      info.MonAn.MaMon,
      info.MonAn.TenMon,
      info.MonAn.GiaThanh,
      info.sl,
      info.TongGia,
    ]
  );
  return rs;
};

exports.addTongGia = async function () {
  const rs = await db.any('select sum("TongGia") from public."Carts" ');

  return rs[0];
};

exports.getCart = async function () {
  const rs = await db.any('select * from public."Carts" ');
  return rs;
};

exports.deleteCart = async function () {
  const rs = await db.any('delete from public."Carts" ');

  return rs;
};

exports.deleteMonAnCart = async function (id) {
  const rs = await db.any('delete from public."Carts" where "ID" = $1 ', [id]);
  return rs;
};

exports.getLastID_DH = async function () {
  const rs = await db.any('select * from public."DonHang" ORDER BY "MaDH" ');
  if (rs.length == 0) {
    return 0;
  }
  return rs[rs.length - 1].MaDH;
};

exports.addDH = async function (info) {
  const rs = await db.any(
    `insert into public.\"DonHang\"(\"MaDH\",\"MaKH\",\"HinhThucTT\", \"TinhTrangDH\", \"TongGia\", \"TaiXe\")
          VALUES ($1, $2, $3, $4, $5,$6) returning *`,
    [info.madh, info.mkh, info.ht, "Đang chờ nhận đơn", info.tonggia, null]
  );
  return rs;
};

exports.addCTDH = async function (info) {
  info.carts.map(async (data) => {
    const rs = await db.any(
      `insert into public.\"CTDH\"(\"MaDH\",\"MaMon\",\"SoluongMon\",\"MaCuaHang\",\"MaDoiTac\")
            VALUES ($1, $2, $3,$4,$5) returning *`,
      [info.madh, data.MaMon, data.SoluongMon, info.idCH, info.idDT]
    );
  });
};

exports.getInfoChDt = async function (idMon) {
  const rs = await db.any(
    'select "MaCuaHang","MaDoiTac" from public."ThucDon" where "MaMon" = $1 ',
    [idMon]
  );
  return rs;
};

exports.getDH = async function (id) {
  const rs = await db.any('select * from public."DonHang" where "MaKH" = $1 ', [
    id,
  ]);
  return rs;
};

exports.getCTDH = async function (id) {
  const rs = await db.any(
    'SELECT CTDH.* FROM public."DonHang" as DH Inner join public."CTDH" as CTDH ON DH."MaDH" = CTDH."MaDH" AND DH."MaDH" = $1',
    [id]
  );
  return rs;
};

exports.getInfoMon = async function (info) {
  const infos = info.map(async (data) => {
    const rs = await db.any(
      'SELECT * FROM public."CTDH" as CTDH Inner join public."ThucDon" as TD ON CTDH."MaMon" = TD."MaMon" AND CTDH."MaMon" = $1 AND CTDH."MaDH" = $2 ',
      [data.MaMon, data.MaDH]
    );
    return rs[0];
  });
  return Promise.all(infos);
};

exports.getDH_ID = async function (id) {
  const rs = await db.any('select * from public."DonHang" where "MaDH" = $1 ', [
    id,
  ]);
  return rs;
};

exports.deleteCTDH = async function (id) {
  const rs = await db.any('delete from public."CTDH" where "MaDH" = $1 ', [id]);

  return rs;
};

exports.deleteDH = async function (id) {
  const rs = await db.any('delete from public."DonHang" where "MaDH" = $1 ', [
    id,
  ]);

  return rs;
};
