import React from "react";
import styled from "styled-components";

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

    React.useEffect(() => {
        const activeElement = activeRef.current;
        setOffset(activeElement.offsetLeft);
        setWidth(activeElement.clientWidth);
    }, [selected, activeRef]);

    let section;
    if (selected === "all") {
        section = 'all';
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
                        <button className='btn btn-primary'>One</button>
                        <button className='btn btn-primary'>Two</button>
                    </div>
                </div>
                <ActiveLine width={width} offset={offset} />
            </TabsWrapper>

            {section}
        </div>
    );
};

export default Tabs;


