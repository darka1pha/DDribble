'use client'

import Image from 'next/image'
import { MouseEventHandler } from 'react'

interface Props {
	title: string
	isSubmitting?: boolean
	rightIcon?: string | null
	leftIcon?: string | null
	handleClick?: MouseEventHandler
	type: 'button' | 'submit' | 'reset'
	bgColor?: string
	textColor?: string
}

const Button = ({
	title,
	type,
	bgColor,
	handleClick,
	isSubmitting,
	leftIcon,
	rightIcon,
	textColor,
}: Props) => {
	return (
		<button
			className={`flexCenter gap-3 px-4 py-3 ${
				isSubmitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'
			} 
      ${textColor || 'text-white'}
      rounded-xl text-sm font-medium max-md:w-full`}
			disabled={isSubmitting}
			type={type}
			onClick={handleClick}>
			{leftIcon && (
				<Image src={leftIcon} height={40} width={40} alt='left-icon' />
			)}
			{title}
			{rightIcon && (
				<Image src={rightIcon} height={40} width={40} alt='right-icon' />
			)}
		</button>
	)
}

export default Button
