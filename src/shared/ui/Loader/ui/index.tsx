import styles from './Loader.module.css'

export const Loader = () => {
	return (
		<div className='absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#000000b3] transition-all'>
			<div className={styles.loader}></div>
		</div>
	)
}
