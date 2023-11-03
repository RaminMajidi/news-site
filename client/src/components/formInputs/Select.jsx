import HelpMessage from "./HelpMessage"

const Select = ({
    label,
    value,
    optionList,
    onChange,
    onBlur,
    name,
    errorCondition,
    errorMessage
}) => {
    return (
        <div className="field">
            <label className='label has-text-light'>
                {label}
            </label>
            <div className="control">
                <div className="select is-fullwidth ">
                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className='has-background-grey-lighter'>
                        <option>انتخاب کنید</option>
                        {optionList &&
                            optionList.map(item => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <HelpMessage textColor={'has-text-danger'}>
                {errorCondition && errorMessage}
            </HelpMessage>
        </div>
    )
}

export default Select