import React from "react";
import PropTypes from "prop-types";
import CouresListRow from './CouresListRow';

const CouresList = ({ courses }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
      {courses.map(course => <CouresListRow key={course.id} course={course} />)}
      </tbody>
    </table>
  );
};

CouresList.propTypes = {
  courses: PropTypes.array.isRequired
};

export default CouresList;