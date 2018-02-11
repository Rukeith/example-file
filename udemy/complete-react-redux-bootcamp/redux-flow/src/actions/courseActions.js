import * as types from './actionTypes';
import courseApi from '../api/mockCoursesApi';

export function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  };
}

export function createCoursesSuccess(course) {
  return {
    type: types.CREATE_COURSES_SUCCESS,
    course
  };
}

export function updateCourseSuccess(course) {
  return {
    type: types.UPDATE_COURSES_SUCCESS,
    course
  };
}

export function loadCourses() {
  return async (dispatch) => {
    try {
      const courses = await courseApi.getAllCourses();
      return dispatch(loadCoursesSuccess(courses));
    } catch (error) {
      throw(error);
    }
  };
}

export function saveCourse(course) {
  return async (dispatch, getState) => {
    try {
      const savedCourse = await courseApi.saveCourse(course);
      (course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCoursesSuccess(savedCourse)));
    } catch (error) {
      throw(error);
    }
  };
}