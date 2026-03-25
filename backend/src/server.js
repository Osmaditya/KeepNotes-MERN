import express from "express"; //"type" : "module" in package.json  or use require
import dotenv from "dotenv";
import cors from "cors";    //browser security mechanism

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
// console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 5001;

const app = express();

//middleware        //NOT USED RATELIMITING MIDDLEWARE

app.use(    //Ek server(backend) allow kare ya block kare ki dusri website(frontend) usse data le sakti hai ya nahi 
  cors({origin: "http://localhost:5173"}),
);
app.use(express.json()); //this middleware parse the json bodies : allow access to req.body
app.use(express.urlencoded({ extended: true })); // 👈 ADD THIS ALSO
//our simple custom middleware
// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} and req Url is ${req.url}`);
//     next();
// })
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server Started on port :", PORT);
  });
});
