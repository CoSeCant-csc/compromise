'use strict';
//supported Sentence.return() methods
module.exports = {
  text: (s) => {
    return s.terms.reduce((str, t) => {
        str += t.as('text');
        return str;
      }, '') + s.terminator;
  },

  normal: (s) => {
    let normal = s.terms.reduce((str, t) => {
      str += ' ' + t.as('normal');
      return str;
    }, '');
    normal = normal.trim();
    //add terminator
    let form = s.get('sentenceType');
    const mapping = {
      'Exclamation': '!',
      'Declarative': '.',
      'Question': '?'
    };
    if (mapping[form]) {
      normal = normal += mapping[form];
    }
    return normal;
  },

  tags: (s) => {
    return s.terms.map((t) => {
      return {
        text: t.text,
        normal: t.as('normal'),
        tags: Object.keys(t.pos)
      }
    })
  }

};