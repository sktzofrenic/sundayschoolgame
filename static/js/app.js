var vm = new Vue({
  el: '#game',
  data: {
    rightAnswerSound: new Audio('static/sound/smb_1-up.wav'),
    wrongAnswerSound: new Audio('static/sound/smb_mariodie.wav'),
    gameOverSound: new Audio('static/sound/smb_world_clear.wav'),
    nextRoundSound: new Audio('static/sound/smb_stage_clear.wav'),
    rollingDiceSound: new Audio('static/sound/smb2_bonus_chance_start.wav'),
    gameIsRunning: false,
    teamOnePoints: 1000,
    teamTwoPoints: 1000,
    teamOneHerod: 1,
    teamTwoHerod: 1,
    currentRound: 1,
    showHardAnswer: {
      active: false
    },
    showEasyAnswer: {
      active: false
    },
    maxRounds: 11,
    teamOneName: 'Wise Men',
    teamTwoName: 'Shepherds',
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
      easy: [
        {question: 'After leaving Bethlehem, to which country did Joseph, Mary, and Jesus travel?', answer: 'Egypt'},
        {question: 'Who told Mary and Joseph to go to Bethlehem?', answer: 'Caesar Augustus'},
        {question: 'What are the meanings of the names Jesus and Emmanuel?', answer: 'Jesus means Savior and Emmanuel means God with us'},
        {question: 'When the shepherds went looking for Jesus, what was the sign they were to look for?', answer: 'A baby, wrapped in swaddling clothes, lying in a manger.'},
        {question: 'Who told Joseph the baby’s name was to be Jesus?', answer: 'An angel in Matthew 1:21'},
        {question: 'Herod asked the wise men to inform him where the baby Jesus was. Why?', answer: 'So that he could worship the child.'},
        {question: 'What are the three gifts which are mentioned being given by the wise men?', answer: 'Gold, frankincense and myrrh.'},
        {question: 'Which country was Joseph originally from?', answer: 'Bethlehem'},
        {question: 'How many angels spoke to the shepherds? ', answer: 'Multitude'},
        {question: 'When Joseph found Mary was pregnant, what was his reaction?', answer: 'Joseph, not willing to make her a publick example, was minded to put her away privily.'},
        {question: 'After Jesus was born, where did Mary lay Him?', answer: 'a Manger'},
      ],
      hard: [
        {question: 'Which Old Testament prophet had the most to say about the birth of Christ?', answer: 'Isaiah'},
        {question: 'In the accounts announcing the birth of Christ how many times did an angel or angels appear?', answer: 'At least 3 angelic announcements for the birth of Christ and 1 for the birth of John.'},
        {question: 'What form of transportation did Mary and Joseph use to get to Bethlehem?', answer: 'The Bible does not say'},
        {question: 'How many wise men or kings or magi came to see Jesus?', answer: 'The Bible does not say how many wise men there were.'},
        {question: 'How old was Jesus when the wise men found him?', answer: 'Jesus was somewhere between a month old and a couple of years old.'},
        {question: 'What animals does the Bible say were present at the birth of Jesus?', answer: 'There is no definite list of animals mentioned in the Bible.'},
        {question: 'What was the name of the unkind innkeeper who would not allow the pregnant Mary to lodge in his inn?', answer: 'The Bible does not say.'},
        {question: 'What is the name of the priest who was told he would not die until he saw the Savior?', answer: 'Simeon.'},
        {question: 'Two of the four Gospels do not mention the birth of Christ. Which two?', answer: 'Neither Mark or John tell the story of the birth of Christ.'},
        {question: 'What did the angels sing to the shepherds?', answer: 'Technically angels are never said to “sing” in the Bible. Each time they appear they only speak.'},
        {question: 'When they returned from Egypt, where did Jesus and His family dwell?', answer: 'Nazareth'}
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
    },
    endGame: function() {
      this.gameIsRunning = false;

    },
    getEasyQuestion: function(check) {
      if (check === 'easy') {
        return 'easy'
      }
      return this.questions.easy[this.currentRound-1];
    },
    getHardQuestion: function(check) {
      if (check === 'hard') {
        return 'hard'
      }
      return this.questions.hard[this.currentRound-1];
    },
    randomizeQuestion: function() {
      var vm = this;
      this.showDimmer.active = true;
      this.showDimmer.dimmer = true;
      this.rollingDiceSound.play();

      myVar = setInterval(function() {
        vm.reverseQuestions.computer = !vm.reverseQuestions.computer
        vm.reverseQuestions.reversed = !vm.reverseQuestions.reversed
      }, 77);


      setTimeout(function(){
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
    }


  }
})
