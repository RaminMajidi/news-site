import "./BtnLoading.css"

const BtnLoading = ({ text = "لطفا منتظر باشید" }) => {
    return (
        <div className="field">
            <div className="control">
                <button
                    type='button'
                    className='button is-success pr-2 pl-6 mt-4'
                >
                    <div className='spinere'></div>
                    {text}
                </button>
            </div>
        </div>
    )
}

export default BtnLoading