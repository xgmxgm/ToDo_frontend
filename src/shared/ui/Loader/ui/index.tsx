import styles from "./Loader.module.css"

export const Loader = () => {
	return (
		<>
		<div className='flex items-center justify-center m-4'>
			<div className={styles.loader}></div>
		</div>
		</>
	)
}