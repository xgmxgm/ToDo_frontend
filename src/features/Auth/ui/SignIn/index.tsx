'use client'

import { ShowButton } from '@/shared/ui/ShowButton'
import { FormEventHandler, useState } from 'react'
import { Message } from '@/features/Message'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export const SignIn = () => {
	const [inputPassShow, setInputPassShow] = useState<boolean>(false)
	const [inputEmail, setInputEmail] = useState<string>('')
	const [inputPass, setInputPass] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [isVisible, setIsVisible] = useState(false)

	const router = useRouter()

	const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)

		const reqData = {
			email: formData.get('email'),
			password: formData.get('password'),
			entry: 'signIn',
			redirect: false,
		}

		await signIn('credentials', reqData).then(({ ok, error }: any) => {
			if (ok) {
				router.push('/profile')
			} else {
				setIsVisible(true)
				setMessage(error)
			}
		})
	}

	return (
		<>
			<div className='mt-6'>
				<div className='flex flex-col justify-center items-center'>
					<Message isVisible={isVisible} setIsVisible={setIsVisible}>
						<p className='text-white'>{message}</p>
					</Message>
					<div className='text-center'>
						<h2 className='text-2xl font-semibold'>Welcome to To Do App</h2>
						<h3 className='text-[#707088] text-lg font-medium'>Sign in</h3>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='mt-5'>
							<p className='text-lg'>E-mail</p>
							<Input
								type='email'
								name='email'
								state={inputEmail}
								setState={setInputEmail}
								placeholder='Enter e-mail'
							/>
						</div>
						<div className='mt-5'>
							<p className='text-lg'>Password</p>
							<div className='flex items-center'>
								<Input
									type={inputPassShow ? 'text' : 'password'}
									name='password'
									state={inputPass}
									setState={setInputPass}
									placeholder='Enter password'
								/>
								<ShowButton state={inputPassShow} setState={setInputPassShow} />
							</div>
						</div>
						<div className='my-4'>
							<Button>
								<p>Sign in an account</p>
							</Button>
						</div>
						<div className='flex items-center justify-start'>
							<p className='text-[#707088] mr-1'>Don’t have an account?</p>
							<Link href='signup' className='text-[#5A54D6] underline'>
								Sign Up
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
