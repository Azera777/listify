"use client";

import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopover } from "@/components/form/form-popover";

export const Navbar = () => {
  const pathname = usePathname();
  const isBoardPage = pathname?.includes("/board");

  return (
    <nav className="fixed z-50 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex ml-4">
          <Logo />
        </div>

        {!isBoardPage && (
          <>
            <FormPopover align="start" side="bottom" sideOffset={18}>
              <Button
                size="sm"
                className="rounded-sm hidden md:block h-auto py-2 px-2"
              >
                Create
              </Button>
            </FormPopover>
            <FormPopover>
              <Button size="sm" className="rounded-sm block md:hidden">
                <Plus className="h-4 w-4" />
              </Button>
            </FormPopover>
          </>
        )}
      </div>

      <div className="ml-auto flex items-center gap-x-2 mr-4">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};
