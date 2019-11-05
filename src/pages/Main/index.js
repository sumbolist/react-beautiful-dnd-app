import { connect } from 'react-redux';

import getTodos from '../../actions/todos/getTodos';
import getContainers from '../../actions/containers/getContainers';
import Main from './Main';

const mapStateToProps = ({ todos, containers }) => ({
      todos: todos,
      containers: containers.containers,
});

const mapDispatchToProps = {
  getTodos,
  getContainers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
