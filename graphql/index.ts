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
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
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
