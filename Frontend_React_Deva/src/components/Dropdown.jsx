import { useState } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ align = 'right', width = '52', contentClasses = 'py-1 bg-white', dropdownClasses = '', trigger, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    let alignmentClasses = '';
    switch (align) {
        case 'left':
            alignmentClasses = 'origin-top-left left-0';
            break;
        case 'top':
            alignmentClasses = 'origin-top';
            break;
        case 'none':
        case 'false':
            alignmentClasses = '';
            break;
        case 'right':
        default:
            alignmentClasses = 'origin-top-right right-0';
            break;
    }

    let dropdownWidth = '';
    switch (width) {
        case '52':
            dropdownWidth = 'w-52';
            break;
        default:
            dropdownWidth = width;
            break;
    }

    return (
        <div className="relative" onClick={handleToggle}>
            <div>
                {trigger}
            </div>

            {isOpen && (
                <div
                    className={`absolute z-50 mt-2 ${dropdownWidth} rounded-md shadow-lg ${alignmentClasses} ${dropdownClasses}`}
                    onClick={() => setIsOpen(false)}
                >
                    <div className={`rounded-md ring-1 ring-black ring-opacity-5 shadow-lg ${contentClasses}`}>
                        {content}
                    </div>
                </div>
            )}
        </div>
    );
};

Dropdown.propTypes = {
    align: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    contentClasses: PropTypes.string.isRequired,
    dropdownClasses: PropTypes.string.isRequired,
    trigger: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
};

export default Dropdown;