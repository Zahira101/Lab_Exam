const mongoose = require("mongoose");
const registerschema = new mongoose.Schema({
    fullname:{type: String,
        required:true,
    },
    email:{type: String,
        required:true,
    },
    phone:{type: String,
        required:true,
    },
    country:{type: String,
        required:true,
    },
    state:{type: String,
        required:true,
    },
    city:{type: String,
        required:true,
    },
    address:{type: String,
        required:true,
    },
    zipcode:{type: String,
        required:true,
    }
});
module.exports = new mongoose.model("Register",registerschema);