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
      term: '',
      filter: 'all',
		}
		this.deleteItem = this.deleteItem.bind(this);
		this.addItem = this.addItem.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);

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
    if (body.trim()) {
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
	}

  onToggleStatus = (status, id) => {
    this.setState(({data}) => {
      const index = data.findIndex(elem  => elem.id === id);
      const old = data[index];

      const newItem = {...old};
      newItem[status] = !newItem[status];
      
      const before = data.slice(0, index);
      const after = data.slice(index + 1);

      const newArr = [...before, newItem, ...after];

      return {
        data: newArr
      }
      
    });
  }

  searchPost(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      const newItem = {...item};
      const state = newItem.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
      return state;
    });
  }

  filterPost(items, filter) {
    if (filter === 'like') {
      return items.filter((item) => item.like);
    } else {
      return items;
    }
  }

  onFilterSelect(filter) {
    this.setState({filter});
  }

  onUpdateSearch(term) {
    this.setState({term});
  }

	render() {
    const {data, term, filter} = this.state;

    const liked = data.filter(item => item.like === true).length;
    const allPosts = data.length;

    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

		return (
			<div className="app">
				<AppHeader 
          liked={liked}
          allPosts={allPosts}/>
				<div className="search-panel d-flex">
					<SearchPanel 
            onUpdateSearch={this.onUpdateSearch}/>
					<PostStatusFilter 
            filter={filter}
            onFilterSelect={this.onFilterSelect}/>
				</div>
				<PostList
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportent={(id) => this.onToggleStatus('important', id)}
          onToggleLiked={(id) => this.onToggleStatus('like', id)}/>
				<PostAddForm onAdd={this.addItem} />
			</div>
		)
	}
}
