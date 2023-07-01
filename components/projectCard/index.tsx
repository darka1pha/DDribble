import Image from 'next/image'
import Link from 'next/link'

interface Props {
	id: string
	image: string
	avatarUrl: string
	userId: string
	title: string
	name: string
}

const ProjectCard = ({ avatarUrl, id, image, name, title, userId }: Props) => {
	return (
		<div className='flexCenter flex-col rounded-2xl drop-shadow-card transition-all ease-out duration-300'>
			<Link
				href={`/project/${id}`}
				className='flexCenter group relative w-full h-full'>
				<Image
					src={image}
					alt='project banner'
					width={440}
					height={340}
					className='w-full h-full object-cover rounded-xl'
				/>
				<div className='hidden group-hover:flex profile_card-title'>
					<p className='w-full'>{title}</p>
				</div>
			</Link>
			<div className='flexBetween w-full px-2 font-semibold mt-3 text-sm'>
				<Link href={`/profile/${userId}`}>
					<div className='flexCenter gap-2'>
						<Image
							src={avatarUrl}
							width={24}
							height={24}
							className='rounded-full'
							alt='user avatar'
						/>
						<p>{name}</p>
					</div>
				</Link>
				<div className='flexCenter gap-3'>
					<div className='flexCenter gap-2'>
						<Image src={'/heart.svg'} alt='like' width={13} height={12} />
						<p className='text-sm'>512</p>
					</div>
					<div className='flexCenter gap-2'>
						<Image src={'/eye.svg'} alt='like' width={13} height={12} />
						<p className='text-sm'>1.2k</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
