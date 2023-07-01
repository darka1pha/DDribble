import { gql } from 'graphql-request'

export const getUserQuery = gql`
	query GetUser($email: String!) {
		user(by: { email: $email }) {
			id
			name
			email
			avatarUrl
			description
			githubUrl
			linkedinUrl
		}
	}
`

export const createUserMutation = gql`
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
				name
				email
				avatarUrl
				description
				githubUrl
				linkedinUrl
				id
			}
		}
	}
`
export const createProjectMutation = gql`
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`
export const projectsQuery = gql`
	query getProjects($category: String, $endCursor: String) {
		projectSearch(
			first: 8
			after: $endCursor
			filter: { category: { eq: $category } }
		) {
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
				endCursor
			}
			edges {
				node {
					title
					githubUrl
					description
					liveSiteUrl
					id
					image
					category
					createdBy {
						id
						email
						name
						avatarUrl
					}
				}
			}
		}
	}
`
