import React from 'react';

const TopicDropdown = (props) => {
  const { topics } = props;
  const displayTopics = topics.map((topic) => <option value={topic}>{topic}</option>);
  return (
    <select id='topics' name='topics'>
      {displayTopics}
    </select>
  );
};

export default TopicDropdown;
