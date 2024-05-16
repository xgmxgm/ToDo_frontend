'use client'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import Link from 'next/link'
import { FormEventHandler, useState } from 'react'
import axios from '@/axios'

export const SignUp = () => {
	const [inputFullName, setInputFullName] = useState<string>('');
	const [inputEmail, setInputEmail] = useState<string>('');
	const [inputPass, setInputPass] = useState<string>('');

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const req = {
			fullName: formData.get("fullname"),
			email: formData.get("email"),
			password: formData.get("password"),
		}

		const res = await axios.post("/user/signup", req)
		console.log("server datas: ", res)
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
							<Input name='password' type='password' state={inputPass} setState={setInputPass} placeholder='Enter password' />
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