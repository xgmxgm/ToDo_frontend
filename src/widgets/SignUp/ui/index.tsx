'use client'

import { FormEventHandler, useEffect, useState } from 'react'
import { SelectColor } from '@/shared/ui/SelectColor'
import { ShowButton } from '@/shared/ui/ShowButton'
import { Message } from '@/shared/ui/Message'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import axios from '@/axios'

export const SignUp = () => {
	const [inputPassRepShow, setInputPassRepShow] = useState<boolean>(false);
	const [inputPassShow, setInputPassShow] = useState<boolean>(false);
	const [inputFullName, setInputFullName] = useState<string>('');
	const [inputPassRep, setInputPassRep] = useState<string>('');
	const [avatarColor, setAvatarColor] = useState<string>('');
	const [inputEmail, setInputEmail] = useState<string>('');
	const [inputPass, setInputPass] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const [isVisible, setIsVisible] = useState(false);
	const [same, setSame] = useState<boolean>(false);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		if (formData.get("password") !== formData.get("passwordrep")) {
			setMessage("Your passwords are not equal!")
			setIsVisible(true)
			setSame(true)
			return null
		}
		
		if (!avatarColor) {
			setMessage("Please select color for avatar!");
			setIsVisible(true)
			return null
		}

		const req = {
			fullName: formData.get("fullname"),
			email: formData.get("email"),
			password: formData.get("password"),
			colorAvatar: avatarColor,
		}

		await axios.post("/user/signup", req)
		.then( async () => {
			const reqData = {
				email: formData.get("email"),
				password: formData.get("password"),
				callbackUrl: "/profile",
			}
	
			await signIn('credentials', reqData)
		})
		.catch((error) => {
			setMessage(error.response.data.message);
			setIsVisible(true)
		})
	}

	useEffect(() => {
		if (inputPass !== inputPassRep) {
			setSame(true)
		} else {
			setSame(false)
		}

		if (isVisible) {
			const timer = setTimeout(() => {
				setIsVisible(false)
			}, 3000)

			return () => clearTimeout(timer)
		}
	})

	return (
		<>
			<div className='mt-6'>
				<div className='flex flex-col justify-center items-center'>
						<Message isVisible={isVisible}>
							<p className='text-white'>{message}</p>
						</Message>
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
								<Input name='password' type={inputPassShow ? 'text' : 'password'} state={inputPass} setState={setInputPass} placeholder='Enter password' error={same} />
								<ShowButton state={inputPassShow} setState={setInputPassShow} />
							</div>
						</div>
						<div className='mt-5'>
							<p className='text-lg'>Repeat password</p>
							<div className='flex items-center'>
								<Input name='passwordrep' type={inputPassRepShow ? 'text' : 'password'} state={inputPassRep} setState={setInputPassRep} placeholder='Repeat password' error={same}/>
								<ShowButton state={inputPassRepShow} setState={setInputPassRepShow} />
							</div>
						</div>
						<div className='mt-5'>
							<p className='text-lg'>Select color for avatar</p>
							<div className='flex items-center my-2'>
								<SelectColor setState={setAvatarColor} />
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