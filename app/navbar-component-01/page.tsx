import Navbar from '@/components/shadcn-studio/blocks/navbar-component-01/navbar-component-01'

const navigationData = [
  {
    title: 'Quotes',
    href: '/single-quote'
  },
  {
    title: 'Authors',
    href: '#'
  },
]

const NavbarPage = () => {
  return (
    <div className='h-60'>
      <Navbar navigationData={navigationData} />
    </div>
  )
}

export default NavbarPage
