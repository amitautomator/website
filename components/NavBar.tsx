"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// import { Sun, Moon } from "lucide-react";
// import { useTheme } from "next-themes";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

const navMenu = [
  "Home",
  "Services",
  // "Blog",
  "About Us",
  "Contact Us",
];

function NavBar() {
  const path = usePathname();
  const isActive = (route: string) => route === path;

  // const { theme, setTheme } = useTheme();

  // const toggleTheme = () => {
  //   setTheme(theme === "light" ? "dark" : "light");
  // };

  // console.log(path);

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-3 py-4">
        {/* Left: Logo and Title */}
        <div className="ml-1 flex items-center gap-2 text-lg font-bold whitespace-nowrap sm:mx-1 sm:text-lg md:text-xl lg:text-2xl">
          <Image
            src="/Logo.png"
            alt="Automate Ideas Logo"
            width={50}
            height={50}
            priority
            className="h-auto w-auto"
          />
          Automate Ideas
        </div>

        {/* Middle: Navigation Menu (visible on md and up) */}
        <div className="mr-4 hidden w-fit items-center justify-end gap-3 sm:flex lg:gap-7 lg:text-3xl">
          {navMenu.map((item, index) => {
            const path =
              index === 0 ? "/" : `/${item.replace(" ", "-").toLowerCase()}`;
            return (
              <Link
                key={index}
                href={path}
                prefetch={true}
                className={`font-semibold whitespace-nowrap hover:text-red-500 md:p-1 md:text-lg ${
                  isActive(path)
                    ? "border-b-2 border-b-red-500 text-2xl text-red-500"
                    : ""
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        {/* Right: Mobile Menu Button */}
        <div className="ml-auto flex items-center gap-3 sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white"
              >
                {open ? "" : <Menu />}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="border-b-2 border-b-red-500 px-3 py-2 text-center text-xl font-bold">
                  Menu
                </SheetTitle>
                <SheetDescription aria-description="Menu">
                  {""}
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4">
                {navMenu.map((item, index) => {
                  const path =
                    index === 0
                      ? "/"
                      : `/${item.replace(" ", "-").toLowerCase()}`;
                  return (
                    <SheetClose
                      asChild
                      key={index}
                      onClick={() => setOpen(false)}
                      className="mx-3"
                    >
                      <Link
                        href={path}
                        className={`w-fit hover:text-red-500 ${
                          isActive(path)
                            ? "border-b-2 border-b-red-500 text-red-500"
                            : ""
                        }`}
                      >
                        {item}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
              <SheetFooter />
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}

export default NavBar;
