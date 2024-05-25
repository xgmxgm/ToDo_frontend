'use client'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { ShowButton } from '@/shared/ui/ShowButton'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FormEventHandler, useState } from 'react'

export const SignIn = () => {
	const [inputEmail, setInputEmail] = useState<string>('');
	const [inputPass, setInputPass] = useState<string>('');
	const [inputPassShow, setInputPassShow] = useState<boolean>(false);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const reqData = {
			email: formData.get("email"),
			password: formData.get("password"),
			callbackUrl: "/profile"
		}

		const res = await signIn('credentials', reqData)

		console.log(res)
	}

	return (
		<>
			<div className='mt-6'>
				<div className='flex flex-col justify-center items-center'>
					<div className='text-center'>
						<h2 className='text-2xl font-semibold'>Welcome to To Do App</h2>
						<h3 className='text-[#707088] text-lg font-medium'>Sign in</h3>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='mt-5'>
							<p className='text-lg'>E-mail</p>
							<Input type='email' name='email' state={inputEmail} setState={setInputEmail} placeholder='Enter e-mail' />
						</div>
						<div className='mt-5'>
							<p className='text-lg'>Password</p>
							<div className='flex items-center'>
								<Input type={inputPassShow ? 'text' : 'password'} name='password' state={inputPass} setState={setInputPass} placeholder='Enter password' />
								<ShowButton state={inputPassShow} setState={setInputPassShow} />
							</div>
						</div>
						<div>
							<Button>
								<p>Sign in an account</p>
							</Button>
						</div>
						<div className='flex items-center justify-start'>
							<p className='text-[#707088] mr-1'>Don’t have an account?</p>
							<Link href='signup' className='text-[#5A54D6] underline'>Sign Up</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}