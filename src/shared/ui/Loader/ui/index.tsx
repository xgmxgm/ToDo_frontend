import styles from './Loader.module.css'

export const Loader = () => {
	return (
		<div className='absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#000000b3] transition-all z-50'>
			<div className='gap-10'>
				<div className={styles.loader}></div>
				<div className='text-xl mt-7 font-bold'>Loading...</div>
			</div>
		</div>
	)
}
