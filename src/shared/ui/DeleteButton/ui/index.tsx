import Image from 'next/image'
import { forwardRef, useState } from 'react'

interface IProps {
    onClick?: () => void,
}

export const DeleteButton = forwardRef<HTMLButtonElement, IProps>(( props, ref ) => {
    const { onClick } = props;

    return (
        <button
            ref={ref}
            onClick={onClick}
            className='transition-all rounded-lg px-[2px] py-[2px] ml-1'>
            <Image src="cross.svg" alt='cross' width={30} height={30} />
        </button>
    )
})