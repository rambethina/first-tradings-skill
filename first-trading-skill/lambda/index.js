var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to Trading events!', 'Try saying hello!');
  },
  'NewSession': function () {
    this.emit(':ask', 'Welcome to financial events skill! The skill that gives you inforamtion about financial events. You can ask me about the financial events for next week, or information about a financial event. But first, I\'d like to get to know you better. Tell me your name by saying: My name is, and then your name.', 'Tell me your name by saying: My name is, and then your name.');
  },
  'FirstTradingSkillIntent': function() {
    this.emit(':tell', 'First trading event');
  },
  'NameCapture': function () {
    // Get Slot Values
    var USFirstNameSlot = this.event.request.intent.slots.USFirstName.value;

    // Get Name
    var name;
    if (USFirstNameSlot) {
      name = USFirstNameSlot;
    }

    // Save Name in Session Attributes and Ask for Country
    if (name) {
      this.attributes['userName'] = name;
      this.emit(':ask', `Ok ${name}! Tell me what country you're from by saying: I'm from, and then the country you're from.`, `Tell me what country you're from by saying: I'm from, and then the country you're from.`);
    } else {
      this.emit(':ask', `Sorry, I didn\'t recognise that name!`, `'Tell me your name by saying: My name is, and then your name.'`);
    }
  },
  'CountryCapture': function () {
    // Get Slot Values
    console.log(JSON.stringify(this.event.request.intent.slots.Country))
    var country = this.event.request.intent.slots.Country.value;

    // Get User Name from Session Attributes
    var userName = this.attributes['userName'];

    // Save Country in Session Attributes and Move Into Main Skill
    if (country) {
      this.attributes['userCountry'] = country;
      this.emit(':ask', `Ok ${userName}! Your from ${country}, that's great! Would you like to hear about financial events for next week`);
    } else {
      this.emit(':ask', `Sorry, I didn\'t recognise that country!`, `Tell me what country you're from by saying: I'm from, and then the country you're from.`);
    }
  },  
  'NextWeekEvents': function () {
    console.log(`Country ${this.attributes['userCountry']}`)
    var country = this.attributes['userCountry'];
    this.emit(':tell', `Next week for ${country} there is a FOMC meeting and US unemployment report coming out`);
  }
};
