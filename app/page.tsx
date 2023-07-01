import { ProjectInterface } from '@/common.types'
import { ProjectCard } from '@/components'
import { fetchAllProjects } from '@/lib/actions'

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

const Home = async () => {
	const data = (await fetchAllProjects()) as ProjectSearch
	const projectsToDispaly = data?.projectSearch?.edges || []

	if (projectsToDispaly.length === 0) {
		return (
			<section className='flexStart flex-col paddings'>
				Categories
				<p className='no-result-text text-center'>No Project Found.</p>
			</section>
		)
	}
	return (
		<section className='flex-start flex-col paddings mb-16'>
			Categories <br />
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
			LoadMore
		</section>
	)
}

export default Home
