const helpDetails = (req, res) => {
  res.status(200).json({
    message: "Successfull! Happy to help you!",
    success: true,
    data: {
      contact: "+9196XXXXXX55",
    },
  });
};

module.exports = { helpDetails };
