module.exports = {
  // Index/root page of the application
  getIndex: (req,res)=>{
    res.render('index.ejs') // render index.ejs with no arguments and send as response
  }
}