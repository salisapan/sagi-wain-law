import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/Logo'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { practiceAreas } from '@/data/practiceAreas'
import { cn } from '@/lib/utils'

function NavItem({ to, end, children }: { to: string; end?: boolean; children: React.ReactNode }) {
  return (
    <NavLink to={to} end={end} className="group relative px-1 py-2 text-sm font-medium text-charcoal transition-colors hover:text-gold-dark">
      {({ isActive }) => (
        <>
          <span className={isActive ? 'text-gold-dark' : undefined}>{children}</span>
          <span
            className={cn(
              'absolute inset-x-0 -bottom-0.5 h-[2px] origin-center scale-x-0 bg-gold-metallic transition-transform duration-300 group-hover:scale-x-100',
              isActive && 'scale-x-100',
            )}
          />
        </>
      )}
    </NavLink>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-500',
        scrolled
          ? 'border-b border-gold/20 bg-cream/90 shadow-navy backdrop-blur-xl'
          : 'border-b border-transparent bg-cream/70 backdrop-blur-md',
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-display text-xl font-semibold text-gradient-gold">עו״ד שגיא ויין</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavItem to="/" end>
            בית
          </NavItem>
          <NavItem to="/about">אודות</NavItem>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>תחומי התמחות</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-72 gap-1 p-3">
                    {practiceAreas.map((area) => (
                      <li key={area.slug}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/services/${area.slug}`}
                            className="block rounded-md px-3 py-2 text-sm text-charcoal transition-colors hover:bg-secondary hover:text-gold-dark"
                          >
                            {area.navTitle}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavItem to="/articles">מאמרים</NavItem>
          <NavItem to="/media">מדיה</NavItem>
          <NavItem to="/testimonials">עדויות</NavItem>
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="gold">
            <Link to="/contact">פגישת היכרות חינם</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="פתיחת תפריט">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-xs">
            <SheetHeader>
              <SheetTitle>עו״ד שגיא ויין</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1">
              <SheetClose asChild>
                <NavLink to="/" end className="rounded-md px-3 py-3 text-base font-medium text-charcoal hover:bg-secondary">
                  בית
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink to="/about" className="rounded-md px-3 py-3 text-base font-medium text-charcoal hover:bg-secondary">
                  אודות
                </NavLink>
              </SheetClose>
              <p className="px-3 pt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                תחומי התמחות
              </p>
              {practiceAreas.map((area) => (
                <SheetClose asChild key={area.slug}>
                  <NavLink
                    to={`/services/${area.slug}`}
                    className="rounded-md px-3 py-3 text-base font-medium text-charcoal hover:bg-secondary"
                  >
                    {area.navTitle}
                  </NavLink>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <NavLink to="/articles" className="mt-4 rounded-md px-3 py-3 text-base font-medium text-charcoal hover:bg-secondary">
                  מאמרים
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink to="/media" className="rounded-md px-3 py-3 text-base font-medium text-charcoal hover:bg-secondary">
                  מדיה
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink to="/testimonials" className="rounded-md px-3 py-3 text-base font-medium text-charcoal hover:bg-secondary">
                  עדויות
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild variant="gold" className="mt-4">
                  <Link to="/contact">פגישת היכרות חינם</Link>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
