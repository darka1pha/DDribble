'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useCallback } from 'react'
const Modal = ({ children }: { children: React.ReactNode }) => {
	const overlay = useRef<HTMLDivElement>(null)
	const wrapper = useRef<HTMLDivElement>(null)
	const router = useRouter()

	const onDissmiss = useCallback(() => {
		router.push('/')
	}, [router])

	const handleClick = useCallback(
		(e: React.MouseEvent) => {
			if (e.target === overlay.current && onDissmiss) {
				onDissmiss()
			}
		},
		[onDissmiss, overlay]
	)

	return (
		<div ref={overlay} className='modal' onClick={handleClick}>
			<button
				className='absolute top-3 right-8'
				type='button'
				onClick={onDissmiss}>
				<Image src={'/close.svg'} height={17} width={17} alt='close' />
			</button>
			<div ref={wrapper} className='modal_wrapper'>
				{children}
			</div>
		</div>
	)
}

export default Modal
