const { pgp, db } = require("../config/connectStr");

exports.AddDT = async function (account) {
  console.log(account);
  // const rs = await db.any(
  //     `insert into public.\"DoiTac\"(\"MaDoiTac\",\"NguoiDaiDien\", \"DiaChiDoiTac\", \"DiaChiKinhDoanh\", \"Email\",\"SDT\",\"TenQuanAn\",\"LoaiThucPham\",\"SoluongDHHangNgay\")
  //         VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9) returning *`,
  //     [account.id, account.email, account.password, account.name, account.dob]
  //   );
  //   return rs;
};

exports.getLastIDM = async function () {
  const rs = await db.any('select * from public."DoiTac"');
  console.log(rs);
  // return rs[rs.length - 1].MaDoiTac;
};

exports.AddHDCD = async function (account) {
  // const rs = await db.any(
  //     `insert into public.\"HopDongChoDuyet\"(\"MaHopDong\",\"MaSoThue\", \"NguoiDaiDien\", \"SoChiNhanh\", \"PhiKichHoat\", \"NgayLap\", \"NgayKT\")
  //         VALUES ($1, $2, $3, $4, $5,$6,$7) returning *`,
  //     [account.id, account.email, account.password, account.name, account.dob]
  //   );
  //   return rs;
  console.log(account);
};
