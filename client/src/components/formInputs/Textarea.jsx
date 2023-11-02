import HelpMessage from "./HelpMessage"

const Textarea = ({
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    errorCondition,
    errorMessage
}) => {
    return (
        <div className="field">
            <label className='label has-text-light'>{label}</label>
            <div className="control">
                <textarea
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className='textarea has-background-grey-lighter'
                    placeholder={placeholder}>
                </textarea>
            </div>
            <HelpMessage textColor={'has-text-danger'}>
                {errorCondition && errorMessage}
            </HelpMessage>
        </div>
    )
}

export default Textarea