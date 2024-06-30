import { forwardRef } from 'react'
import styles from "./Checkbox.module.scss"

interface IProps {
	onClick?: any,
	checked: boolean,
}

export const Checkbox = forwardRef<HTMLLabelElement, IProps>(({ onClick, checked }: IProps, ref) => {
	return (
			<>
				<label onClick={onClick} ref={ref}>
					<input type="checkbox" className={styles.real_checkbox} defaultChecked={checked} />
					<span className={styles.custom_checkbox}></span>
				</label>
			</>
		)
})