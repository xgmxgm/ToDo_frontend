import { forwardRef, ReactNode } from 'react'

interface IProps {
    children: ReactNode,
    onClick?: () => void,
}

export const DeleteButton = forwardRef<HTMLButtonElement, IProps>(( props, ref ) => {
    const { children, onClick } = props;

    return (
        <button ref={ref} onClick={onClick} className='border-2 border-red-500 border-solid rounded-lg px-2 py-[2px] ml-2 hover:bg-red-500 hover:text-white transition'>
            {children}
        </button>
    )
})