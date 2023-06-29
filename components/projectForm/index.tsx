'use client'
import { SessionInterface } from '@/common.types'
import Image from 'next/image'
import FormField from '../formField'
import CustomMenu from '../customMenu'
import { categoryFilters } from '@/constants'
import { useState } from 'react'
import Button from '../button'
import { createNewProject, fetchToken } from '@/lib/actions'
import { useRouter } from 'next/navigation'

interface Props {
	type: 'create' | 'edit'
	session: SessionInterface
}
const ProjectForm = ({ type, session }: Props) => {
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [form, setForm] = useState({
		title: '',
		description: '',
		image: '',
		liveSiteUrl: '',
		githubUrl: '',
		category: '',
	})

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		const { token } = await fetchToken()
		try {
			if (type === 'create') {
				await createNewProject(form, session?.user?.id, token)
				router.push('/')
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsSubmitting(false)
		}
	}
	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		const file = e.target.files?.[0]
		if (!file) return
		if (!file.type.includes('image')) {
			return alert('Please upload an image file.')
		}
		const reader = new FileReader()
		reader.readAsDataURL(file)

		reader.onload = () => {
			const result = reader.result as string

			handleStateChange('image', result)
		}
	}
	const handleStateChange = (fieldName: string, value: string) => {
		setForm((prevState) => ({ ...prevState, [fieldName]: value }))
	}

	return (
		<form action='' className='flexStart form' onSubmit={handleFormSubmit}>
			<div className='flexStart form_image-container'>
				<label htmlFor='poster' className='flexStart form_image-label'>
					{!form.image && 'Upload your project poster image'}
				</label>
				<input
					id='image'
					accept='image/*'
					type='file'
					required={type === 'create' ? true : false}
					className='form_image-input'
					onChange={handleChangeImage}
				/>
				{form.image && (
					<Image
						src={form?.image}
						className='sm:p-10 object-contain z-20'
						alt='Project Poster'
						fill
					/>
				)}
			</div>
			<FormField
				title='title'
				state={form.title}
				placeholder='DDribbble'
				setState={(value) => handleStateChange('title', value)}
			/>
			<FormField
				title='Description'
				state={form.description}
				placeholder='Showcase and discover remarkable developer projects.'
				setState={(value) => handleStateChange('description', value)}
			/>
			<FormField
				title='Website URL'
				type='url'
				state={form.liveSiteUrl}
				placeholder='https://DDribbble.com'
				setState={(value) => handleStateChange('liveSiteUrl', value)}
			/>
			<FormField
				title='Github URL'
				type='url'
				state={form.githubUrl}
				placeholder='https://github.com/yourProject'
				setState={(value) => handleStateChange('githubUrl', value)}
			/>
			<CustomMenu
				title='Category'
				state={form.category}
				filters={categoryFilters}
				setState={(value) => handleStateChange('category', value)}
			/>
			<div className='flexStart w-full'>
				<Button
					title={
						isSubmitting
							? `${type === 'create' ? 'Creating' : 'Editing'}`
							: `${type === 'create' ? 'Create' : 'Edit'}`
					}
					type='submit'
					leftIcon={isSubmitting ? '' : '/plus.svg'}
					isSubmitting={isSubmitting}
				/>
			</div>
		</form>
	)
}

export default ProjectForm
