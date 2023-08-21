import { ProjectInterface } from '@/common.types'
import { Categories, LoadMore, ProjectCard } from '@/components'
import { fetchAllProjects } from '@/lib/actions'

interface SearchParams {
	category?: string | null
	endcursor?: string | null
}

interface Props {
	searchParams: SearchParams
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

interface ProjectSearch {
	projectSearch: {
		edges: {
			node: ProjectInterface
		}[]
		pageInfo: {
			hasPreviousPage: boolean
			hasNextPage: boolean
			startCursor: string
			endCursor: string
		}
	}
}

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
	const data = (await fetchAllProjects(
		category ?? '',
		endcursor
	)) as ProjectSearch
	const projectsToDispaly = data?.projectSearch?.edges || []

	if (projectsToDispaly.length === 0) {
		return (
			<section className='flexStart flex-col paddings'>
				<Categories />
				<p className='no-result-text text-center'>No Project Found.</p>
			</section>
		)
	}
	return (
		<section className='flex-start flex-col paddings mb-16'>
			<Categories />
			<section className='projects-grid'>
				{projectsToDispaly.map(
					({
						node: {
							category,
							id,
							image,
							title,
							createdBy: { name, avatarUrl, id: userId },
						},
					}) => (
						<ProjectCard
							key={id}
							id={id}
							image={image}
							title={title}
							avatarUrl={avatarUrl}
							name={name}
							userId={userId}
						/>
					)
				)}
			</section>
			<LoadMore
				startCursor={data?.projectSearch?.pageInfo?.startCursor}
				endCursor={data?.projectSearch?.pageInfo?.endCursor}
				hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage}
				hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
			/>
		</section>
	)
}

export default Home
