import Link from 'next/link'
import Image from 'next/image'
import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect('/sign-in');

  return (
    <div className='root-layout'>
      <nav>
        <Link href={"/"} className='flex items-center gap-2'>
          <Image src="/prep_ai.svg" alt="Logo" width={50} height={50} className='mt-1' />
          <h2 className='text-primary-100'>PrepAI</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default RootLayout