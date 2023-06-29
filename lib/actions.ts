import { ProjectForm } from '@/common.types'
import {
	createProjectMutation,
	createUserMutation,
	getUserQuery,
} from '@/graphql'
import { GraphQLClient } from 'graphql-request'

const isProduction = process.env.NODE_ENV === 'production'

const apiUrl = isProduction
	? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ''
	: 'http://127.0.0.1:4000/graphql'
const apiKey = process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ''

const serverUrl = isProduction
	? process.env.NEXT_PUBLIC_SERVER_URL
	: 'http://localhost:3000'

// const client = new GraphQLClient(apiUrl)

// const makeGraphQLRequest = async (query: string, variables = {}) => {
// 	try {
// 		return await client.request(query, variables)
// 	} catch (err) {
// 		throw err
// 	}
// }

// My Config
export { gql } from 'graphql-request'

export const grafbase = new GraphQLClient(apiUrl, {
	headers: {
		'x-api-key': process.env.GRAFBASE_API_KEY as string,
	},
})

export const createUser = (name: string, email: string, avatarUrl: string) => {
	grafbase.setHeader('x-api-key', apiKey)

	const variables = {
		input: {
			name: name,
			email: email,
			avatarUrl: avatarUrl,
		},
	}

	return grafbase.request(createUserMutation, variables)
}

export const fetchToken = async () => {
	try {
		const response = await fetch(`${serverUrl}/api/auth/token`)
		return response.json()
	} catch (error) {
		throw error
	}
}

export const uploadImage = async (imagePath: string) => {
	try {
		const response = await fetch(`${serverUrl}/api/upload`, {
			method: 'POST',
			body: JSON.stringify({ path: imagePath }),
		})
		return response.json()
	} catch (error) {
		throw error
	}
}

export const createNewProject = async (
	form: ProjectForm,
	creatorId: string,
	token: string
) => {
	const imageUrl = await uploadImage(form.image)

	if (imageUrl.url) {
		grafbase.setHeader('Authorization', `Bearer ${token}`)
		const variables = {
			input: {
				...form,
				image: imageUrl.url,
				createdBy: {
					link: creatorId,
				},
			},
		}
		return grafbase.request(createProjectMutation, variables)
	}
}

export const getUser = (email: string) => {
	grafbase.setHeader('x-api-key', apiKey)
	return grafbase.request(getUserQuery, { email })
}
