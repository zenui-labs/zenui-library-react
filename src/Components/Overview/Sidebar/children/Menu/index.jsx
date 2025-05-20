import PropTypes, {string} from "prop-types";
import {useState} from "react";
import {MdKeyboardArrowRight} from "react-icons/md";
import {Link, NavLink} from "react-router-dom";
import {cn} from "@utils/Style.js";
import NewBadge from "@shared/NewBadge.jsx";
import UpdateBadge from "@shared/UpdateBadge.jsx";

const prefix = 'sidebar'
const DefaultMenu = ({items}) => {
    return (
        <ul className="getStarted flex flex-col gap-[12px] mb-4">
            {items?.map((item, index) => (
                <NavLink
                    key={index}
                    to={item?.url}
                    className={({isActive}) =>
                        cn(
                            isActive && `!${item?.textColor}`,
                            "flex items-center dark:text-darkSubTextColor group gap-[8px] text-[0.950rem] font-[500] cursor-pointer capitalize",
                            "text-gray-600",
                            `hover:${item?.textColor}`
                        )
                    }
                >
                    {({isActive}) => (
                        <>
              <span
                  className={cn(
                      "transition-all duration-200",
                      "border p-[6px] rounded-normal",
                      `${item?.borderColor}/40 dark:border-darkBorderColor group-hover:${item?.bgColor} group-hover:${item?.borderColor}`,
                      isActive && `${item?.bgColor} ${item.borderColor}`
                  )}
              >
                <item.icon
                    className={cn(
                        `shrink-0 size-4 transition-all duration-200`,
                        `${item?.textColor} group-hover:text-white`,
                        isActive && "text-white"
                    )}
                />
              </span>
                            {item?.title}
                        </>
                    )}
                </NavLink>
            ))}
        </ul>
    );
};

const CollapseMenu = ({title, isNewComponent, items}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <h3
                className={`${
                    isOpen ? "text-[#049ab7]" : "text-gray-500 dark:text-darkSubTextColor"
                } flex items-center justify-between gap-1 text-[1rem] font-[500] capitalize cursor-pointer`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {
                    isNewComponent ? (
                        <div className='flex items-center gap-2'>
                            {title}
                            <NewBadge/>
                        </div>
                    ) : (
                        <>
                            {title}
                        </>
                    )
                }
                <MdKeyboardArrowRight
                    className={`${
                        isOpen && "rotate-[90deg] !text-[#049ab7]"
                    } text-[1.5rem] text-gray-500 transition-all duration-300`}
                />
            </h3>
            <div
                className={`grid overflow-hidden transition-all duration-500 ${
                    isOpen ? " grid-rows-[1fr]" : " grid-rows-[0fr]"
                }`}
            >
                <ul
                    className={`flex flex-col ml-2 text-text mt-3 overflow-hidden pl-4`}
                >
                    {items?.map((item, index) => (
                        <Item key={index} {...item} />
                    ))}
                </ul>
            </div>
        </div>
    );
};
const Item = ({title, url, label, isNewComponent = false, isUpdated = false}) => {

    return (
        <div className={`${label && 'py-[0.5rem]'} border-l dark:border-slate-700 border-gray-200`}>
            {/* inputs */}
            {label ? (
                <Link
                    to={""}
                    id={prefix + label}
                    className={`sectionHeader !cursor-default tracking-widest font-[500] relative mt-4 uppercase  dark:border-darkBorderColor dark:hover:border-darkBorderColor !text-[0.750rem] `}
                >
                    {label}
                </Link>
            ) : (
                <NavLink
                    to={url}
                    id={prefix + url}
                    className={({isActive}) =>
                        cn(
                            isActive ?
                                "hover:!bg-brandColor bg-brandColor dark:hover:!bg-brandColor hover:!rounded-normal !text-secondary font-[500]" : "dark:hover:!bg-slate-800",
                            "dark:hover:!border-darkBorderColor dark:border-darkBorderColor flex items-center dark:text-darkSubTextColor !border-none hover:!rounded-normal rounded-normal gap-[10px] ml-2"
                        )
                    }
                >
                    {title}
                    {isNewComponent && <NewBadge/>}
                    {isUpdated && <UpdateBadge/>}
                </NavLink>
            )}
        </div>
    );
};
CollapseMenu.propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            url: PropTypes.string,
            label: PropTypes.string,
        })
    ),
};

DefaultMenu.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            url: string,
            icon: PropTypes.element,
            bgColor: PropTypes.string,
            borderColor: PropTypes.string,
            textColor: PropTypes.string,
        })
    ),
};
Item.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    label: PropTypes.string,
    isNewComponent: PropTypes.bool,
    parent: PropTypes.string,
};
export {DefaultMenu, CollapseMenu};
