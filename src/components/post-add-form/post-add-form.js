import React, {Component} from "react";
import "./post-add-form.css";

export default class PostAddForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      text: ''
    }

  }

  onValueChange = (e) => {
    this.setState({text: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {text} = this.state;
    this.props.onAdd(text);
  }

  render() {
    return (
      <form
        className="bottom-panel d-flex"
        onSubmit={this.onSubmit}
        >
        <input
          type="text"
          placeholder="О чем Вы думаете сейчас?"
          className="form-control new-post-label"
          onChange={this.onValueChange}
        />
        <button
          type="submit"
          className="btn btn-outline-secondary"
        >
          Добавить
        </button>
      </form>
    );
  }
};

