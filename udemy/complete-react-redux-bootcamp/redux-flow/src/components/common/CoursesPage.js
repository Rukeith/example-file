import { ReactPropTypes, Component } from "react";

export default class CoursesPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      courses: {
        title: null
      }
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const { course } = this.state;
    course.title = event.target.value;
    this.setState({ course });
  }

  onClickSave() {
    console.log(`Save ${this.state.course}`);
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <h2>Add Course</h2>
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.course.title}
        />
        <input
          type="submit"
          onClick={this.onClickSave}
          value="Save"
        />
      </div>
    );
  }
}
