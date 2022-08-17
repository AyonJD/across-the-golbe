import React from 'react';
import Tabs from './Tabs';
// import Tabs from './Tabs';

const Post = () => {
    const [selectedTab, setSelectedTab] = React.useState('1all');
    // console.log(selectedTab)
    return (
        <div name='article' className="container">

            {/* Container */}
            <Tabs
                setSelectedTab={setSelectedTab}
                items={[
                    { to: "all", name: "All Posts" },
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
