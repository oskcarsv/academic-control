const {Schema, model} = require('mongoose');

const RoleSchema = Schema ({
    role:{
        type:String,
        required: [true, "Name of role is required"],
    }
});

module.exports = model ('Role', RoleSchema);