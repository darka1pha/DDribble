'use client'

import { useEffect, useState } from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Button from '../button'

type Provider = {
	id: string
	name: string
	type: string
	signinUrl: string
	callbackUrl: string
	signinUrlParams?: Record<string, string> | null
}

type Providers = Record<string, Provider>

const AuthProviders = () => {
	const [providers, setProviders] = useState<Providers | null>(null)
	useEffect(() => {
		const fetchProviders = async () => {
			const res = await getProviders()
			setProviders(res)
		}

		fetchProviders()
	}, [])
	if (providers) {
		return (
			<div>
				{Object.values(providers).map((provider: Provider, key) => (
					<Button
						type='button'
						handleClick={() => signIn(provider?.id)}
						key={key}
						title={'Sign In'}
					/>
				))}
			</div>
		)
	}
}

export default AuthProviders
