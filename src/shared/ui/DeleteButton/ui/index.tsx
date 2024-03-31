import Image from 'next/image'
import { forwardRef, useState } from 'react'

interface IProps {
    onClick?: () => void,
}

export const DeleteButton = forwardRef<HTMLButtonElement, IProps>(( props, ref ) => {
    const { onClick } = props;

    const [isHover, setHover] = useState<boolean>(false)

    return (
        <button
            ref={ref}
            onClick={onClick}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            // className='transition-all border-4 border-zinc-800 border-solid rounded-lg px-[2px] py-[2px] ml-4 hover:rounded-xl hover:bg-zinc-800'>
            className='transition-all rounded-lg px-[2px] py-[2px] ml-1'>
            {/* {
                isHover ?
                <Image src="delete-icon-white.svg" alt='delete icon' width={30} height={30} /> :
                <Image src="delete-icon.svg" alt='delete icon' width={30} height={30} />
            } */}
            <Image src="cross.svg" alt='cross' width={35} height={35} />
        </button>
    )
})