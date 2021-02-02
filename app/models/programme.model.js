module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        intitule: String,
        fk_typeProgrammeId: mongoose.ObjectId,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Programme = mongoose.model("programme", schema);
    
    return Programme;
  };
  