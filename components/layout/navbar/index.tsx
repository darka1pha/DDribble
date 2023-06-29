import { NavLinks } from '@/constants'
import { AuthProviders, ProfileMenu } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/session'

const Navbar = async () => {
	const session = await getCurrentUser()
	return (
		<nav className='flexBetween navbar'>
			<div className='flex-1 flexStart gap-10'>
				<Link href={'/'}>
					<Image src='/logo.svg' height={45} width={115} alt='DDribbble' />
				</Link>
				<ul className='xl:flex hidden text-small gap-7'>
					{NavLinks.map((link) => (
						<Link key={link.key} href={link.href}>
							{link.text}
						</Link>
					))}
				</ul>
			</div>
			<div className='flexCenter gap-4'>
				{session?.user ? (
					<>
						<ProfileMenu session={session} />
						<Link href={'/create-project'}>Share Work</Link>
					</>
				) : (
					<AuthProviders />
				)}
			</div>
		</nav>
	)
}

export default Navbar
