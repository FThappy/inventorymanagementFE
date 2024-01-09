import { FaCheck } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { RiArrowDropDownLine, RiArrowRightDoubleLine } from "react-icons/ri";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import React from "react";
import './ListItem.css';

const ListItem = () => {
  return (
    <div className="itemContainer font-sans">
      <div className="flex-row mx-1">
        <div className="py-4 px-2.5 w-fit float-left">
          <div className="flex flex-row">
            <div className="pr-2.5 pl-3 text-green-600 pt-1"><FaCheck /></div>
            {/* <div className=''>afjh</div> */}
            <div className='text-lg pr-4'> Tất cả sản phẩm</div>
          </div>
          <div className="border-b-[3px] border-b-zinc-950"></div>
        </div>
        <div className="text-lg bg-[#33A0FF] w-fit text-white flex flex-row h-[40px] float-right">
          <IoIosAdd className="text-2xl mt-2 ml-1" />
          <p className="pt-1.5 pr-3">Thêm sản phẩm</p>
        </div>
      </div>

      <div className="flex flex-row mt-[65px] ml-3 opacity-[60%]">
        <div className="flex flex-row rounded-md border-2 border-slate-600 w-[60%]">
          <BsSearch className="mt-3 mx-2" />
          <p className=" opacity-[60%] my-2">Tìm kiếm theo mã sản phẩm, tên sản phẩm, barcode</p>
        </div>
        <div className="ml-16 w-[13%] opacity-[60%]">
          <div className="flex flex-row rounded-md border-2 border-black">
            <p className=" my-2 ml-3">Loại sản phẩm</p>
            <RiArrowDropDownLine className="mt-1.5 ml-2 text-3xl" />
          </div>
        </div>
        <div className="ml-5 w-[10%] opacity-[60%]">
          <div className="flex flex-row rounded-md border-2 border-black">
            <p className="my-2 ml-3">Ngày tạo</p>
            <RiArrowDropDownLine className="mt-1.5 ml-2 text-3xl" />
          </div>
        </div>
        <div className="ml-5 w-[10%] opacity-[60%]">
          <div className="flex flex-row rounded-md border-2 border-black ">
            <p className="my-2 ml-3">Nhãn hiệu</p>
            <RiArrowDropDownLine className="mt-1.5 ml-2 text-3xl" />
          </div>
        </div>
        <BiSend className="ml-7 mr-10 mt-2 text-3xl " />
      </div>

      <div className="flex flex-row bg-[#D9D9D957] h-[46px] mt-5 justify-between">
        <div className="rounded-full w-4 h-4 border-2 border-slate-500 mt-4 ml-16"></div>
        <div className="ml-[35px] mt-3">Ảnh</div>
        <div className="ml-[88px] mt-3">Sản phẩm</div>
        <div className="ml-[267px] mt-3">Nhãn hiệu</div>
        <div className="ml-[61px] mt-3">Có thể bán</div>
        <div className="ml-[55px] mt-3">Tồn kho</div>
        <div className="ml-[61px] mt-3 mr-14">Ngày khởi tạo</div>
      </div>

      <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[46px] justify-between mt-1">
        <RiArrowRightDoubleLine className="mt-2 text-xl ml-6" />
        <span className="rounded-full w-4 h-4 border-2 border-slate-500 mt-3 -ml-10"></span>
        <div className="mt-0.5 ml-5">
          <img src="..\..\..\public\test_img.jpg" alt="" className="w-[43px] h-[39px]" />
        </div>
        <div className="ml-[64px] mt-2">Quần jeans nữ</div>
        <div className="ml-[267px] mt-2">Quần</div>
        <div className="ml-[103px] mt-2">243</div>
        <div className="ml-[88px] mt-2">243</div>
        <div className="ml-[76px] mt-2 mr-16">20/12/2023</div>
      </div>

      <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[46px] justify-between mt-1">
        <RiArrowRightDoubleLine className="mt-2 text-xl ml-6" />
        <span className="rounded-full w-4 h-4 border-2 border-slate-500 mt-3 -ml-10"></span>
        <div className="mt-0.5 ml-5">
          <img src="..\..\..\public\test_img.jpg" alt="" className="w-[43px] h-[39px]" />
        </div>
        <div className="ml-[64px] mt-2">Quần jeans nữ</div>
        <div className="ml-[267px] mt-2">Quần</div>
        <div className="ml-[103px] mt-2">243</div>
        <div className="ml-[88px] mt-2">243</div>
        <div className="ml-[76px] mt-2 mr-16">20/12/2023</div>
      </div>

      <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[46px] justify-between mt-1">
        <RiArrowRightDoubleLine className="mt-2 text-xl ml-6" />
        <span className="rounded-full w-4 h-4 border-2 border-slate-500 mt-3 -ml-10"></span>
        <div className="mt-0.5 ml-5">
          <img src="..\..\..\public\test_img.jpg" alt="" className="w-[43px] h-[39px]" />
        </div>
        <div className="ml-[64px] mt-2">Quần jeans nữ</div>
        <div className="ml-[267px] mt-2">Quần</div>
        <div className="ml-[103px] mt-2">243</div>
        <div className="ml-[88px] mt-2">243</div>
        <div className="ml-[76px] mt-2 mr-16">20/12/2023</div>
      </div>

      <div className="h-[383px] bg-[#fbf8f8] justify-between">
        <div className="flex flex-row justify-between">
          <MdKeyboardDoubleArrowDown className="mt-2 text-xl ml-6 text-[#33A0FF]" />
          <span className="rounded-full w-4 h-4 border-2 border-slate-500 mt-3 -ml-10"></span>
          <div className="mt-0.5 ml-5">
            <img src="..\..\..\public\test_img.jpg" alt="" className="w-[43px] h-[39px]" />
          </div>
          <div className="ml-[64px] mt-2">Quần jeans nữ</div>
          <div className="ml-[267px] mt-2">Quần</div>
          <div className="ml-[103px] mt-2">243</div>
          <div className="ml-[88px] mt-2">243</div>
          <div className="ml-[76px] mt-2 mr-16">20/12/2023</div>
        </div>

        <div className="detail">
          <div className="w-11/12 h-[303px] m-auto mt-1 rounded border-[1px] border-black bg-white overflow-y-auto">
            <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[46px] justify-between mt-1 font-medium">
              <div className="ml-48 mt-2">Phiên bản</div>
              <div className="ml-[425px] mt-2">Có thể bán</div>
              <div className="ml-[50px] mt-2">Tồn kho</div>
              <div className="ml-[71px] mt-2 mr-24">Giá nhập</div>
            </div>

            <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[50px] justify-between mt-1">
              <div className="mt-0.5 ml-16">
                <img src="..\..\..\public\test_img.jpg" alt="" className="w-[43px] h-[39px]" />
              </div>
              <div className="-ml-2 ">
                <p className="text-[#2C7CC5]">Áo - M - Xanh - Vải cotton</p>
                <p className="text-sm">ao_01-M-X-V</p>
              </div>
              <div className="ml-[356px] mt-2">243</div>
              <div className="ml-[104px] mt-2">243</div>
              <div className="ml-[84px] mt-2 mr-24">100,000</div>
            </div>

            <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[50px] justify-between mt-1">
              <div className="mt-0.5 ml-16">
                <img src="..\..\..\public\test_img.jpg" alt="" className="w-[43px] h-[39px]" />
              </div>
              <div className="-ml-2 ">
                <p className="text-[#2C7CC5]">Áo - M - Xanh - Vải cotton</p>
                <p className="text-sm">ao_01-M-X-V</p>
              </div>
              <div className="ml-[356px] mt-2">243</div>
              <div className="ml-[104px] mt-2">243</div>
              <div className="ml-[84px] mt-2 mr-24">100,000</div>
            </div>

            <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[50px] justify-between mt-1">
              <div className="mt-0.5 ml-16">
                <img src="..\..\..\public\test_img.jpg" alt="" className="w-[43px] h-[39px]" />
              </div>
              <div className="-ml-2 ">
                <p className="text-[#2C7CC5]">Áo - M - Xanh - Vải cotton</p>
                <p className="text-sm">ao_01-M-X-V</p>
              </div>
              <div className="ml-[356px] mt-2">243</div>
              <div className="ml-[104px] mt-2">243</div>
              <div className="ml-[84px] mt-2 mr-24">100,000</div>
            </div>

            <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[50px] justify-between mt-1">
              <div className="mt-0.5 ml-16">
                <img src="..\..\..\public\test_img.jpg" alt="" className="w-[43px] h-[39px]" />
              </div>
              <div className="-ml-2 ">
                <p className="text-[#2C7CC5]">Áo - M - Xanh - Vải cotton</p>
                <p className="text-sm">ao_01-M-X-V</p>
              </div>
              <div className="ml-[356px] mt-2">243</div>
              <div className="ml-[104px] mt-2">243</div>
              <div className="ml-[84px] mt-2 mr-24">100,000</div>
            </div>

            <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[50px] justify-between mt-1">
              <div className="mt-0.5 ml-16">
                <img src="..\..\..\public\test_img.jpg" alt="" className="w-[43px] h-[39px]" />
              </div>
              <div className="-ml-2 ">
                <p className="text-[#2C7CC5]">Áo - M - Xanh - Vải cotton</p>
                <p className="text-sm">ao_01-M-X-V</p>
              </div>
              <div className="ml-[356px] mt-2">243</div>
              <div className="ml-[104px] mt-2">243</div>
              <div className="ml-[84px] mt-2 mr-24">100,000</div>
            </div>

            <div className="flex flex-row border-b-2 border-b-[#D9D9D957] h-[50px] justify-between mt-1">
              <div className="mt-0.5 ml-16">
                <img src="..\..\..\public\test_img.jpg" alt="" className="w-[43px] h-[39px]" />
              </div>
              <div className="-ml-2 ">
                <p className="text-[#2C7CC5]">Áo - M - Xanh - Vải cotton</p>
                <p className="text-sm">ao_01-M-X-V</p>
              </div>
              <div className="ml-[356px] mt-2">243</div>
              <div className="ml-[104px] mt-2">243</div>
              <div className="ml-[84px] mt-2 mr-24">100,000</div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default ListItem
