import React, { useContext } from 'react';
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdGroupAdd } from 'react-icons/md'
import Articles from "../../Articles/Articles";
import { articleContext } from "../../../App";
import { BsBoxArrowLeft } from "react-icons/bs";

const TabsWrapper = styled.div`
  border-bottom: 1px solid #E0E0E0;
  display: grid;
  grid-row: 3px 1fr;
`;

const ActiveLine = styled.div`
  height: 2px;
  width: ${p => `${p.width}px`};
  transform: translateX(${p => `${p.offset}px`});
  background: #000;
  transition: all .5s ease-in-out;
`;

const TabList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
`;
const TabItem = styled.li`
  display: inline-block;
  padding: 8px 20px;
  cursor: pointer;
  &.is-active {
  }
`;

const Tabs = props => {
    const activeRef = React.createRef();
    const none = React.createRef();
    const [selected, setSelected] = React.useState("all");
    const [offset, setOffset] = React.useState(0);
    const [width, setWidth] = React.useState(0);
    const data = useContext(articleContext);
    const handleGroupState = data.handleGroupState;

    React.useEffect(() => {

        const activeElement = activeRef.current;
        setOffset(activeElement.offsetLeft);
        setWidth(activeElement.clientWidth);
    }, [selected, activeRef]);

    let section;
    if (selected === "all") {
        section = <Articles />;
    } else if (selected === "article") {
        section = "Article";
    } else if (selected === "event") {
        section = "Event";
    } else if (selected === "education") {
        section = "Education";
    } else {
        section = "Job"
    }

    return (
        <div className="z-0">
            <TabsWrapper>
                <div className="d-flex justify-content-between">
                    <TabList>
                        {props?.items?.map(item => {
                            return (
                                <TabItem
                                    key={item.to}
                                    ref={selected === item.to ? activeRef : none}
                                    className={selected === item.to ? "is-active" : ""}
                                    onClick={() => {
                                        setSelected(item.to)
                                        props.setSelectedTab(item.to)
                                    }}
                                >
                                    {item.name}
                                </TabItem>
                            );
                        })}

                    </TabList>
                    <div>
                        <button className='btn post_button '>
                            <div className="d-flex align-items-center">
                                <span className="me-1">Write a Post</span> <IoMdArrowDropdown className="fs-5" />
                            </div>
                        </button>

                        {
                            handleGroupState ? (
                                <button className='btn btn-secondary ms-3'>
                                    <div className="d-flex align-items-center">
                                        <BsBoxArrowLeft className="fs-5" /> <span className="ms-2">Leave Group</span>
                                    </div>
                                </button>
                            ) :
                                (
                                    <button className='btn btn-primary ms-3'>
                                        <div className="d-flex align-items-center">
                                            <MdGroupAdd className="fs-5" /> <span className="ms-2">Join Group</span>
                                        </div>
                                    </button>
                                )
                        }

                    </div>
                </div>
                <ActiveLine width={width} offset={offset} />
            </TabsWrapper>

            {section}
        </div>
    );
};

export default Tabs;


