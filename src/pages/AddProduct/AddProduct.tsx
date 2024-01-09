import "./AddProduct.css";
import React from "react";

const ItemDetail = () => {
    return (
        <div className="bg-[#F0F1F1] h-full">
            <div className="flex w-11/12 mx-[60px] pt-7">
                <div className="w-[55%]">
                    <div className="h-[440px] bg-white mr-10">
                        <div className="h-[40px] border-b-2 border-b-[#D9D9D957]">
                            <p className="font-bold pt-2  px-5">Thông tin chung</p>
                        </div>
                        <div className="mx-14 mt-2">
                            <form action="">
                                <label htmlFor="ten_sp" className="flex">Tên sản phẩm <p className="text-red-600">&nbsp;*</p></label>
                                <input type="text" id="ten_sp" placeholder="Nhập tên sản phẩm" className="border-[1px] border-slate-500 rounded w-full p-1 mt-1" required />
                                <div className="flex">
                                    <div className="w-2/3 mt-2">
                                        <label htmlFor="ma_sp" className="flex">Mã sản phẩm / SKU <p className="text-red-600">&nbsp;*</p></label>
                                        <input type="text" id="ma_sp" placeholder="Nhập mã sản phẩm / SKU" className="border-[1px] border-slate-500 rounded w-full p-1 mt-1" required />
                                    </div>
                                    <div className="w-1/3 mt-2 ml-5">
                                        <label htmlFor="khoi_luong" className="flex">Khối lượng</label>
                                        <input type="number" id="khoi_luong" placeholder="Đơn vị: KG" className="border-[1px] border-slate-500 rounded w-full p-1 mt-1" />
                                    </div>
                                </div>
                                <label htmlFor="mo_ta" className="flex mt-3">Mô tả <p className="text-red-600">&nbsp;*</p></label>
                                <textarea name="mo_ta" id="mo_ta" placeholder="Nhập mô tả ( Tối đa 200 ký tự )" maxLength={200} className="border-[1px] border-slate-500 rounded w-full p-1 mt-1 pb-[145px]" required></textarea>
                                {/* <input type="text" id="name_product" placeholder="Nhập mô tả ..." className="border-[1px] border-slate-500 rounded w-full p-1 mt-1 pb-[160px]" required />  */}
                            </form>
                        </div>
                    </div>

                    <div className="h-[210px] bg-white mr-10 mt-3">
                        <div className="h-[40px] border-b-2 border-b-[#D9D9D957]">
                            <p className="font-bold pt-2  px-5">Giá sản phẩm</p>
                        </div>
                        <div className="mx-14 mt-2">
                            <form action="">
                                <div className="flex">
                                    <div className="w-1/2">
                                        <label htmlFor="gia_buon" className="flex">Giá bán buôn </label>
                                        <input type="text" id="gia_buon" className="border-[1px] border-slate-500 rounded w-full p-1 mt-1" />
                                    </div>
                                    <div className="w-1/2 ml-5">
                                        <label htmlFor="gia_nhap" className="flex">Giá nhập</label>
                                        <input type="text" id="gia_nhap" className="border-[1px] border-slate-500 rounded w-full p-1 mt-1" />
                                    </div>
                                </div>
                                <label htmlFor="gia_le" className="flex  mt-2">Giá bán lẻ</label>
                                <input type="text" id="gia_le" className="border-[1px] border-slate-500 rounded w-full p-1 mt-1" />
                            </form>
                        </div>
                    </div>

                    <div className="h-[140px] bg-white mr-10 mt-3">
                        <div className="h-[40px] border-b-2 border-b-[#D9D9D957]">
                            <p className="font-bold pt-2  px-5">Ảnh sản phẩm</p>
                        </div>
                        <div className="flex mx-14 mt-1 w-11/12 pr-3 justify-end h-full">
                            <div className="w-[15%] h-[65%] bg-[#F0F1F1] text-center pt-8"><button>+</button></div>
                            {/* <img src="..\..\..\public\test_img.jpg" alt="" className="w-[90px] h-[90px]"/> */}
                        </div>
                    </div>
                </div>
                <div className="w-2/5 h-[600px] bg-white">
                    <div className="h-[210px] bg-white mr-10 mt-3">
                        <div className="h-[40px] border-b-2 border-b-[#D9D9D957]">
                            <p className="font-bold pt-2  px-5">Giá sản phẩm</p>
                        </div>
                        <div className="mx-14 mt-2">
                            <form action="">
                                <label htmlFor="nhan_hieu" className="flex  mt-2">Nhãn hiệu</label>
                                <input type="text" id="nhan_hieu" className="border-[1px] border-slate-500 rounded w-full p-1 mt-1" />

                                <label htmlFor="tag_product" className="flex  mt-2">Tag</label>
                                <textarea name="tag_product" id="tag_product" maxLength={100} className="border-[1px] border-slate-500 rounded w-full p-1 mt-1 pb-[80px]"></textarea>
                                {/* <input type="text" id="name_product" className="border-[1px] border-slate-500 rounded w-full p-1 mt-1" required /> */}

                                <label htmlFor="so_luong" className="flex  mt-2">Số lượng</label>
                                <input type="number" id="so_luong" className="border-[1px] border-slate-500 rounded w-full p-1 mt-1" />

                                <label htmlFor="kich_thuoc" className="flex  mt-2">Kích thước</label>
                                <input type="number" id="kich_thuoc" className="border-[1px] border-slate-500 rounded w-full p-1 mt-1" />

                                <label htmlFor="mau_sac" className="flex  mt-2">Màu sắc</label>
                                <input type="text" id="mau_sac" className="border-[1px] border-slate-500 rounded w-full p-1 mt-1" />

                                <label htmlFor="chat_lieu" className="flex  mt-2">Chất liệu</label>
                                <input type="text" id="chat_lieu" className="border-[1px] border-slate-500 rounded w-full p-1 mt-1" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;