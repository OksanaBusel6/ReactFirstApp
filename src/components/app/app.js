/* Сгенерировать уникальный id готовым инструментом наподобие:
https://www.npmjs.com/package/react-id-generator

или более сложный вариант

Создать вручную механизм генерации уникальных случайных id для постов (числовой, буквенный или смешанный - на ваш выбор) 
 */

import React, { Component } from 'react'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import PostStatusFilter from '../post-status-filter'
import PostList from '../post-list'
import PostAddForm from '../post-add-form'

import './app.css'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [
				{ label: 'Going to learn React', important: true, like: true, id: 1 },
				{ label: 'That is so good', important: false, like: false, id: 2 },
				{ label: 'I need a break...', important: false, like: false, id: 3 },
			],
		}
		this.deleteItem = this.deleteItem.bind(this);
		this.addItem = this.addItem.bind(this);

		this.maxId = 4;
	}

	deleteItem(id) {
		this.setState(({ data }) => {
			const index = data.findIndex((elem) => elem.id === id);

			const before = data.slice(0, index);
			const after = data.slice(index + 1);

			const newArr = [...before, ...after];
			return {
				data: newArr,
			}
		})
	}

	addItem(body) {
		const newItem = {
			label: body,
			important: false,
			id: this.maxId++,
		}

		this.setState(({ data }) => {
			const newArr = [...data, newItem];
			return {
				data: newArr,
			}
		})
	}

  onToggleStatus = (status, id) => {
    this.setState(({data}) => {
      const index = data.findIndex(elem  => elem.id === id);
      const old = data[index];

      const newItem = {...old};
      newItem[status] = !old[status];
      
      const before = data.slice(0, index);
      const after = data.slice(index + 1);

      const newArr = [...before, newItem, ...after];

      return {
        data: newArr
      }
      
    });
  }


	render() {
    const {data} = this.state;
    const liked = data.filter(item => item.like === true).length;
    const allPosts = data.length;

		return (
			<div className="app">
				<AppHeader 
          liked={liked}
          allPosts={allPosts}/>
				<div className="search-panel d-flex">
					<SearchPanel />
					<PostStatusFilter />
				</div>
				<PostList
          posts={this.state.data}
          onDelete={this.deleteItem}
          onToggleImportent={(id) => this.onToggleStatus('important', id)}
          onToggleLiked={(id) => this.onToggleStatus('like', id)}/>
				<PostAddForm onAdd={this.addItem} />
			</div>
		)
	}
}
