import "./ProductDetail.css";
import React from "react";

const ItemDetail = () => {
    return (
        <div className="bg-[#F0F1F1] mt-1 h-full">
            <div className="w-11/12 m-auto pt-5 ml-24">
                <div>
                    <h1 className="text-[25px] font-bold ">Item Detail</h1>
                </div>
                <div className="w-11/12 h-[150px] flex bg-white mt-2">
                    <div className="flex w-1/2">
                        <div className="ml-7">
                            <p className="pt-2">Trạng thái</p>
                            <p className="pt-4">Nhãn hiệu</p>
                            <p className="pt-3">Ngày tạo</p>
                            <p className="pt-3">Ngày cập nhật</p>
                        </div>
                        <div className="ml-16">
                            <div className="pt-2 "><p className="rounded-full border-2 p-1 pl-3 bg-[#FFF7E7] border-[#FFDF9B] text-[#F9B016]">Đang giao dịch</p></div>
                            <p className="pt-1">: Quần</p>
                            <p className="pt-3">: 20/12/2023 09:26</p>
                            <p className="pt-3">: 20/12/2023 09:26</p>
                        </div>
                    </div>
                    <div className="flex w-1/2 justify-end">
                        <img src="..\..\..\public\test_img.jpg" alt="" className="w-[95px] h-[100px] mt-10 mr-2" />
                        <img src="..\..\..\public\test_img.jpg" alt="" className="w-[95px] h-[100px] mt-10 mr-2" />
                        <img src="..\..\..\public\test_img.jpg" alt="" className="w-[95px] h-[100px] mt-10 mr-2" />
                        {/* <img src="..\..\..\public\test_img.jpg" alt="" className="w-[95px] h-[100px] mt-10 mr-2" /> */}
                        {/* <img src="..\..\..\public\test_img.jpg" alt="" className="w-[95px] h-[100px] mt-10 mr-2" /> */}
                        <div className="w-[95px] h-[100px] mt-10 mr-2 bg_item">
                            <p className=" text-center text-2xl mt-7"> + 2</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-11/12 m-auto pt-7 ml-24 h-3/4">
                <div>
                    <h1 className="text-[25px] ">Số lượng phiên bản (20)</h1>
                </div>

                <div className="flex flex-row w-full h-full mb-10">

                    <div className="w-1/3 h-[600px] bg-white mt-2 mr-10 overflow-y-auto">

                        <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[52px] justify-between w-full">
                            <div className="mt-1 ml-11">
                                <img src="..\..\..\public\test_img.jpg" alt="" className="w-[47px] h-[43px]" />
                            </div>
                            <div className="mr-[120px] mt-1">
                                <p className="text-[#2C7CC5]">Áo - M - Xanh - Vải cotton</p>
                                <p className="text-sm">ao_01-M-X-V</p>
                            </div>
                        </div>

                        <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[52px] justify-between w-full">
                            <div className="mt-1 ml-11">
                                <img src="..\..\..\public\test_img.jpg" alt="" className="w-[47px] h-[43px]" />
                            </div>
                            <div className="mr-[120px] mt-0.5">
                                <p className="text-[#2C7CC5]">Áo - M - Xanh - Vải cotton</p>
                                <p className="text-sm">ao_01-M-X-V</p>
                            </div>
                        </div>

                        <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[52px] justify-between w-full">
                            <div className="mt-1 ml-11">
                                <img src="..\..\..\public\test_img.jpg" alt="" className="w-[47px] h-[43px]" />
                            </div>
                            <div className="mr-[120px] mt-0.5">
                                <p className="text-[#2C7CC5]">Áo - M - Xanh - Vải cotton</p>
                                <p className="text-sm">ao_01-M-X-V</p>
                            </div>
                        </div>

                        <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[52px] justify-between w-full">
                            <div className="mt-1 ml-11">
                                <img src="..\..\..\public\test_img.jpg" alt="" className="w-[47px] h-[43px]" />
                            </div>
                            <div className="mr-[120px] mt-0.5">
                                <p className="text-[#2C7CC5]">Áo - M - Xanh - Vải cotton</p>
                                <p className="text-sm">ao_01-M-X-V</p>
                            </div>
                        </div>

                        <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[52px] justify-between w-full">
                            <div className="mt-1 ml-11">
                                <img src="..\..\..\public\test_img.jpg" alt="" className="w-[47px] h-[43px]" />
                            </div>
                            <div className="mr-[120px] mt-0.5">
                                <p className="text-[#2C7CC5]">Áo - M - Xanh - Vải cotton</p>
                                <p className="text-sm">ao_01-M-X-V</p>
                            </div>
                        </div>

                        <div className="flex flex-row border-b-2 border-b-[#D9D9D957] bg-[#D9D9D957] h-[52px] justify-between w-full">
                            <div className="mt-1 ml-11">
                                <img src="..\..\..\public\test_img.jpg" alt="" className="w-[47px] h-[43px]" />
                            </div>
                            <div className="mr-[120px] mt-0.5">
                                <p className="text-[#2C7CC5]">Áo - M - Xanh - Vải cotton</p>
                                <p className="text-sm">ao_01-M-X-V</p>
                            </div>
                        </div>
                        <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[52px] justify-between w-full">
                            <div className="mt-1 ml-11">
                                <img src="..\..\..\public\test_img.jpg" alt="" className="w-[47px] h-[43px]" />
                            </div>
                            <div className="mr-[120px] mt-0.5">
                                <p className="text-[#2C7CC5]">Áo - M - Xanh - Vải cotton</p>
                                <p className="text-sm">ao_01-M-X-V</p>
                            </div>
                        </div>
                    </div>


                    <div className="w-[55%] h-5/6 bg-white mt-2">
                        <div className="h-[40px] border-b-2 border-b-[#D9D9D957]">
                            <p className="font-bold pt-2  px-5">Thông tin chi tiết phiên bản</p>
                        </div>
                        <div className="px-5 pt-3 flex">
                            <div className="">
                                <div className="pl-3 font-medium">
                                    <p>Tên phiên bản sản phẩm</p>
                                    <p className="mt-2">Mã SKU</p>
                                    <p className="mt-2">Khối lượng</p>
                                    <p className="mt-2">Kích thước</p>
                                    <p className="mt-2">Màu sắc</p>
                                    <p className="mt-2">Chất liệu</p>
                                    <p className="mt-2">Giá nhập</p>
                                    <p className="mt-2">Tồn kho</p>
                                    <p className="mt-2">Có thể bán</p>
                                </div>
                            </div>
                            <div className="ml-5 font-medium">
                                <p className="text-[#2C7CC5]">: Áo - M - Xanh - Vải cotton</p>
                                <p className="mt-2">: ao_01-M-X-V</p>
                                <p className="mt-2">: 1.5 kg</p>
                                <p className="mt-2">: M</p>
                                <p className="mt-2">: Xanh</p>
                                <p className="mt-2">: Vải cotton</p>
                                <p className="mt-2">: 100,000</p>
                                <p className="mt-2">: 250</p>
                                <p className="mt-2">: 250</p>
                            </div>
                            <div className="w-[196px] h-[187px] mt-10">
                                <img src="..\..\..\public\test_img.jpg" alt="" />
                            </div>
                        </div>
                        <div className="flex">
                            <p className="min-w-fit pl-8 font-medium mt-5">Mô tả</p>
                            <p className="pl-5 pr-10 pt-3 font-medium mt-2 font-mono text-[14px]">Quần Jean Ống Rộng Nữ Wash Bụi Màu Đen Và Xanh Lưng Cao Phong Cách Retro Ulzzang Hàn Quốc 460 552 317 315
                                Với thiết kế rộng rãi, thoải mái, Quần Jean Ống Rộng vừa đảm bảo sự an toàn cho nữ giới khi mặc nhưng cũng vô cùng mềm mại, nữ tính.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ItemDetail;