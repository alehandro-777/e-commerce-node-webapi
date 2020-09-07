const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  title : String,            // friendly  name
  controls : [
      {
          name: { type: String, required: true },   // form input name         
          label: { type: String, required: true },  // input label name
          value: { type: String, default: '' },     // default input value
          controlType: { type: String, enum : [
            'dropdown',
            'textbox'
          ], default: 'textbox' },  // 'dropdown', or textbox
          order: Number,                            //rendering order
          type:{ type: String, enum : [
            'text',
            'radio',
            'checkbox',
            'submit',
            'button',
            'date',
            'time'
        ], default: 'text' },    // <input type="..."
          options: [ { key: String,  value: String } ] } //options for <select ..> element
  ],
    enabled: { type: Boolean, default: true},
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('forms', modelSchema);  