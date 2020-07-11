let app = new Vue({
	el: "#app",
	data: {
		resultNum: null, //число загаданное компьютером
		isStartGame: false, //игра началась?
		inputValue: '', //число которое ввёл пользователь
		isWin: false, //свойство победы,
		helpForUser: '', //подсказка для пользователя
		counter: 0, //счётчик побед
		validateClass: ''
	},
	methods: {
		initGame() {
			this.isWin = false;
			this.resultNum = this.getRandomIntInclusive(1, 100);
			this.isStartGame = true;
		},
		getRandomIntInclusive(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
		},
		endGame() {
			this.isWin = true;
			this.isStartGame = false;
			this.helpForUser = '';
			this.counter += 1;
			this.cleanInputValue();
		},
		cleanInputValue() {
			this.inputValue = '';
		},
		showUserHelp(helpText) {
			this.helpForUser = helpText;
		},
		isNumInput(inputValue) {
			return !isNaN(+inputValue) && Number.isInteger(+inputValue) && inputValue.trim() !== '';	
		},
		setValidationClass() {
			this.validateClass = 'error';
		},
		checkUserAnswer() {
			let userAnsw 	= this.inputValue, //ответ пользователя
				pcAnsw 		= this.resultNum; //загаданное число
			if(this.isNumInput(userAnsw)) { //Проверка входных данных
				this.validateClass = '';
				if(+userAnsw === pcAnsw) this.endGame();
				else if (userAnsw < pcAnsw) {
					this.showUserHelp('Введите число побольше');
					this.cleanInputValue();
				} else {
					this.showUserHelp('Введите число поменьше');
					this.cleanInputValue();
				}
			} else {
				this.setValidationClass();
			}
		}
	}
});