import { footerLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'

interface ColumnProps {
	title: string
	links: string[]
}

const FooterColumn = ({ title, links }: ColumnProps) => {
	return (
		<div className='footer_column'>
			<h4 className='font-semibold'>{title}</h4>
			<ul className='flex flex-col gap-2 font-normal'>
				{links.map((link) => (
					<Link href={'/'} key={link}>
						{link}
					</Link>
				))}
			</ul>
		</div>
	)
}

const Footer = () => {
	return (
		<footer className='flexStart footer'>
			<div className='flex flex-col gap-12 w-full'>
				<div className='flex items-start flex-col'>
					<Image
						src={'/logo-purple.svg'}
						width={115}
						height={38}
						alt='ddribble logo'
					/>
					<p className='text-start text-sm font-normal mt-5 max-w-xs'>
						Ourrrrrrrr Discription :)))))))))))
					</p>
				</div>
				<div className='flex flex-wrap gap-12'>
					<FooterColumn
						title={footerLinks[0].title}
						links={footerLinks[0].links}
					/>
					<div className='flex flex-1 gap-4 flex-col'>
						<FooterColumn
							title={footerLinks[1].title}
							links={footerLinks[1].links}
						/>
						<FooterColumn
							title={footerLinks[2].title}
							links={footerLinks[2].links}
						/>
					</div>
					<FooterColumn
						title={footerLinks[3].title}
						links={footerLinks[3].links}
					/>
				</div>
			</div>
			<div className='flexBetween footer_copyright'>
				<p>@ 2023 DDribble. All rights reserved</p>
				<p className='text-gray'>
					<span className='text-black font-semibold'>8,869 </span>
					 project submitted
				</p>
			</div>
		</footer>
	)
}

export default Footer
