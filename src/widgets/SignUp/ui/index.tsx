'use client'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import Link from 'next/link'
import { FormEventHandler, useState } from 'react'
import axios from '@/axios'
import { ShowButton } from '@/shared/ui/ShowButton'
import { signIn } from 'next-auth/react'

export const SignUp = () => {
	const [inputFullName, setInputFullName] = useState<string>('');
	const [inputEmail, setInputEmail] = useState<string>('');
	const [inputPass, setInputPass] = useState<string>('');
	const [inputPassShow, setInputPassShow] = useState<boolean>(false);
	const [inputPassRep, setInputPassRep] = useState<string>('');
	const [inputPassRepShow, setInputPassRepShow] = useState<boolean>(false);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		if (formData.get("password") !== formData.get("passwordrep")) {
			return null
		}

		const req = {
			fullName: formData.get("fullname"),
			email: formData.get("email"),
			password: formData.get("password"),
		}

		await axios.post("/user/signup", req)

		const reqData = {
			email: formData.get("email"),
			password: formData.get("password"),
			callbackUrl: "/profile"
		}

		await signIn('credentials', reqData)
	}

	return (
		<>
			<div className='mt-6'>
				<div className='flex flex-col justify-center items-center'>
					<div className='text-center'>
						<h2 className='text-2xl font-semibold'>Welcome to To Do App</h2>
						<h3 className='text-[#707088] text-lg font-medium'>Sign up</h3>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='mt-5'>
							<p className='text-lg'>Full name</p>
							<Input name='fullname' type='text' state={inputFullName} setState={setInputFullName} placeholder='Enter full name' />
						</div>
						<div className='mt-5'>
							<p className='text-lg'>E-mail</p>
							<Input name='email' type='email' state={inputEmail} setState={setInputEmail} placeholder='Enter e-mail' />
						</div>
						<div className='mt-5'>
							<p className='text-lg'>Password</p>
							<div className='flex items-center'>
								<Input name='password' type={inputPassShow ? 'text' : 'password'} state={inputPass} setState={setInputPass} placeholder='Enter password' />
								<ShowButton state={inputPassShow} setState={setInputPassShow} />
							</div>
						</div>
						<div className='mt-5'>
							<p className='text-lg'>Repeat password</p>
							<div className='flex items-center'>
								<Input name='passwordrep' type={inputPassRepShow ? 'text' : 'password'} state={inputPassRep} setState={setInputPassRep} placeholder='Repeat password' />
								<ShowButton state={inputPassRepShow} setState={setInputPassRepShow} />
							</div>
						</div>
						<div>
							<Button>
								<p>Create an account</p>
							</Button>
						</div>
						<div className='flex items-center justify-start'>
							<p className='text-[#707088] mr-1'>Have an account?</p>
							<Link href='signin' className='text-[#5A54D6] underline'>Sign In</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}