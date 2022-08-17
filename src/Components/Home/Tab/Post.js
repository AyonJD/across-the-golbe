import React, { useContext } from 'react';
import { articleContext } from '../../../App';
import Tabs from './Tabs';
// import Tabs from './Tabs';

const Post = () => {
    const [selectedTab, setSelectedTab] = React.useState('1all');
    const articles = useContext(articleContext);
    const allPost = `All Posts (${articles?.length})`;
    // console.log(selectedTab)
    return (
        <div name='article' className="container main_tabs mt-5">

            {/* Container */}
            <Tabs
                className=""
                setSelectedTab={setSelectedTab}
                items={[
                    { to: "all", name: allPost },
                    { to: "article", name: "Article" },
                    { to: "event", name: "Event" },
                    { to: "education", name: "Education" },
                    { to: "job", name: "Job" }
                ]}
            />

        </div>
    );
};

export default Post;
