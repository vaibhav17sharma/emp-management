import { authOptions } from "@/lib/auth";
import {
  ChartBar,
  Home,
  Laptop,
  LineChart,
  Package2,
  PanelLeft,
  Search,
  Users2,
} from "lucide-react";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import UserAction from "../common/UserAction";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const BreadcrumbsDynamic = dynamic(
  () => import("../common/BreadCrumbsDynamic"),
  { ssr: false }
);

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky md:border-b-[1px] md:pb-3 top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Description</SheetDescription>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <a
              href="/admin/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Employee Management</span>
            </a>
            <a
              href="/admin/dashboard"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </a>
            <a
              href="/admin/equipments"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Laptop className="h-5 w-5" />
              Assets
            </a>
            <a
              href="/admin/employees"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Employees
            </a>
            <a
              href="/admin/analytics"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <ChartBar className="h-5 w-5" />
              Analytics
            </a>
            <a
              href="/admin/setting"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Settings
            </a>
          </nav>
        </SheetContent>
      </Sheet>
      <BreadcrumbsDynamic home="Dashboard" url="/admin/dashboard" />
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <UserAction session={session} />
    </header>
  );
}
