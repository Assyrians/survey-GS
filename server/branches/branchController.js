var Branch = require('./branchModel.js');

module.exports = {

  getAllBranches : function (req , res) {
    Branch.find().exec(function (error , branches) {
      if(error)
        res.status(500).send(error);
      else
        res.status(200).send(branches);
    })
  },

  getOneBranch : function (req , res) {
    Branch.find({_id : req.params.id}).exec(function (error , branch) {
      if(error)
        res.status(500).send(error);
      else
        res.status(200).send(branch);
    })
  }

};