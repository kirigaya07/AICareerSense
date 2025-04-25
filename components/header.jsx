import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  ChevronDown,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Badge } from "./ui/badge";
import { checkUser } from "@/lib/checkUser";
import { cn } from "@/lib/utils";

// Animated navigation link with hover effect
const NavLink = ({ href, icon: Icon, children, active = false }) => (
  <Link href={href}>
    <Button
      variant={active ? "default" : "ghost"}
      size="sm"
      className={cn(
        "group relative overflow-hidden transition-all px-3",
        active && "bg-primary/10 text-primary hover:bg-primary/20"
      )}
    >
      <div className="flex items-center gap-2">
        <Icon
          className={cn(
            "h-4 w-4 transition-transform group-hover:scale-110",
            active && "text-primary"
          )}
        />
        <span className="hidden md:block"> {children}</span>
      </div>
      {active && (
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
      )}
    </Button>
  </Link>
);

// Consistent sheet menu item with proper hover effect
const SheetMenuItem = ({ href, icon: Icon, children }) => (
  <Link
    href={href}
    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors cursor-pointer"
  >
    <Icon className="h-4 w-4" />
    <span>{children}</span>
  </Link>
);

// Tool dropdown item with enhanced styling
const ToolMenuItem = ({ href, icon: Icon, children, highlight = false }) => (
  <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-md hover:bg-muted transition-colors cursor-pointer",
        highlight && "bg-primary/5"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full",
          highlight ? "bg-primary/10" : "bg-muted"
        )}
      >
        <Icon className={cn("h-4 w-4", highlight && "text-primary")} />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{children}</span>
        {highlight && (
          <span className="text-xs text-muted-foreground">
            Enhanced with AI
          </span>
        )}
      </div>
    </Link>
  </DropdownMenuItem>
);

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-xl z-50 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SignedIn>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader className="mb-6">
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4">
                    <SheetMenuItem href="/dashboard" icon={LayoutDashboard}>
                      Industry Insights
                    </SheetMenuItem>

                    <div className="border-t pt-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">
                        Growth Tools
                      </h3>
                      <div className="space-y-1">
                        <SheetMenuItem href="/resume" icon={FileText}>
                          Build Resume
                        </SheetMenuItem>
                        <SheetMenuItem href="/ai-cover-letter" icon={PenBox}>
                          Cover Letter
                        </SheetMenuItem>
                        <SheetMenuItem href="/interview" icon={GraduationCap}>
                          Interview Prep
                        </SheetMenuItem>
                        <SheetMenuItem href="/tokens" icon={CreditCard}>
                          Buy Tokens
                        </SheetMenuItem>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </SignedIn>

            <Link href="/" className="flex items-center">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="AspireAi logo"
                  width={180}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
                <div className="absolute -right-2 -top-1">
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1 py-0 h-auto bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700"
                  >
                    BETA
                  </Badge>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 md:gap-3">
            <SignedIn>
              {/* Desktop-only navigation items */}
              <div className="hidden md:flex items-center gap-2">
                <NavLink href="/dashboard" icon={LayoutDashboard}>
                  Insights
                </NavLink>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="gap-1.5 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 cursor-pointer">
                      <StarsIcon className="h-4 w-4 text-primary-foreground" />
                      <span className="text-primary-foreground">
                        Growth Tools
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 text-primary-foreground opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 p-2">
                    <DropdownMenuLabel className="px-3 pt-1.5 pb-3 text-base font-medium">
                      Career Growth Tools
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="grid gap-1">
                      <ToolMenuItem href="/resume" icon={FileText} highlight>
                        Build Resume
                      </ToolMenuItem>
                      <ToolMenuItem
                        href="/ai-cover-letter"
                        icon={PenBox}
                        highlight
                      >
                        Cover Letter
                      </ToolMenuItem>
                      <ToolMenuItem
                        href="/interview"
                        icon={GraduationCap}
                        highlight
                      >
                        Interview Prep
                      </ToolMenuItem>
                      <DropdownMenuSeparator />
                      <ToolMenuItem href="/tokens" icon={CreditCard}>
                        Buy Tokens
                      </ToolMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="flex items-center gap-3 pl-2">
                <SignInButton asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 cursor-pointer"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton asChild>
                  <Button
                    size="sm"
                    className="h-9 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 cursor-pointer"
                  >
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 border-2 border-primary/20",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold",
                  },
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
