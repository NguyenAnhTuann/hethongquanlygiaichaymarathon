DROP DATABASE IF EXISTS marathon;
CREATE DATABASE marathon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE marathon;

CREATE TABLE VANDONGVIEN (
    ma_vdv INT PRIMARY KEY AUTO_INCREMENT,
    hoten VARCHAR(100),
    ngaysinh DATE,
    gioitinh ENUM('Nam', 'Nữ', 'Khác'),
    cccd VARCHAR(20),
    diachi VARCHAR(255),
    sdt VARCHAR(15)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE CULY (
    ma_culy INT PRIMARY KEY AUTO_INCREMENT,
    tenculy VARCHAR(100),
    thoigian_xuatphat TIME,
    diadiem_taptrung VARCHAR(255)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE PHIEUDANGKY (
    ma_phieu INT PRIMARY KEY AUTO_INCREMENT,
    ngay_dangky DATE,
    lephi DECIMAL(10,2),
    ma_vdv INT,
    ma_culy INT,
    FOREIGN KEY (ma_vdv) REFERENCES VANDONGVIEN(ma_vdv),
    FOREIGN KEY (ma_culy) REFERENCES CULY(ma_culy)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE KETQUA (
    ma_ketqua INT PRIMARY KEY AUTO_INCREMENT,
    ma_vdv INT,
    ma_culy INT,
    thoigian_hoanthanh TIME,
    hang INT,
    ghichu TEXT,
    FOREIGN KEY (ma_vdv) REFERENCES VANDONGVIEN(ma_vdv),
    FOREIGN KEY (ma_culy) REFERENCES CULY(ma_culy)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE DIEMHOTRO (
    ma_diem INT PRIMARY KEY AUTO_INCREMENT,
    ten_diem VARCHAR(100),
    loai_hotro VARCHAR(100),
    vitri VARCHAR(255)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE TINHNGUYENVIEN (
    ma_tnv INT PRIMARY KEY AUTO_INCREMENT,
    hoten VARCHAR(100),
    namsinh YEAR,
    sdt VARCHAR(15),
    nhiemvu VARCHAR(100),
    ma_diem INT,
    FOREIGN KEY (ma_diem) REFERENCES DIEMHOTRO(ma_diem)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE NHATAITRO (
    ma_nhataitro INT PRIMARY KEY AUTO_INCREMENT,
    ten_nhataitro VARCHAR(100),
    diachi VARCHAR(255),
    sotien DECIMAL(15,2),
    danhsach_vatpham TEXT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE HOPDONGTAITRO (
    ma_hopdong INT PRIMARY KEY AUTO_INCREMENT,
    ngay_ky DATE,
    nguoi_daidien VARCHAR(100),
    giatri_hopdong DECIMAL(15,2),
    danhsach_vatpham TEXT,
    ma_nhataitro INT,
    FOREIGN KEY (ma_nhataitro) REFERENCES NHATAITRO(ma_nhataitro)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
