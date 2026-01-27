import Navbar from '@/components/shadcn-studio/blocks/navbar-component-01/navbar-component-01'

const navigationData = [
  {
    title: 'Quotes',
    href: '/single-quote'
  },
  {
    title: 'Authors',
    href: '/authors'
  },
]

const NavbarPage = () => {
  return (
    <div className='h-fit'>
      <Navbar navigationData={navigationData} />
    </div>
  )
}

export default NavbarPage
