

const BtnSubmit = ({ text = "ثیت" }) => {
    return (
        <div className="field">
            <div className="control">
                <button
                    type='submit'
                    className='button is-success px-6 mt-4'
                >
                    {text}
                </button>
            </div>
        </div>
    )
}

export default BtnSubmit