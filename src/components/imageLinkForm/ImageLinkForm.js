import React from 'react'
import './ImageLinkForm.css'
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className="center f3">
                {'This is a face recognition appp'}
            </p>
            <div className='center'>
                <div className="pa4 br3 shadow-5 form center">
                    <input className=' f4 pa2 w-70 center' onChange={onInputChange} type='text' />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}> Detect </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm
