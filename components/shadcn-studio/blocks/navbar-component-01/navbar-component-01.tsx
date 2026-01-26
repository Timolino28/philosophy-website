"use client"

import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import Logo from '@/components/shadcn-studio/logo'

type NavigationItem = {
  title: string
  href: string
}[]

const Navbar = ({ navigationData }: { navigationData: NavigationItem }) => {
  return (
    <header className='bg-background sticky top-0 z-50'>
      <div className='relative mx-auto flex max-w-7xl items-center justify-between px-4 py-7 sm:px-6'>
        <div className='flex items-center'>
          <a href='/'>
            <Logo className='text-foreground' />
          </a>
        </div>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 font-medium lg:gap-16 text-muted-foreground'>
          <a href='/single-quote' className='hover:text-primary max-md:hidden'>
            Quotes
          </a>
          <a href='/authors' className='hover:text-primary max-md:hidden'>
            Authors
          </a>
        </div>
        <div className='flex items-center gap-6'>
          <DropdownMenu>
            <DropdownMenuTrigger className='md:hidden' asChild>
              <Button variant='outline' size='icon'>
                <MenuIcon />
                <span className='sr-only'>Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end'>
              <DropdownMenuGroup>
                {navigationData.map((item, index) => (
                  <DropdownMenuItem key={index}>
                    <a href={item.href}>{item.title}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Navbar

{/* 
  className='text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16'
  */}