import { ProjectForm } from '@/common.types'
import {
	createProjectMutation,
	createUserMutation,
	deleteProjectMutation,
	getProjectById,
	getProjectsOfUserQuery,
	getUserQuery,
	projectsQuery,
	updateProjectMutation,
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

export const fetchAllProjects = async (
	category?: string | null,
	endcursor?: string | null
) => {
	grafbase.setHeader('x-api-key', apiKey)
	return grafbase.request(projectsQuery, { category, endcursor })
}

export const getProjectDetails = (id: string) => {
	grafbase.setHeader('x-api-key', apiKey)
	return grafbase.request(getProjectById, { id })
}

export const deleteProject = (id: string, token: string) => {
	grafbase.setHeader('Authorization', `Bearer ${token}`)
	return grafbase.request(deleteProjectMutation, { id })
}

export const getUserProjects = (id: string, last?: number) => {
	grafbase.setHeader('x-api-key', apiKey)
	return grafbase.request(getProjectsOfUserQuery, { id, last })
}

export const updateProject = async (
	form: ProjectForm,
	projectId: string,
	token: string
) => {
	function isBase64DataURL(value: string) {
		const base64Regex = /^data:image\/[a-z]+;base64,/
		return base64Regex.test(value)
	}

	let updatedForm = { ...form }

	const isUploadingNewImage = isBase64DataURL(form.image)

	if (isUploadingNewImage) {
		const imageUrl = await uploadImage(form.image)

		if (imageUrl.url) {
			updatedForm = { ...updatedForm, image: imageUrl.url }
		}
	}

	grafbase.setHeader('Authorization', `Bearer ${token}`)

	const variables = {
		id: projectId,
		input: updatedForm,
	}

	return grafbase.request(updateProjectMutation, variables)
}
