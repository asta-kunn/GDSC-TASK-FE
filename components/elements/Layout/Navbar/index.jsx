import React from "react";
import MenuDropdownHover from "./MenuDropdownHover";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavbarMobile } from "./NavbarMobile";
import { NAV_ROUTE } from "@/constants";

export const Navbar = () => {
  const router = useRouter();
  return (
    <div className="fixed z-[100] items-center h-16 top-0 w-full text-white flex flex-row justify-between px-10 py-4 bg-indigo-900">
      <a className="text-xl font-bold" href="/">
        TODOS BY Rifqi
      </a>
      <div className="flex justify-end items-center">
        <div className="hidden md:flex flex-row gap-10 ">
          {NAV_ROUTE.map(({ id, href, name, dropdownMenu }) => {
            return !!dropdownMenu ? (
              <MenuDropdownHover key={id} name={name} menuItems={dropdownMenu} />
            ) : (
              <Link key={id} href={href}>
                <div>
                  <button
                    className={
                      router.asPath === href
                        ? "font-semibold text-[16px] text-sky-200"
                        : "text-[16px] text-white"
                    }
                  >
                    {name}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="md:hidden">
          <NavbarMobile />
        </div>
      </div>
    </div>
  );
};