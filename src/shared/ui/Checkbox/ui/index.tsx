import styles from "./Checkbox.module.scss"

export const Checkbox = () => {
	return (
		<>
			<label>
				<input type="checkbox" className={styles.real_checkbox} />
				<span className={styles.custom_checkbox}></span>
			</label>
		</>
	)
}