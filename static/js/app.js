var vm = new Vue({
    el: '#game',
    data: {
        rightAnswerSound: new Audio('static/sound/smb_1-up.wav'),
        wrongAnswerSound: new Audio('static/sound/smb_mariodie.wav'),
        gameOverSound: new Audio('static/sound/smb_world_clear.wav'),
        nextRoundSound: new Audio('static/sound/smb3_enter_level.wav'),
        rollingDiceSound: new Audio('static/sound/smb2_bonus_chance_start.wav'),
        gameIsRunning: false,
        teamOnePoints: 1000,
        teamTwoPoints: 1000,
        teamOneReRolls: 3,
        teamTwoReRolls: 3,
        teamOneHerod: 1,
        teamTwoHerod: 1,
        loading: false,
        currentRound: 1,
        showHardAnswer: {
            active: false
        },
        showEasyAnswer: {
            active: false
        },
        maxRounds: 11,
        teamOneName: 'Israelites',
        teamTwoName: 'Egyptians',
        teamOneWager: 0,
        teamTwoWager: 0,
        reverseQuestions: {
            computer: false,
            reversed: false,
        },
        showDimmer: {
            active: false,
            dimmer: false,
        },
        questions: {
            easy: [{
                    question: 'How old was Moses when he left Egypt after failing to free the Israelites?',
                    answer: '40 years old'
                },
                {
                    question: 'On which river was Moses hidden among the bulrushes?',
                    answer: 'Nile'
                },
                {
                    question: 'What was Moses\'s sister\'s name?',
                    answer: 'Miriam'
                },
                {
                    question: 'Who was Moses\' wife?',
                    answer: 'Zipporah'
                },
                {
                    question: 'As God parted the Red Sea for the Israelites, what did Moses hold out over the water?',
                    answer: 'His staff/rod'
                },
                {
                    question: 'Who found Moses and adopted him?',
                    answer: 'The Pharaoh\'s daughter.'
                },
                {
                    question: 'How did the Lord appear to Moses in the desert?',
                    answer: 'In a burning bush'
                },
                {
                    question: 'What was the first plague in Egypt?',
                    answer: 'Water turning to blood'
                },
                {
                    question: 'What would have happened to the people of Israel if they had ascended Mt. Sinai?',
                    answer: 'Death'
                },
                {
                    question: 'What signal did God use to lead the Israelites by day?',
                    answer: 'A cloud'
                },
                {
                    question: 'Why did God lead the Israelites the long way towards the red sea?',
                    answer: 'God thought they would turn back if they encountered war with the Philistines. '
                },
            ],
            hard: [{
                    question: 'Approximately how many years were the Israelites in bondage to Egypt?',
                    answer: '400'
                },
                {
                    question: 'What was the 8th plague?',
                    answer: 'Locusts'
                },
                {
                    question: 'On what animal did Moses ride on his way back to Egypt after leaving Jethro?',
                    answer: 'We don\'t know. Exodus 4:20'
                },
                {
                    question: 'What was the first plague that the magicians couldn\'t duplicate?',
                    answer: 'third plague - lice Exodus 8:18'
                },
                {
                    question: 'What was the first plague that spared the Israelites?',
                    answer: 'fourth plague - flies Exodus 8:22'
                },
                {
                    question: 'What was the first plague that allowed some of the Egyptians to escape if they heeded Moses warnings?',
                    answer: 'seventh plague - hail Exodus 9:20'
                },
                {
                    question: 'Why did the Egyptians despise the Israelites?',
                    answer: 'The Israelites were shepherds'
                },
                {
                    question: 'Which tribe of Israel\'s family bore Moses?',
                    answer: 'Levi.'
                },
                {
                    question: 'What three foods were to be eaten at passover?',
                    answer: 'Lamb, unleavened bread, and bitter herbs'
                },
                {
                    question: 'How does the book of Acts describe Moses?',
                    answer: 'And Moses was learned in all the wisdom of the Egyptians, and was mighty in words and in deeds. Acts 7:22'
                },
                {
                    question: 'Who was trying kill Moses on his way from Midain, to Egypt?',
                    answer: 'God'
                }
            ]
        }
    },
    methods: {
        startNewGame: function() {
            this.gameIsRunning = true;
            this.teamOnePoints = 1000;
            this.teamTwoPoints = 1000;
            this.teamOneHerod = 1;
            this.teamOneHerod = 1;
            this.currentRound = 1;
            this.teamOneWager = 0;
            this.teamTwoWager = 0;
        },
        endGame: function() {
            this.gameIsRunning = false;

        },
        getEasyQuestion: function(check) {
            if (check === 'easy') {
                return 'easy'
            }
            return this.questions.easy[this.currentRound - 1];
        },
        getHardQuestion: function(check) {
            if (check === 'hard') {
                return 'hard'
            }
            return this.questions.hard[this.currentRound - 1];
        },
        randomizeQuestion: function(team) {
            if (team == 'teamOne') {
                this.teamOneReRolls -= 1
            } else if (team == 'teamTwo') {
                this.teamTwoReRolls -= 1
            }
            var vm = this;
            this.showDimmer.active = true;
            this.showDimmer.dimmer = true;
            this.rollingDiceSound.play();

            myVar = setInterval(function() {
                vm.reverseQuestions.computer = !vm.reverseQuestions.computer
                vm.reverseQuestions.reversed = !vm.reverseQuestions.reversed
            }, 77);


            setTimeout(function() {
                vm.showDimmer.active = false;
                vm.showDimmer.dimmer = false;
                clearInterval(myVar);
            }, this.randomTimer(2500, 3000));

        },
        randomTimer: function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        rightAnswer: function(reversed, question) {
            if (reversed.reversed === false && question === 'easy') {
                this.teamTwoPoints += +this.teamTwoWager
            } else if (reversed.reversed === true && question === 'easy') {
                this.teamOnePoints += +this.teamOneWager
            } else if (reversed.reversed === true && question === 'hard') {
                this.teamTwoPoints += +this.teamTwoWager
            } else if (reversed.reversed === false && question === 'hard') {
                this.teamOnePoints += +this.teamOneWager
            };
            this.rightAnswerSound.play();
        },
        wrongAnswer: function(reversed, question) {
            if (reversed.reversed === false && question === 'easy') {
                this.teamTwoPoints -= +this.teamTwoWager
            } else if (reversed.reversed === true && question === 'easy') {
                this.teamOnePoints -= +this.teamOneWager
            } else if (reversed.reversed === true && question === 'hard') {
                this.teamTwoPoints -= +this.teamTwoWager
            } else if (reversed.reversed === false && question === 'hard') {
                this.teamOnePoints -= +this.teamOneWager
            };
            this.wrongAnswerSound.play();
        },
        nextRound: function() {
            this.currentRound += 1;
            if (this.currentRound > this.maxRounds) {
                alert('game over')
                this.gameOverSound.play();
                this.endGame()
                return
            }
            this.nextRoundSound.play();
            this.resetWager();
        },
        resetWager: function() {
            this.teamOneWager = 0;
            this.teamTwoWager = 0;
        },
        getWagers: function() {
          var vm = this;
          vm.loading = true;
            $.ajax({
                url: "https://myground.org/wagers/status/status",
                success: function(result) {
                    console.log(result)
                    vm.teamOneWager = Math.abs(result.teamOne);
                    if (vm.teamOneWager > Math.abs(vm.teamOnePoints)) {
                      if (Math.abs(vm.teamOnePoints) < 1000) {
                        vm.teamOneWager = 1000
                      } else {
                        vm.teamOneWager = Math.abs(vm.teamOnePoints)
                      }
                    }

                    vm.teamTwoWager = Math.abs(result.teamTwo);
                    if (vm.teamTwoWager > Math.abs(vm.teamTwoPoints)) {
                      if (Math.abs(vm.teamTwoPoints) < 1000) {
                        vm.teamTwoWager = 1000
                      } else {
                        vm.teamTwoWager = Math.abs(vm.teamTwoPoints)
                      }
                    }
                    setTimeout(function(){vm.loading = false;}, 500)

                }
            });
        }


    }
})
