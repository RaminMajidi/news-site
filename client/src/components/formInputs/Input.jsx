import HelpMessage from "./HelpMessage"

const Input = ({
    label,
    value,
    onChange,
    onBlur,
    name,
    type,
    placeholder,
    errorCondition,
    errorMessage
}) => {
    return (
        <div className="field ">
            <label className='label has-text-light'>
                {label}
            </label>
            <div className="control ">
                <input
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    className='input has-background-grey-lighter'
                    type={type}
                    placeholder={placeholder}
                />
            </div>
            <HelpMessage textColor={'has-text-danger'}>
                {errorCondition && errorMessage}
            </HelpMessage>
        </div>
    )
}

export default Input