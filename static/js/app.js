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
        teamOneName: 'Zebras',
        teamTwoName: 'Elephants',
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
                    question: 'In which compass direction, was Job said to live?',
                    answer: 'The east'
                },
                {
                    question: 'Who brought up Job as a potential test subject?',
                    answer: 'God'
                },
                {
                    question: 'What had Satan been up to when God asked, "Whence comest thou?"',
                    answer: 'Going to and fro in the earth, and from walking up and down in it.'
                },
                {
                    question: 'What did Satan accuse God of doing to protect Job?',
                    answer: 'Hedge of protection'
                },
                {
                    question: 'To what animal was Job\'s friend Eliphaz most similar?',
                    answer: 'Your mom.'
                },
                {
                    question: 'To what animal was the young man Elihu most similar?',
                    answer: 'Emu'
                },
                {
                    question: 'How did the Lord appear to Moses in the desert?',
                    answer: 'In a burning bush'
                },
                {
                    question: 'What were Job\'s children doing the day they were killed in their eldest brother\'s house?',
                    answer: 'Eating and drinking...WINE!'
                },
                {
                    question: 'Was Job at risk for suicide based on the The Columbia-Suicide Severity Rating Scale?',
                    answer: 'Yes'
                },
                {
                    question: 'Which of Job\'s friends had a dream where he was visited by an evil spirit?',
                    answer: 'Eliphaz'
                },
                {
                    question: 'Why did Elihu wait so long before speaking?',
                    answer: 'Job 32:4  Now Elihu had waited till Job had spoken, because they were elder than he.'
                },
            ],
            hard: [{
                    question: 'How many sons and daughters did Job have?',
                    answer: '14 Sons, 6 Daughters'
                },
                {
                    question: 'How many sheep did Job have',
                    answer: 'Twenty One Thousand'
                },
                {
                    question: 'What band of bandits destroyed Job\'s camels?',
                    answer: 'Chaldeans'
                },
                {
                    question: 'Why was Job so wealthy at the beginning of the story?',
                    answer: 'His testimony wouldn\'t have been book-of-the-bible worthy'
                },
                {
                    question: 'What was Elihu\'s response to Jobs complaint that God was his enemy?',
                    answer: 'God saved us while we were opposing him - Job 33:17'
                },
                {
                    question: 'How many bullocks and rams did Eliphaz, Bildad, and Zophar need to bring to Job?',
                    answer: 'Seven bullocks, seven rams'
                },
                {
                    question: 'How old was Job when he died?',
                    answer: '140 years old'
                },
                {
                    question: 'Name one of Jobs children',
                    answer: 'Job 42:14  And he called the name of the first, Jemima; and the name of the second, Kezia; and the name of the third, Kerenhappuch. '
                },
                {
                    question: 'How did Job describe his repentence after seeing and hearing GOd?',
                    answer: 'Job 42:6  Wherefore I abhor myself, and repent in dust and ashes.'
                },
                {
                    question: 'Give two reasons why we shouldn\'t be so hard on Job\'s wife',
                    answer: '1. She lost everything too 2. Job was the greatest man in the east'
                },
                {
                    question: 'What lesson can we learn from Job\'s wife turning so sharply against him in adversity?',
                    answer: 'You have to have your own relationship with God. Also not everyone is at the same point of spiritual growth even in families.' 
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
                    setTimeout(function() {
                        vm.loading = false;
                    }, 500)

                }
            });
        }


    }
})
