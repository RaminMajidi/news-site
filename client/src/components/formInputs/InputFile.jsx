
const InputFile = ({
    label,
    onChange,
    preview
}) => {
    return (
        <div className="field">
            <label className='label has-text-light'>
                {label}
            </label>
            <div className="control ">
                <input
                    onChange={onChange}
                    type="file"
                    className='input has-background-grey-lighter'
                />
                {
                    preview ? (
                        <figure className='mt-3'>
                            <img
                                width={200}
                                src={preview}
                                alt="news_image"
                            />
                        </figure>
                    ) : null
                }
            </div>
        </div>
    )
}

export default InputFile