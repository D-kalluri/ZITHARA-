const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const customersRoutes = require('./customersRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/customers', customersRoutes);

app.get('/',async(req,res)=>{
  try{
    const result=await db.query('SELECT * FROM customers' );
    res.status(200).json(result.rows);

  }catch(error){
    console.error(error);
    res.sendStatus(500).json({error:'Internal server Error'});
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



