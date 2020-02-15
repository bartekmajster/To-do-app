class List {
	constructor() {
		this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	}

	addTask(text) {
		this.tasks.push({
			text,
			done: false
		});
		localStorage.setItem('tasks',JSON.stringify(this.tasks));
		this.updateList();
	}
	removeTask(index) {
		this.tasks.splice(index,1);
		localStorage.setItem('tasks',JSON.stringify(this.tasks));
		this.updateList();
	}

	updateList() {
		const list = document.querySelector('.undone');

		this.tasks.sort((a,b)=>{
			if(a.done && !b.done) return 1;
			else return -1;
		})

		list.innerHTML = this.tasks.map((task, i) => {
			return `
				<li>
					${task.text}
					<div class = "buttons">
    				<button class = "remove" data-index="${i}" data-type="remove">
    					<i class = "far fa-trash-alt" data-index="${i}" data-type="remove"></i>
    				</button>
    				<button class = "complete" data-index="${i}" data-type="complete">
    					<i class = "${task.done ? 'fas' : 'far'} fa-check-circle" data-index="${i}" data-type="complete"></i>
    				</button>
    			</div>
				</li>
			`;
		}).join('');
	}

	addToComplete(index) {
		this.tasks[index].done = !this.tasks[index].done;
		localStorage.setItem('tasks',JSON.stringify(this.tasks));
		this.updateList();
	}

	toggleClick = (e) => {
		const [index, type] = [e.target.dataset.index, e.target.dataset.type];
		if (type === 'complete') {
			this.addToComplete(index);
		} else if (type === 'remove') {
			this.removeTask(index);
		}
	}
}

class App {
	constructor() {
		this.input = document.querySelector("input");
		this.content = document.querySelector('.content');
		this.list = new List();
		this.list.updateList();
		document.querySelector("form").addEventListener("submit", e => {
			e.preventDefault();
			if (this.input.value) {
				this.list.addTask(this.input.value);
				this.input.value = "";
			}
		});

		this.content.addEventListener('click', this.list.toggleClick);
	}

}

const app = new App();