import { connect } from "react-redux";

import getTasks from "../../actions/tasks";
import getColumns from "../../actions/columns";
import Main from "./Main";

const mapStateToProps = ({ todos, containers }) => ({
  todos: todos,
  containers: containers.containers
});

const mapDispatchToProps = {
  getTasks,
  getColumns
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
