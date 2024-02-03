import { MouseEvent, useState } from 'react'
import beam from '../assets/beam1.png'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { MdOutlineFileOpen } from 'react-icons/md'

import "../App.css"

const FirstPage = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedForm, setSelectedForm] = useState(0);
    const [showSpecs, setShowSpecs] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");


    const loadSpecs = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (selectedForm != 0) {
            setShowError(false);
            setShowSpecs(!showSpecs);
        }
        else {
            setError("please select a form");
            setShowError(true);
        }
    }

    return (
        <div className='w-screen h-screen flex items-center'>
            <form action="" className={`w-96 flex flex-col gap-8 mx-auto ${showMenu ? "block" : "hidden"}`}>
                {showError ? <div className='w-full bg-red-500 text-md text-white text-center py-2 rounded-lg'>{error}</div> : <div></div>}
                <div className={`flex flex-col gap-8 mx-auto ${showSpecs ? 'hidden' : 'block'}`}>
                    <h1 className='text-white text-xl'>choose form</h1>
                    <div className='grid grid-cols-2 grid-rows-2 gap-4'>
                        <div onClick={() => setSelectedForm(1)} className={`h-32 w-auto rounded-md shadow cursor-pointer`}><img className='h-32 w-auto rounded-md' src={beam} alt="" /></div>
                        <div onClick={() => setSelectedForm(2)} className={`h-32 w-auto rounded-md shadow cursor-pointer`}><img className='h-32 w-auto rounded-md' src={beam} alt="" /></div>
                        <div onClick={() => setSelectedForm(3)} className={`h-32 w-auto rounded-md shadow cursor-pointer`}><img className='h-32 w-auto rounded-md' src={beam} alt="" /></div>
                        <div onClick={() => setSelectedForm(4)} className={`h-32 w-auto rounded-md shadow cursor-pointer`}><img className='h-32 w-auto rounded-md' src={beam} alt="" /></div>
                    </div>
                </div>
                <div className={`flex flex-col gap-8 mx-auto ${showSpecs ? 'block' : 'hidden'}`}>
                    <h1 className='text-white text-xl'>{selectedForm}</h1>
                </div>

                <div className='flex flex-row gap-2 items-center justify-end'>
                    <button onClick={() => setShowMenu(!showMenu)} className='px-2 bg-blue-800 text-white rounded-md text-md flex justify-center items-center shadow'>back</button>
                    <button onClick={(e) => loadSpecs(e)} className='px-2 bg-blue-800 text-white rounded-md text-md flex justify-center items-center shadow'>Next</button>
                </div>
            </form>
            <div className={`flex flex-row gap-8 mx-auto ${showMenu ? "hidden" : "block"}`}>
                <button onClick={() => setShowMenu(!showMenu)} className='shadow w-40 h-40 text-white text-6xl flex justify-evenly flex-col items-center border-2 rounded-lg transition-shadow duration-200'>< AiOutlineFileAdd /><h1 className='text-lg'>new project</h1></button>
                <button className='shadow w-40 h-40 text-white text-6xl flex justify-evenly flex-col items-center border-2 rounded-lg transition-shadow duration-200'>< MdOutlineFileOpen /><h1 className='text-lg'>open file</h1></button>
            </div>
        </div>
    )
}

export default FirstPage